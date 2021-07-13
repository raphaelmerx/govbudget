import { formatLocale } from 'd3-format';
import govspend from '../app/govspend.json'
import exchangerates from '../app/exchangerates.json'
import countries from '../app/countries.json'

export const formatCurrency = (currency, format) => {
  let formatter = formatLocale({ currency: [currency, ""]}).format(format)
  // returns a function that accepts a number and formats it
  return (function(value) {
    return formatter(value).replace(/G/, "B");
  });
}

export const getTotalSpend = (country) => {
  const graphData = govspend[country]
  let totalSpend = 0;
  graphData.children.forEach(headCategory => {
    if (headCategory.children) {
      headCategory.children.forEach(category => { totalSpend += category.value; });
    } else {
      // some countries like the US only have one category
      totalSpend += headCategory.value;
    }
  });
  return totalSpend;
}

export const getCategorySpend = (country, category) => {
  const graphData = govspend[country]
  const categoryTree = graphData.children.find((c) => c.name === category);
  let totalSpend = 0;
  if (categoryTree.value !== undefined) return categoryTree.value
  categoryTree.children.forEach(child => { totalSpend += child.value; });
  return totalSpend;
}

export const getCategorySpendUSD = (country, category) => {
  const categorySpendLocal = getCategorySpend(country, category);
  // get currency for country
  const currency = countries.filter(c => c.key === country)[0].currency;
  // get exchange rate with usd
  const exchangerate = exchangerates.filter((e) => e.symbol === currency)[0].rate;
  return categorySpendLocal / exchangerate;
}

export const getCategorySpendPerCapitaUSD = (country, category) => {
  const countryInfo = countries.filter(c => c.key === country)[0]
  const categorySpendUSD = getCategorySpendUSD(country, category)
  return Math.round(categorySpendUSD * 1000000 / countryInfo.population);
}

export const getFormattedAmount = (amount, currency) => formatCurrency(currency + ' ', "$0.2s")(amount)

export const getFormattedGraphData = (countryName, type, category) => {
  const countryInfo = countries.filter(c => c.key === countryName)[0]
  // clone object
  let graphData = JSON.parse(JSON.stringify(govspend[countryInfo.key]));
  let computeValue;

  const totalSpend = getTotalSpend(countryInfo.key);

  if (type === "nominal") {
    computeValue = (value) => value * 1000000;
  } else if (type === "nominal-per-capita") {
    computeValue = (value) => value * 1000000 / countryInfo.population;
  } else if (type === "nominal-per-capita-usd") {
    const exchangerate = exchangerates.filter((e) => e.symbol === countryInfo.currency)[0].rate;
    computeValue = (value) => Math.round(value * 1000000 / countryInfo.population / exchangerate);
  } else if (type === "percentGDP") {
    computeValue = (value) => (value / countryInfo.GDP) * 100;
  } else if (type === "percentTotalSpend") {
    computeValue = (value) => (value / totalSpend) * 100;
  }

  // apply computeValue to leaves
  graphData.children.forEach(headCategory => {
    if (headCategory.children) {
      headCategory.children.forEach(category => {
        category.value = computeValue(category.value);
      });
      // headCategory.value = headCategory.children.reduce((prev, current) => prev + current.value, 0);
    } else {
      headCategory.value = computeValue(headCategory.value)
    }
  });

  if (category) {
    graphData = graphData.children.find((c) => c.name === category);
  }
  return graphData;
};

export const getValueFormatter = (type, currency) => {
  return (value) => {
    if (type.startsWith("nominal")) {
      return getFormattedAmount(value, currency);
    } else {
      return `${(Math.round(value * 10) / 10)}%`;
    }
  }
}

export const getCategories = (country) => {
  return govspend[country].children.map(c => c.name);
}

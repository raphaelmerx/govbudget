import { formatLocale } from 'd3-format';

export const formatCurrency = (currency, format) => {
  let formatter = formatLocale({ currency: [currency, ""]}).format(format)
  // returns a function that accepts a number and formats it
  return (function(value) {
    return formatter(value).replace(/G/, "B");
  });
}

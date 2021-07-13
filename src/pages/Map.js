import { useSelector, useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container';
import { Chart } from 'react-google-charts'

import { selectOption } from '../reducers/categorySlice'
import CategorySelector from '../components/CategorySelector';

import {getCategorySpendPerCapitaUSD, getCategorySpendPercentGDP} from '../helpers/financials'

const getCountryRows = (countries, category) => {
  return countries.map((country) => {
    const perCapita = getCategorySpendPerCapitaUSD(country.key, category)
    const percentGDP = Math.floor(getCategorySpendPercentGDP(country.key, category) * 100) / 100
    return [country.key, perCapita, percentGDP]
  })
}

function Map() {
  let selectedCategory = useSelector((state) => state.category.value)
  const countryOptions = useSelector((state) => state.country.options)
  const dispatch = useDispatch()
  if (!selectedCategory) {
    dispatch(selectOption('Total'))
    selectedCategory = 'Total'
  }

  const rows = [['Country', 'Public spending / capita (USD)', 'Public spending as % of GDP'], ...getCountryRows(countryOptions, selectedCategory)]

  return (
    <Container id="about-container">
      <h1 id="header-main">
        Public spending category:
        <CategorySelector />
      </h1>
      <div>
        <Chart
          chartType="GeoChart"
          data={rows}
          mapsApiKey="YOUR_KEY_HERE"
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
      <p>
        <em>
          Data is for year 2018. Source: <a href="https://stats.oecd.org" target="_blank" rel="noreferrer noopener">stats.oecd.org</a>
        </em>
      </p>
    </Container>
  );
}

export default Map;

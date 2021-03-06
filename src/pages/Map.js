import React, { memo } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

import { selectOption } from '../reducers/categorySlice'
import CategorySelector from '../components/CategorySelector';

import {getCategorySpendPerCapitaUSD, getCategorySpendPercentGDP} from '../helpers/financials'

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const getCountryRows = (countries, category) => {
  return countries.map((country) => {
    const perCapita = getCategorySpendPerCapitaUSD(country.key, category)
    const percentGDP = Math.floor(getCategorySpendPercentGDP(country.key, category) * 100) / 100
    return [country.key, perCapita, percentGDP]
  })
}

const Map = ({ setTooltipContent }) => {
  let selectedCategory = useSelector((state) => state.category.value)
  const countryOptions = useSelector((state) => state.country.options)
  const dispatch = useDispatch()
  if (!selectedCategory) {
    dispatch(selectOption('Total'))
    selectedCategory = 'Total'
  }

  const rows = [['Country', 'Public spending / capita (USD)', 'Public spending as % of GDP'], ...getCountryRows(countryOptions, selectedCategory)]

  const maxSpend = Math.max(...rows.slice(1, rows.length).map((row) => row[1]))
  const colorScale = scaleLinear()
    .domain([0, maxSpend])
    .range(["#ffedea", "#0e8716"]);

  return (
    <Container id="about-container">
      <h1 id="header-main">
        Public spending category:
        <CategorySelector />
      </h1>
      <div>
        <ComposableMap
          height={400}
          data-tip=""
          projectionConfig={{
            rotate: [-10, 0, 0],
          }}
        >
          <ZoomableGroup>
          {rows.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const row = rows.find((r) => geo.properties.NAME.startsWith(r[0]));
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={row ? colorScale(row[1]) : "#F5F4F6"}
                      onMouseEnter={() => {
                        if (!row) return
                        const country = row[0]
                        const amount = row[1].toLocaleString()
                        const gdp = row[2]
                        const content = `${country}: $${amount} / capita, ${gdp}% of GDP`

                        setTooltipContent(content);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          outline: "none"
                        },
                        hover: {
                          outline: "none"
                        },
                        pressed: {
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          )}</ZoomableGroup>
        </ComposableMap>
      </div>
      <p>
        <em>
          Data is for year 2018. Source: <a href="https://stats.oecd.org" target="_blank" rel="noreferrer noopener">stats.oecd.org</a>
        </em>
      </p>
    </Container>
  );
}

export default memo(Map);

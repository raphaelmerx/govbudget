import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import { buildVirtualChart } from '../helpers/graphUtils'
import { getcountryInfo } from '../reducers/countrySlice'
import {getFormattedGraphData, getValueFormatter} from '../helpers/financials'
import Sidebar from './Sidebar';
import TreeCell from './TreeCell'

import './GraphDisplay.css'


// 1. get total spend per country
// 2. for each country, for each node, apply calculation to have one value for each function

function GraphDisplay() {
  const [countryOptions, selectedCountry] = useSelector((state) => [state.country.options, state.country.value])
  const selectedType = useSelector((state) => state.type.value)
  const selectedCategory = useSelector((state) => state.category.value)
  const countryInfo = getcountryInfo(selectedCountry, countryOptions)

  const valueFormatter = getValueFormatter(selectedType, countryInfo.currency)

  const graphData = getFormattedGraphData(countryInfo.key, selectedType, selectedCategory)

  const [cells, setCells] = useState([])
  useEffect(() => {
    setCells(buildVirtualChart(graphData, valueFormatter))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedType, selectedCategory])

  return (
    <div id="graph-container">
      {selectedCountry &&
        <div id="sidebar-container">
          <Sidebar />
        </div>
      }
      <div id="treemap-container">
        {cells.length &&
          <svg className="treemap" width="100%" height="70vh">
            {cells.map((cell) => (
              <TreeCell key={cell.data.name} cell={cell} />
            ))}
          </svg>
        }
      </div>
    </div>

  );
}

export default GraphDisplay;

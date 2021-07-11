import React from 'react'
import { useSelector } from 'react-redux'

import { DataGrid } from '@material-ui/data-grid';

import {getFormattedGraphData} from '../helpers/financials'


const getTableRows = (country1, country2) => {
  const graphData = {
    'per-capita-1': getFormattedGraphData(country1, "nominal-per-capita-usd", null),
    'per-capita-2': getFormattedGraphData(country2, "nominal-per-capita-usd", null),
    'gdp-1': getFormattedGraphData(country1, "percentGDP", null),
    'gdp-2': getFormattedGraphData(country2, "percentGDP", null),
  }
  const categories = graphData['per-capita-1'].children.map(c => c.name)

  const tableRows = categories.map(categoryName => {
    const rowData = {
      id: categoryName,
      name: categoryName,
    }
    for (let [key, countryGraph] of Object.entries(graphData)) {
      let categoryGraph = countryGraph.children.filter(c => c.name === categoryName)[0];
      // value already present in the category, push it to the row
			if (categoryGraph.value !== undefined) rowData[key] = categoryGraph.value;
      // else sum the value of all subcategory values, push it to the row
      else rowData[key] = categoryGraph.children.reduce((prev, current) => prev + current.value, 0)
    }
    return rowData
  })

  // add a row for total amounts
  const totalRow = tableRows.reduce((totalRow, currentRow) => {
    ['per-capita-1', 'per-capita-2', 'gdp-1', 'gdp-2'].forEach((field) => totalRow[field] += currentRow[field])
    return totalRow
  }, {'id': 'Total', 'name': 'Total', 'per-capita-1': 0, 'per-capita-2': 0, 'gdp-1': 0, 'gdp-2': 0})
  tableRows.push(totalRow)

  return tableRows
}

export default function TableComparison() {
  const [selectedCountry1, selectedCountry2] = useSelector((state) => [state.country.value, state.country2.value])

  const columns = [
    { field: 'name', headerName: 'Category', flex: 1 },
    { field: 'per-capita-1', headerName: `${selectedCountry1} / capita (USD)`, flex: 1, valueFormatter: (params) => '$' + params.value.toLocaleString()},
    { field: 'per-capita-2', headerName: `${selectedCountry2} / capita (USD)`, flex: 1, valueFormatter: (params) => '$' + params.value.toLocaleString() },
    { field: 'gdp-1', headerName: `${selectedCountry1} % GDP`, flex: 1, valueFormatter: (params) => params.value.toFixed(2) + '%' },
    { field: 'gdp-2', headerName: `${selectedCountry2} % GDP`, flex: 1, valueFormatter: (params) => params.value.toFixed(2) + '%' },
  ]

  const tableRows = getTableRows(selectedCountry1, selectedCountry2)

  return (
    <div style={{ width: '100%', minWidth: '900px' }} class="table-container">
      <DataGrid
        rows={tableRows}
        columns={columns}
        pageSize={50}
        disableSelectionOnClick
        hideFooterPagination
        autoHeight
      />
    </div>
  );
}

import React from 'react'
import { useSelector } from 'react-redux'

import { DataGrid } from '@material-ui/data-grid';

import {getFormattedGraphData} from '../helpers/financials'


export default function TableComparison() {
  const [selectedCountry1, selectedCountry2] = useSelector((state) => [state.country.value, state.country2.value])

  const graphData = [
    getFormattedGraphData(selectedCountry1, "nominal-per-capita-usd", null),
    getFormattedGraphData(selectedCountry2, "nominal-per-capita-usd", null),
    getFormattedGraphData(selectedCountry1, "percentGDP", null),
    getFormattedGraphData(selectedCountry2, "percentGDP", null),
  ]

  const tableRows = graphData[1].children.map(c => {
    const name = c.name;
    const rowValues = graphData.map(e => {
      const categoryTree = e.children.filter(c => c.name === name)[0];
			if (categoryTree.value !== undefined) return categoryTree.value;
      return categoryTree.children.reduce((prev, current) => prev + current.value, 0)
    })
    return {
      id: name,
      name: name,
      'cap1': rowValues[0],
      'cap2': rowValues[1],
      'gdp1': rowValues[2],
      'gdp2': rowValues[3],
    }
  })

  const columns = [
    { field: 'name', headerName: 'Category', flex: 1 },
    { field: 'cap1', headerName: `${selectedCountry1} / capita (USD)`, flex: 1, valueFormatter: (params) => params.value.toLocaleString()},
    { field: 'cap2', headerName: `${selectedCountry2} / capita (USD)`, flex: 1, valueFormatter: (params) => params.value.toLocaleString() },
    { field: 'gdp1', headerName: `${selectedCountry1} % GDP`, flex: 1, valueFormatter: (params) => params.value.toFixed(2) },
    { field: 'gdp2', headerName: `${selectedCountry2} % GDP`, flex: 1, valueFormatter: (params) => params.value.toFixed(2)  },
  ]

  return (
    <div style={{ width: '100%', minWidth: '900px' }}>
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

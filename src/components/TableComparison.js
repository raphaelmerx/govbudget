import React from 'react'
import { useSelector } from 'react-redux'
import { format } from 'd3-format';

import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

import {getCategories, getCategorySpendUSD, getFormattedGraphData} from '../helpers/financials'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


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
  console.log(tableRows)

  const columns = [
    { field: 'name', headerName: 'Category', flex: 1 },
    { field: 'cap1', headerName: `${selectedCountry1} / capita (USD)`, flex: 1 },
    { field: 'cap2', headerName: `${selectedCountry2} / capita (USD)`, flex: 1 },
    { field: 'gdp1', headerName: `${selectedCountry1} % GDP`, flex: 1 },
    { field: 'gdp2', headerName: `${selectedCountry2} % GDP`, flex: 1 },
  ]
  columns.forEach((column) => {
    column.valueFormatter = (params) => params.value.toLocaleString();
  })
  console.log(columns)

  return (
    <div style={{ width: '100%' }}>
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

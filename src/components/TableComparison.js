import React from 'react'
import { useSelector } from 'react-redux'
import { format } from 'd3-format';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {getCategories, getCategorySpendUSD, getFormattedGraphData} from '../helpers/financials'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableComparison() {
  const classes = useStyles();
  const [selectedCountry1, selectedCountry2] = useSelector((state) => [state.country.value, state.country2.value])

	const graphData = [
		getFormattedGraphData(selectedCountry1, "nominal-per-capita-usd", null),
		getFormattedGraphData(selectedCountry2, "nominal-per-capita-usd", null),
		getFormattedGraphData(selectedCountry1, "percentGDP", null),
		getFormattedGraphData(selectedCountry2, "percentGDP", null),
	]

	const formatDecimals = format(",.2f");

	const tableData = graphData[1].children.map(c => {
		const name = c.name;
		const rowValues = graphData.map(e => {
			const categoryTree = e.children.filter(c => c.name === name)[0];
			return formatDecimals(categoryTree.children.reduce((prev, current) => prev + current.value, 0))
		})
		return [name, ...rowValues]
	})

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right"> {selectedCountry1} / capita (USD)</TableCell>
            <TableCell align="right"> {selectedCountry2} / capita (USD)</TableCell>
            <TableCell align="right"> {selectedCountry1} % GDP</TableCell>
            <TableCell align="right"> {selectedCountry2} % GDP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row[0]}>
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>
              <TableCell align="right">{row[2]}</TableCell>
              <TableCell align="right">{row[3]}</TableCell>
              <TableCell align="right">{row[4]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector, useDispatch } from 'react-redux'
import { selectOption } from '../reducers/categorySlice'

import './TreeCell.css'

const CellTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 18,
  },
}))(Tooltip);



function TreeCell(props) {
  const position = `translate(${props.cell.x}, ${props.cell.y})`
  const selectedType = useSelector((state) => state.type.value)

  const dispatch = useDispatch()

  const clickedCell = (event) => {
    const isLeaf = !(props.cell.data.children);
    if (!isLeaf) {
      dispatch(selectOption(props.cell.data.name))
    } else {
      dispatch(selectOption(null))
    }
  }

  let amountUnit
  if (selectedType === 'nominal-per-capita') amountUnit = ' / capita'
  if (selectedType === 'nominal') amountUnit = ' total'
  if (selectedType === 'percentGDP') amountUnit = ' of GDP'
  if (selectedType === 'percentTotalSpend') amountUnit = ' of Government spending'

  const title = <React.Fragment>
    {props.cell.fullTitle}
    <br/>
    {props.cell.subtitle.text}
    {amountUnit}
  </React.Fragment>

  return (
    <CellTooltip title={ title } arrow>
    <g
      className="explorer-cell"
      transform={position}
      onClick={clickedCell}
    >
      <rect
        className="explorer-cell-box"
        x="0"
        y="0"
        width={props.cell.width}
        height={props.cell.height}
        style={{ fill: props.cell.color }}
      />
      <text
        className="explorer-cell-title"
        textAnchor="middle"
        fill="#ffffff"
        x={props.cell.title.x}
        y={props.cell.title.y}
      >{props.cell.title.text}</text>
      <text
        className="explorer-cell-subtitle"
        textAnchor="middle"
        fill="#ffffff"
        x={props.cell.subtitle.x}
        y={props.cell.subtitle.y}
      >{props.cell.subtitle.text}</text>
    </g>
    </CellTooltip>
  )
}

export default TreeCell;

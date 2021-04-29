import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';

import { truncateText } from './textUtils';



const buildVirtualCell = (data, scale, valueFormatter) => {
    const height = data.y1 - data.y0;
    const width = data.x1 - data.x0;

    let value = data.value;

    const valueText = valueFormatter(value);

    // the available width is 40px less than the box width to account for 20px of padding on
    // each side
    const usableWidth = width - 40;
    let name = data.data.name;
    const title = truncateText(name, usableWidth);
    let color = scale(value);

    const cell = {
        width,
        height,
        x: data.x0,
        y: data.y0,
        data: data.data,
        color,
        title: {
            text: title,
            x: (width / 2),
            y: (height / 2) - 5 // shift it up slightly so the full title + subtitle combo is vertically centered
        },
        fullTitle: name,
        subtitle: {
            text: valueText,
            x: (width / 2),
            y: (height / 2) + 15 // to place the subtitle below the title
        }
    };

    return cell;
}


export const buildVirtualChart = (graphData, valueFormatter) => {
    const treemapData = hierarchy(graphData)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value)

    const availableWidth = document.querySelector('#treemap-container').offsetWidth;

    const tree = treemap()
        .size([availableWidth, window.innerHeight * 0.70])
        .tile(treemapBinary)
        .paddingInner(5)
        .round(true);

    const rootTreeNode = tree(treemapData);
    const treeItems = rootTreeNode.children;

    const maxValue = treeItems[0].value;
    const minValue = treeItems[treeItems.length - 1].value;

    let scale = scaleLinear()
        .domain([minValue, maxValue])
        .range(['#47BAD9', '#1C4956']);
    if (treeItems.length === 1) {
        // in the event that we only have one data item, mock the scale function to only
        // return one color
        scale = () => '#47BAD9';
    }

    const cells = [];
    treeItems.forEach((item) => {
        const cell = buildVirtualCell(item, scale, valueFormatter);
        cells.push(cell);
    });

    return cells;
}

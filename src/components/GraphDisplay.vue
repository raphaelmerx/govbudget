<template>
<div id="graph-container">
    <svg class="treemap" width="100%" height="400">
      <TreeCell v-for="cell in cells" :key="cell.title.text" :cell="cell"/>
    </svg>
</div>
</template>

<script>
/* eslint-disable no-unreachable */
import axios from "axios";
import * as d3 from 'd3';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { interpolate } from 'd3-interpolate';
import { format } from 'd3-format';
import { measureText } from '../helpers/measureText';

import TreeCell from './TreeCell.vue'


function formatCurrency() {
  let function_ret = format.apply(d3, arguments);
  return (function(args) {
    return function() {
      return args.apply(d3, arguments).replace(/G/, "B");
    };
  })(function_ret);
}

export default {
  name: "GraphDisplay",
  components: {
    TreeCell,
  },
  props: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      govspend: null,
      GDPs: {
        Austria: 385711.94,
        Belgium: 459531.6,
        Finland: 233662.0,
        Germany: 3344370.0,
        Greece: 184713.6072,
        Ireland: 324038.1891,
        Spain: 1202193.0,
        Estonia: 26035.854,
        France: 2360687.0,
        Italy: 1766168.2,
        Netherlands: 773987.0,
        Portugal: 204304.761,
        Slovenia: 45754.8179,
        "Slovak Republic": 89605.907,
        Latvia: 29056.05,
        Lithuania: 45264.3769
      },
      country: "France",
      type: "nominal",
      cells: []
    };
  },
  mounted() {
    this.getData().then(govspendData => {
      this.govspend = govspendData;
      this.renderGraph("France");
    });
    this.$root.$on("change-country", country => {
      this.country = country;
      this.renderGraph();
    });
    this.$root.$on("change-type", type => {
      this.type = type;
      this.renderGraph();
    });
  },
  methods: {
    getData: function() {
      var vm = this;
      return axios
        .get(`${vm.publicPath}govspend.json`)
        .then(response => response.data);
    },
    getFormattedGraphData: function(country, type) {
      // clone object
      const graphData = JSON.parse(JSON.stringify(this.govspend[country]));
      if (type === "nominal") {
        graphData.children.forEach(headCategory => {
          headCategory.children.forEach(category => {
            category.value = category.value * 1000000;
          });
        });
      } else if (type === "percentGDP") {
        graphData.children.forEach(headCategory => {
          headCategory.children.forEach(category => {
            category.value = (category.value / this.GDPs[country]) * 100;
          });
        });
      } else if (type === "percentTotalSpend") {
        let totalSpend = 0;
        graphData.children.forEach(headCategory => {
          headCategory.children.forEach(category => {
            totalSpend += category.value;
          });
        });
        graphData.children.forEach(headCategory => {
          headCategory.children.forEach(category => {
            category.value = (category.value / totalSpend) * 100;
          });
        });
      }
      return graphData;
    },
    renderGraph() {
      const vm = this;
      var graphData = this.getFormattedGraphData(this.country, this.type);
      this.buildVirtualChart(graphData);
      return;

      document.getElementById("tree-chart").innerHTML = "";

      let format = formatCurrency("0.2s");
      let height = 500;
      let width = 954;
      let getName = function(d) {
        return d
          .ancestors()
          .reverse()
          .map(d => d.data.name)
          .join("/");
      };

      var Tooltip = d3
        .select("#tree-chart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function() {
        Tooltip.style("opacity", 1);
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1);
      };
      var mousemove = function(d) {
        let windowWidth = window.innerWidth,
          xPosition =
            windowWidth - d3.event.pageX < 300
              ? d3.event.pageX - 300
              : d3.event.pageX + 5,
          yPosition = d3.event.pageY + 5;
        console.log(d);
        Tooltip.html(d.data.name + ": " + format(d.value))
          .style("left", xPosition + "px")
          .style("top", yPosition + "px");
      };
      var mouseleave = function() {
        Tooltip.style("opacity", 0);
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8);
      };

      function tile(node, x0, y0, x1, y1) {
        d3.treemapBinary(node, 0, 0, width, height);
        for (const child of node.children) {
          child.x0 = x0 + (child.x0 / width) * (x1 - x0);
          child.x1 = x0 + (child.x1 / width) * (x1 - x0);
          child.y0 = y0 + (child.y0 / height) * (y1 - y0);
          child.y1 = y0 + (child.y1 / height) * (y1 - y0);
        }
      }

      const treemap = data =>
        treemap().tile(tile)(
          hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)
        );

      let chart = () => {
        const x = scaleLinear().rangeRound([0, width]);
        const y = scaleLinear().rangeRound([0, height]);

        const svg = d3
          .select("#tree-chart")
          .append("svg")
          .attr("viewBox", [0.5, -30.5, width, height + 30])
          .style("font", "10px sans-serif");

        // color scale
        let color = scaleOrdinal(d3.schemeCategory10);

        let opacity = d3
          .scaleLinear()
          .domain([1000000000, 200000000000])
          .range([0.5, 1]);

        let group = svg.append("g").call(render, treemap(graphData));

        function render(group, root) {
          const node = group
            .selectAll("g")
            .data(root.children.concat(root))
            .join("g");

          node
            .filter(d => (d === root ? d.parent : d.children))
            .attr("cursor", "pointer")
            .on("click", d => (d === root ? zoomout(root) : zoomin(d)));

          node.append("title").text(d => `${getName(d)}\n${format(d.value)}`);

          node
            .append("rect")
            .attr(
              "id",
              d =>
                (d.leafUid = Math.random()
                  .toString(16)
                  .slice(2)).id
            )
            .attr("fill", d => {
              if (d === root) return "#fff";
              if (d.children) {
                return color(d.data.name);
              }
              return color(d.parent.data.name);
            })
            .attr("opacity", function(d) {
              if (d.children) return 0.8;
              return opacity(d.data.value);
            })
            .attr("stroke", "#fff")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

          node
            .append("clipPath")
            .attr(
              "id",
              d =>
                (d.clipUid = Math.random()
                  .toString(16)
                  .slice(2)).id
            )
            .append("use")
            .attr("xlink:href", d => d.leafUid.href);

          node
            .append("text")
            .attr("clip-path", d => d.clipUid)
            .attr("font-weight", d => (d === root ? "bold" : null))
            .selectAll("tspan")
            .data(d =>
              (d === root ? getName(d) : d.data.name)
                .split(/(?=[A-Z][^A-Z])/g)
                .concat(format(d.value))
            )
            .join("tspan")
            .attr("x", 3)
            .attr(
              "y",
              (d, i, nodes) =>
                `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
            )
            .attr("fill-opacity", (d, i, nodes) =>
              i === nodes.length - 1 ? 0.7 : null
            )
            .attr("font-weight", (d, i, nodes) =>
              i === nodes.length - 1 ? "normal" : null
            )
            .text(d => {
              let raw = d.replace(/,/g, "");
              if (isNaN(Number(raw.substr(0, 1)))) {
                // label e.g. 'Social protection'
                return d;
              } else if (vm.type === "nominal") {
                return `${d}€`;
              } else {
                return `${d} %`;
              }
            });

          group.call(position, root);
        }

        function position(group, root) {
          group
            .selectAll("g")
            .attr("transform", d =>
              d === root
                ? `translate(0,-30)`
                : `translate(${x(d.x0)},${y(d.y0)})`
            )
            .select("rect")
            .attr("width", d => (d === root ? width : x(d.x1) - x(d.x0)))
            .attr("height", d => (d === root ? 30 : y(d.y1) - y(d.y0)));
        }

        // When zooming in, draw the new nodes on top, and fade them in.
        function zoomin(d) {
          const group0 = group.attr("pointer-events", "none");
          const group1 = (group = svg.append("g").call(render, d));

          x.domain([d.x0, d.x1]);
          y.domain([d.y0, d.y1]);

          svg
            .transition()
            .duration(750)
            .call(t =>
              group0
                .transition(t)
                .remove()
                .call(position, d.parent)
            )
            .call(t =>
              group1
                .transition(t)
                .attrTween("opacity", () => interpolate(0, 1))
                .call(position, d)
            );
        }

        // When zooming out, draw the old nodes on top, and fade them out.
        function zoomout(d) {
          const group0 = group.attr("pointer-events", "none");
          const group1 = (group = svg.insert("g", "*").call(render, d.parent));

          x.domain([d.parent.x0, d.parent.x1]);
          y.domain([d.parent.y0, d.parent.y1]);

          svg
            .transition()
            .duration(750)
            .call(t =>
              group0
                .transition(t)
                .remove()
                .attrTween("opacity", () => interpolate(1, 0))
                .call(position, d)
            )
            .call(t => group1.transition(t).call(position, d.parent));
        }

        return svg.node();
      };

      chart();
    },

    truncateText(text, maxWidth) {
        // calculate the text width of the full label
        let label = text;
        let labelWidth = measureText('16px Source Sans Pro, sans serif', text);

        // check to see if the full label will fit
        if (labelWidth > maxWidth) {
            // label won't fit, let's cut it down
            // determine the average character pixel width
            const characterWidth = Math.ceil(labelWidth / text.length);
            // give an additional 30px for the ellipsis
            const availableWidth = maxWidth - 30;
            let availableLength = Math.floor(availableWidth / characterWidth);
            if (availableLength < 1) {
                // we must show at least one character
                availableLength = 1;
            }

            // substring the label to this length
            if (availableLength < text.length) {
                label = `${label.substring(0, availableLength)}...`;
            }
        }

        return label;
    },

    buildVirtualCell(data, scale) {
        const height = data.y1 - data.y0;
        const width = data.x1 - data.x0;

        let value = data.value;

        // the available width is 40px less than the box width to account for 20px of padding on
        // each side
        const usableWidth = width - 40;
        let name = data.data.name;
        const title = this.truncateText(name, usableWidth);
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
        };

        return cell;
    },

    buildVirtualChart: function(graphData) {
      const treemapData = hierarchy(graphData)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)

      const availableWidth = document.querySelector('#graph-container').offsetWidth;

      const tree = treemap()
          .size([availableWidth, 500])
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
          const cell = this.buildVirtualCell(item, scale);
          cells.push(cell);
      });

      this.cells = cells;
    }
  }
};
</script>

<style scoped>
</style>

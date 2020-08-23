<template>
  <div class="chart" id="tree-chart"></div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3";

function formatCurrency() {
  let function_ret = d3.format.apply(d3, arguments);
  return (function(args) {
    return function() {
      return args.apply(d3, arguments).replace(/G/, "B");
    };
  })(function_ret);
}

export default {
  name: "GraphDisplay",
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
      type: "nominal"
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
      }
      return graphData;
    },
    renderGraph() {
      const vm = this;
      var graphData = this.getFormattedGraphData(this.country, this.type);

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
        d3.treemap().tile(tile)(
          d3
            .hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)
        );

      let chart = () => {
        const x = d3.scaleLinear().rangeRound([0, width]);
        const y = d3.scaleLinear().rangeRound([0, height]);

        const svg = d3
          .select("#tree-chart")
          .append("svg")
          .attr("viewBox", [0.5, -30.5, width, height + 30])
          .style("font", "10px sans-serif");

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
            .attr("fill", d =>
              d === root ? "#fff" : d.children ? "#ccc" : "#ddd"
            )
            .attr("stroke", "#fff");

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
                .attrTween("opacity", () => d3.interpolate(0, 1))
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
                .attrTween("opacity", () => d3.interpolate(1, 0))
                .call(position, d)
            )
            .call(t => group1.transition(t).call(position, d.parent));
        }

        return svg.node();
      };

      chart();
    }
  }
};
</script>

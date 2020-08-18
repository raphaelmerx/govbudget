Vue.component('CountrySelector', {
  template: `<select @change="handleCountryChange">
    <option value="France">France</option>
    <option value="Australia">Australia</option>
  </select>`,
  methods: {
    handleCountryChange: function(event) {
      this.$root.$emit('load-country', event.target.value)
    },
  }
})

Vue.component('GraphDisplay', {
  template: `
<div class="row">
    <div class="col-lg-12">
        <h1 id="timor-leste-ministério-da-saúde-covid-19-dashboard"> Visualisation des finances publiques en France</h1>
        <p><em>Pour l'année 2019</em></p>
        <h2 id="kazu-konfirmadu-total-no-foun-iha-timor-leste">Allocation par secteur</h2>
        <div class="chart" id="tree-chart"></div>
    </div>
</div>
`,
  data() {
    return {
      govspend: null,
    };
  },
  mounted() {
    this.getData().then((govspendData) => {
      this.govspend = govspendData;
      this.renderGraph('France');
    });
    this.$root.$on('load-country', this.renderGraph)
  },
  methods: {
    getData: () => {
      return axios
        .get('/data/govspend.json')
        .then(response => response.data)
    },
    renderGraph(country) {

      document.getElementById('tree-chart').innerHTML = '';

      let format = d3.format(",d");
      let height = 500;
      let width = 954;
      let getName = function (d) {
        return d.ancestors().reverse().map(d => d.data.name).join("/");
      };

      function tile(node, x0, y0, x1, y1) {
        d3.treemapBinary(node, 0, 0, width, height);
        for (const child of node.children) {
          child.x0 = x0 + child.x0 / width * (x1 - x0);
          child.x1 = x0 + child.x1 / width * (x1 - x0);
          child.y0 = y0 + child.y0 / height * (y1 - y0);
          child.y1 = y0 + child.y1 / height * (y1 - y0);
        }
      }

      treemap = data => d3.treemap()
        .tile(tile)(d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value))

      let chart = () => {
        const x = d3.scaleLinear().rangeRound([0, width]);
        const y = d3.scaleLinear().rangeRound([0, height]);

        const svg = d3.select("#tree-chart")
          .append("svg")
          .attr("viewBox", [0.5, -30.5, width, height + 30])
          .style("font", "10px sans-serif");

        let group = svg.append("g")
          .call(render, treemap(this.govspend[country]));

        function render(group, root) {
          const node = group
            .selectAll("g")
            .data(root.children.concat(root))
            .join("g");

          node.filter(d => d === root ? d.parent : d.children)
            .attr("cursor", "pointer")
            .on("click", d => d === root ? zoomout(root) : zoomin(d));

          node.append("title")
            .text(d => `${getName(d)}\n${format(d.value)}`);

          node.append("rect")
            .attr("id", d => (d.leafUid = Math.random().toString(16).slice(2)).id)
            .attr("fill", d => d === root ? "#fff" : d.children ? "#ccc" : "#ddd")
            .attr("stroke", "#fff");

          node.append("clipPath")
            .attr("id", d => (d.clipUid = Math.random().toString(16).slice(2)).id)
            .append("use")
            .attr("xlink:href", d => d.leafUid.href);

          node.append("text")
            .attr("clip-path", d => d.clipUid)
            .attr("font-weight", d => d === root ? "bold" : null)
            .selectAll("tspan")
            .data(d => (d === root ? getName(d) : d.data.name).split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
            .join("tspan")
            .attr("x", 3)
            .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
            .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
            .attr("font-weight", (d, i, nodes) => i === nodes.length - 1 ? "normal" : null)
            .text(d => d);

          group.call(position, root);
        }

        function position(group, root) {
          group.selectAll("g")
            .attr("transform", d => d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`)
            .select("rect")
            .attr("width", d => d === root ? width : x(d.x1) - x(d.x0))
            .attr("height", d => d === root ? 30 : y(d.y1) - y(d.y0));
        }

        // When zooming in, draw the new nodes on top, and fade them in.
        function zoomin(d) {
          const group0 = group.attr("pointer-events", "none");
          const group1 = group = svg.append("g").call(render, d);

          x.domain([d.x0, d.x1]);
          y.domain([d.y0, d.y1]);

          svg.transition()
            .duration(750)
            .call(t => group0.transition(t).remove()
              .call(position, d.parent))
            .call(t => group1.transition(t)
              .attrTween("opacity", () => d3.interpolate(0, 1))
              .call(position, d));
        }

        // When zooming out, draw the old nodes on top, and fade them out.
        function zoomout(d) {
          const group0 = group.attr("pointer-events", "none");
          const group1 = group = svg.insert("g", "*").call(render, d.parent);

          x.domain([d.parent.x0, d.parent.x1]);
          y.domain([d.parent.y0, d.parent.y1]);

          svg.transition()
            .duration(750)
            .call(t => group0.transition(t).remove()
              .attrTween("opacity", () => d3.interpolate(1, 0))
              .call(position, d))
            .call(t => group1.transition(t)
              .call(position, d.parent));
        }

        return svg.node();
      };

      chart();
    },
  }
})

const vueApp = new Vue({
  el: '#vapp',
  data: {
    country: 'France'
  },
  template: `
    <div>
      <country-selector />
      <graph-display />
    </div>
  `,
  methods: {
  }
})

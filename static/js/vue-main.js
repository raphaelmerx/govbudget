Vue.component('CountrySelector', {
  template: `<select>
    <option value="france">France</option>
    <option value="australia">Australia</option>
  </select>`
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
  mounted: function () {
    this.renderGraph();
  },
  methods: {
    renderGraph: function () {

      var format = d3.format(",d");
      var height = 500;
      var width = 954;
      var getName = function (d) {
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

      data = {
        "name": "Govspend",
        "children": [
          {
            "name": "General public services",
            "children": [
              {
                "name": "Executive and legislative organs, financial, fiscal and external affairs",
                "value": 43477.0
              },
              {
                "name": "Foreign economic aid",
                "value": 3462.0
              },
              {
                "name": "General services",
                "value": 46044.0
              },
              {
                "name": "Basic research",
                "value": 6921.0
              },
              {
                "name": "RandD General public services",
                "value": 1.0
              },
              {
                "name": "General public services n.e.c.",
                "value": 1884.0
              },
              {
                "name": "Public debt transactions",
                "value": 43675.0
              },
              {
                "name": "Transfers of a general character between different levels of government",
                "value": 2.0
              }
            ]
          },
          {
            "name": "Defence",
            "children": [
              {
                "name": "Military defence",
                "value": 34865.0
              },
              {
                "name": "Civil defence",
                "value": 200.0
              },
              {
                "name": "Foreign military aid",
                "value": 1976.0
              },
              {
                "name": "RandD Defence",
                "value": 1253.0
              },
              {
                "name": "Defence n.e.c.",
                "value": 3092.0
              }
            ]
          },
          {
            "name": "Public order and safety",
            "children": [
              {
                "name": "Police services",
                "value": 22189.0
              },
              {
                "name": "Fire-protection services",
                "value": 6807.0
              },
              {
                "name": "Law courts",
                "value": 5542.0
              },
              {
                "name": "Prisons",
                "value": 3583.0
              },
              {
                "name": "RandD Public order and safety",
                "value": 15.0
              },
              {
                "name": "Public order and safety n.e.c.",
                "value": 985.0
              }
            ]
          },
          {
            "name": "Economic affairs",
            "children": [
              {
                "name": "General economic, commercial and labour affairs",
                "value": 39069.0
              },
              {
                "name": "Agriculture, forestry, fishing and hunting",
                "value": 4215.0
              },
              {
                "name": "Fuel and energy",
                "value": 10952.0
              },
              {
                "name": "Mining, manufacturing and construction",
                "value": 690.0
              },
              {
                "name": "Transport",
                "value": 48629.0
              },
              {
                "name": "Communication",
                "value": 498.0
              },
              {
                "name": "Other industries",
                "value": 10488.0
              },
              {
                "name": "RandD Economic affairs",
                "value": 19108.0
              },
              {
                "name": "Economic affairs n.e.c.",
                "value": 1723.0
              }
            ]
          },
          {
            "name": "Environment protection",
            "children": [
              {
                "name": "Waste management",
                "value": 12872.0
              },
              {
                "name": "Waste water management",
                "value": 4921.0
              },
              {
                "name": "Pollution abatement",
                "value": 1874.0
              },
              {
                "name": "Protection of biodiversity and landscape",
                "value": 1915.0
              },
              {
                "name": "RandD Environmental protection",
                "value": 869.0
              },
              {
                "name": "Environmental protection n.e.c.",
                "value": 1599.0
              }
            ]
          },
          {
            "name": "Housing and community amenities",
            "children": [
              {
                "name": "Housing development",
                "value": 6693.0
              },
              {
                "name": "Community development",
                "value": 15028.0
              },
              {
                "name": "Water supply",
                "value": 3043.0
              },
              {
                "name": "Street lighting",
                "value": 1612.0
              },
              {
                "name": "RandD Housing and community amenities",
                "value": 0.0
              },
              {
                "name": "Housing and community amenities n.e.c.",
                "value": 266.0
              }
            ]
          },
          {
            "name": "Health",
            "children": [
              {
                "name": "Medical products, appliances and equipment",
                "value": 31341.0
              },
              {
                "name": "Outpatient services",
                "value": 71500.0
              },
              {
                "name": "Hospital services",
                "value": 80518.0
              },
              {
                "name": "Public health services",
                "value": 2694.0
              },
              {
                "name": "RandD Health",
                "value": 2200.0
              },
              {
                "name": "Health n.e.c.",
                "value": 2946.0
              }
            ]
          },
          {
            "name": "Recreation, culture and religion",
            "children": [
              {
                "name": "Recreational and sporting services",
                "value": 13704.0
              },
              {
                "name": "Cultural services",
                "value": 14832.0
              },
              {
                "name": "Broadcasting and publishing services",
                "value": 3531.0
              },
              {
                "name": "Religious and other community services",
                "value": 497.0
              },
              {
                "name": "RandD Recreation, culture and religion",
                "value": 0.0
              },
              {
                "name": "Recreation, culture and religion n.e.c.",
                "value": 66.0
              }
            ]
          },
          {
            "name": "Education",
            "children": [
              {
                "name": "Pre-primary and primary education",
                "value": 34155.0
              },
              {
                "name": "Secondary education",
                "value": 47906.0
              },
              {
                "name": "Post-secondary non-tertiary education",
                "value": 834.0
              },
              {
                "name": "Tertiary education",
                "value": 15027.0
              },
              {
                "name": "Education not definable by level",
                "value": 5547.0
              },
              {
                "name": "Subsidiary services to education",
                "value": 16462.0
              },
              {
                "name": "RandD Education",
                "value": 6.0
              },
              {
                "name": "Education n.e.c.",
                "value": 614.0
              }
            ]
          },
          {
            "name": "Social protection",
            "children": [
              {
                "name": "Sickness and disability",
                "value": 67954.0
              },
              {
                "name": "Survivors",
                "value": 35078.0
              },
              {
                "name": "Family and children",
                "value": 51548.0
              },
              {
                "name": "Unemployment",
                "value": 44346.0
              },
              {
                "name": "Housing",
                "value": 20403.0
              },
              {
                "name": "Social exclusion n.e.c.",
                "value": 26173.0
              },
              {
                "name": "RandD Social protection",
                "value": 0.0
              },
              {
                "name": "Social protection n.e.c.",
                "value": 4571.0
              },
              {
                "name": "Old age",
                "value": 312126.0
              }
            ]
          }
        ]
      }

      var chart = function () {
        const x = d3.scaleLinear().rangeRound([0, width]);
        const y = d3.scaleLinear().rangeRound([0, height]);

        const svg = d3.select("#tree-chart")
          .append("svg")
          .attr("viewBox", [0.5, -30.5, width, height + 30])
          .style("font", "10px sans-serif");

        let group = svg.append("g")
          .call(render, treemap(data));

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
      }

      chart();
    }
  }
})

const vueApp = new Vue({
  el: '#vapp',
  data: {
    display: 'redbox'
  },
  template: `
    <div>
      <country-selector />
      <graph-display />
    </div>
  `
})

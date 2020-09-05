<template>
<div id="main-container">
  <div id="sidebar-container">
    <SidebarItem :label="this.country + ' GDP'" :value="this.formattedGDP" :has-next="true" />
    <SidebarItem :label="'Public spending'" :value="this.formattedTotalSpend" :has-next="this.zoom" />
    <SidebarItem v-if="this.zoom" :label="this.zoom" :value="this.formattedCategorySpend" :has-next="false" />
  </div>
  <div id="graph-container">
    <svg class="treemap" width="100%" height="500">
      <TreeCell v-for="cell in cells" :key="cell.title.text" :cell="cell"/>
    </svg>
  </div>
</div>
</template>

<script>
/* eslint-disable no-unreachable */
import axios from "axios";
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { measureText } from '../helpers/measureText';
import { formatCurrency } from '../helpers/formatCurrency';

import TreeCell from './TreeCell.vue'
import SidebarItem from './SidebarItem.vue'


export default {
  name: "GraphDisplay",
  components: {
    TreeCell,
    SidebarItem,
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
      population: {"Australia": 24992860, "Austria": 8837707, "Belgium": 11403740, "Canada": 37058856, "Chile": 18751405, "Colombia": 49834240, "Czech Republic": 10626430, "Denmark": 5789957, "Estonia": 1321977, "Finland": 5515525, "France": 66941698, "Germany": 82914191, "Greece": 10725886, "Hungary": 9767600, "Iceland": 352722, "Ireland": 4857015, "Israel": 8872943, "Italy": 60421797, "Japan": 126443180, "Korea": 51635256, "Latvia": 1927170, "Lithuania": 2801541, "Luxembourg": 607950, "Mexico": 125327797, "Netherlands": 17231622, "New Zealand": 4885500, "Norway": 5311916, "Poland": 38413139, "Portugal": 10283822, "Slovak Republic": 5446771, "Slovenia": 2070050, "Spain": 46733038, "Sweden": 10175214, "Switzerland": 8513227, "Turkey": 81407211, "United Kingdom": 66435550,
"United States": 327167434,},
      country: "France",
      type: "nominal",
      totalSpend: 0,
      categorySpend: 0,
      zoom: '',
      cells: [],
    };
  },
  mounted() {
    this.getData().then(govspendData => {
      this.govspend = govspendData;
      this.renderGraph("France");
    });
    this.$root.$on("change-country", country => {
      this.country = country;
      this.zoom = '';
      this.renderGraph();
    });
    this.$root.$on("change-type", type => {
      this.type = type;
      this.zoom = '';
      this.renderGraph();
    });
    this.$root.$on("zoom-cell", title => {
      this.zoom = title;
      this.renderGraph();
    });
    this.$root.$on("zoom-out", () => {
      this.zoom = '';
      this.renderGraph();
    });
  },
  computed: {
    formattedGDP: function () {
      return formatCurrency("$0.2s")(this.GDPs[this.country] * 1000000);
    },
    formattedTotalSpend: function () {
      return formatCurrency("$0.2s")(this.totalSpend * 1000000);
    },
    formattedCategorySpend: function () {
      return formatCurrency("$0.2s")(this.categorySpend * 1000000);
    }
  },
  methods: {
    getData: function() {
      var vm = this;
      return axios
        .get(`${vm.publicPath}govspend.json`)
        .then(response => response.data);
    },
    getTotalSpend: function(graphData) {
        let totalSpend = 0;
        graphData.children.forEach(headCategory => {
          headCategory.children.forEach(category => {
            totalSpend += category.value;
          });
        });
        return totalSpend;
    },
    getCategorySpend: function(graphData, category) {
        const categoryTree = graphData.children.find((c) => c.name === category);
        let totalSpend = 0;
        categoryTree.children.forEach(child => { totalSpend += child.value; });
        return totalSpend;
    },
    getFormattedGraphData: function(country, type) {
      // clone object
      let graphData = JSON.parse(JSON.stringify(this.govspend[country]));

      this.totalSpend = this.getTotalSpend(graphData);
      if (this.zoom) {
        this.categorySpend = this.getCategorySpend(graphData, this.zoom);
      }

      if (type === "nominal") {
        graphData.children.forEach(headCategory => {
          headCategory.children.forEach(category => {
            category.value = category.value * 1000000;
          });
        });
      } else if (type === "nominal-per-capita") {
        graphData.children.forEach(headCategory => {
          headCategory.children.forEach(category => {
            category.value = category.value * 1000000 / this.population[country];
          });
        });
      } else if (type === "percentGDP") {
        graphData.children.forEach(headCategory => {
          headCategory.children.forEach(category => {
            category.value = (category.value / this.GDPs[country]) * 100;
          });
        });
      } else if (type === "percentTotalSpend") {
        graphData.children.forEach(headCategory => {
          headCategory.children.forEach(category => {
            category.value = (category.value / this.totalSpend) * 100;
          });
        });
      }
      if (this.zoom) {
        graphData = graphData.children.find((c) => c.name === this.zoom);
      }
      return graphData;
    },
    renderGraph() {
      var graphData = this.getFormattedGraphData(this.country, this.type);
      this.buildVirtualChart(graphData);
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

    getValueText: function(value) {
      if (this.type.startsWith("nominal")) {
        return formatCurrency("$0.2s")(value);
      } else {
        return `${(Math.round(value * 10) / 10)}%`;
      }
    },

    buildVirtualCell(data, scale) {
        const height = data.y1 - data.y0;
        const width = data.x1 - data.x0;

        let value = data.value;

        const valueText = this.getValueText(value);

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
            fullTitle: name,
            subtitle: {
                text: valueText,
                x: (width / 2),
                y: (height / 2) + 15 // to place the subtitle below the title
            }
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
#main-container {
  display: flex;
  flex-direction: row;
}

@media (max-width: 480px) {
  #sidebar-container {
    display: none;
  }
}

#sidebar-container {
  min-width: 250px;
  flex-grow: 1;
  background-color: rgb(50, 58, 69);
  color: white;
  margin-right: 2rem;
  padding-top: 2rem;
}

#graph-container {
  flex-grow: 9;
}
</style>

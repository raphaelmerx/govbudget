<template>
    <g class="explorer-cell" :transform="position">
        <rect
            class="explorer-cell-box"
            x="0"
            y="0"
            :width="cell.width"
            :height="cell.height"
            v-bind:style="{fill: cell.color}" 
            />
        <text
            class="explorer-cell-title"
            text-anchor="middle"
            fill="#ffffff"
            :x="cell.title.x"
            :y="cell.title.y">
            {{cell.title.text}}
        </text>
        <text
            class="explorer-cell-subtitle"
            text-anchor="middle"
            fill="#ffffff"
            :x="cell.subtitle.x"
            :y="cell.subtitle.y">
            {{cell.subtitle.text}}
        </text>
        <title>
            {{cell.title.text}}
        </title>
    </g>
</template>

<script>
export default {
  name: "TreeCell",
  props: ['cell'],
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
  },
  computed: {
    position: function () {
      return `translate(${this.cell.x}, ${this.cell.y})`
    }
  }
}
</script>

<style scoped>
.explorer-cell-subtitle {
  font-weight: bold;
}
</style>

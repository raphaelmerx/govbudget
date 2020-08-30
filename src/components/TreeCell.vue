<template>
  <g
    class="explorer-cell"
    :transform="position"
    v-tooltip="{
        content: cell.fullTitle + ': ' + cell.subtitle.text,
        placement: 'auto',
        classes: ['info'],
        targetClasses: ['it-has-a-tooltip'],
        delay: {
          show: 300,
          hide: 300,
        }
      }"
    @mousemove="enteredCell"
    @mouseleave="exitedCell"
  >
    <rect
      class="explorer-cell-box"
      x="0"
      y="0"
      :width="cell.width"
      :height="cell.height"
      v-bind:style="{fill: color}"
    />
    <text
      class="explorer-cell-title"
      text-anchor="middle"
      fill="#ffffff"
      :x="cell.title.x"
      :y="cell.title.y"
    >{{cell.title.text}}</text>
    <text
      class="explorer-cell-subtitle"
      text-anchor="middle"
      fill="#ffffff"
      :x="cell.subtitle.x"
      :y="cell.subtitle.y"
    >{{cell.subtitle.text}}</text>
    <title>{{cell.title.text}}</title>
  </g>
</template>

<script>
const highlightColor = "#fdb81e";

export default {
  name: "TreeCell",
  props: ["cell"],
  data() {
    return {
      color: "",
      msg: "coucou"
    };
  },
  mounted() {
    this.color = this.cell.color;
  },
  methods: {
    enteredCell() {
      this.color = highlightColor;
    },
    exitedCell() {
      this.color = this.cell.color;
    }
  },
  computed: {
    position: function() {
      return `translate(${this.cell.x}, ${this.cell.y})`;
    }
  }
};
</script>

<style scoped>
.explorer-cell-subtitle {
  font-weight: bold;
}
</style>

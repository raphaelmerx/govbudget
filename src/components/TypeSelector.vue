<template>
  <select @change="handleTypeChange">
    <option value="nominal">Euros</option>
    <option value="nominal-per-capita">Euros per capita</option>
    <option value="percentGDP">% of GDP</option>
    <option value="percentTotalSpend">% of Government spending</option>
  </select>
</template>

<script>
export default {
  name: 'TypeSelector',
  props: {
  },
  methods: {
    handleTypeChange: function(event) {
      this.$root.$emit('change-type', event.target.value)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select {
  font-size: 0.8em;
}
</style>

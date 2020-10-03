<template>
  <select @change="handleTypeChange">
    <option value="" disabled selected>breakdown type</option>
    <option value="percentTotalSpend">% of Government spending</option>
    <option value="percentGDP">% of GDP</option>
    <option value="nominal">total amount</option>
    <option value="nominal-per-capita">amount per capita</option>
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
</style>

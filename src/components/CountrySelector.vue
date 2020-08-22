<template>
  <select @change="handleCountryChange">
    <option value="France">France</option>
    <option value="Germany">Germany</option>

    <option value="Austria">Austria</option>
    <option value="Belgium">Belgium</option>
    <option value="Estonia">Estonia</option>
    <option value="Finland">Finland</option>
    <option value="Greece">Greece</option>
    <option value="Ireland">Ireland</option>
    <option value="Italy">Italy</option>
    <option value="Latvia">Latvia</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Netherlands">Netherlands</option>
    <option value="Portugal">Portugal</option>
    <option value="Slovak Republic">Slovak Republic</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Spain">Spain</option>
  </select>
</template>

<script>
export default {
  name: 'CountrySelector',
  props: {
  },
  methods: {
    handleCountryChange: function(event) {
      this.$root.$emit('load-country', event.target.value)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

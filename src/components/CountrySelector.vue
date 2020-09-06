<template>
  <select @change="handleCountryChange">
    <option value="" disabled selected>country</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Belgium">Belgium</option>
    <option value="Czech Republic">Czech Republic</option>
    <option value="Denmark">Denmark</option>
    <option value="Estonia">Estonia</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Germany">Germany</option>
    <option value="Greece">Greece</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="Ireland">Ireland</option>
    <option value="Italy">Italy</option>
    <option value="Japan">Japan</option>
    <option value="Latvia">Latvia</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Netherlands">Netherlands</option>
    <option value="Norway">Norway</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Slovak Republic">Slovak Republic</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Spain">Spain</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="United Kingdom">United Kingdom</option>
  </select>
</template>

<script>
export default {
  name: 'CountrySelector',
  props: {
  },
  methods: {
    handleCountryChange: function(event) {
      this.$root.$emit('change-country', event.target.value)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

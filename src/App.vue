<template>
  <div id="app">
    <CountrySelector />
    <GraphDisplay />
  </div>
</template>

<script>
import CountrySelector from './components/CountrySelector.vue'
import GraphDisplay from './components/GraphDisplay.vue'

export default {
  name: 'App',
  components: {
    CountrySelector,
    GraphDisplay
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

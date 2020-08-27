<template>
  <div id="app">
  <div class="row">
    <div class="col-lg-12">
      <h1 id="timor-leste-ministério-da-saúde-covid-19-dashboard">
        View public finances for
        <CountrySelector />
      </h1>
      <h1 id="timor-leste-ministério-da-saúde-covid-19-dashboard">
        In
        <TypeSelector />
      </h1>
      <p>
        <em>For year 2018</em>
      </p>
    </div>
    <GraphDisplay />
      <p>
        <em>Source: <a href="https://stats.oecd.org" target="_blank"> stats.oecd.org</a></em>
      </p>
  </div>
  </div>
</template>

<script>
import CountrySelector from './components/CountrySelector.vue'
import GraphDisplay from './components/GraphDisplay.vue'
import TypeSelector from './components/TypeSelector.vue'

export default {
  name: 'App',
  components: {
    CountrySelector,
    GraphDisplay,
    TypeSelector,
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
/*
#tree-chart text {
  font-size: 2em;
}
*/

.tooltip {
    position: absolute;
    z-index: 1070;
    display: block;
    margin: 0;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    white-space: normal;
    line-break: auto;
    font-size: .875rem;
    word-wrap: break-word;
    opacity: 0;
}

</style>

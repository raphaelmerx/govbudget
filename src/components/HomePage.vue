<template>
  <div id="main-container">
    <h1 id="header-main">
      Visualize public spending for
      <CountrySelector />
      represented as
      <TypeSelector />
    </h1>
    <GraphDisplay />
    <p>
      <em>
        Data is for year 2018. Source:
        <a href="https://stats.oecd.org" target="_blank">stats.oecd.org</a>
      </em>
    </p>
  </div>
</template>

<script>
import CountrySelector from "./CountrySelector.vue";
import GraphDisplay from "./GraphDisplay.vue";
import TypeSelector from "./TypeSelector.vue";

export default {
  name: 'HomePage',
  components: {
    CountrySelector,
    GraphDisplay,
    TypeSelector
  },
  props: {
  },
  methods: {
  }
}
</script>

<style scoped>
#main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 30vh;
}
@media (max-width: 480px) {
  #main-container {
    padding-top: 0;
  }
}

</style>

import CountrySelector from "../components/CountrySelector";
import TypeSelector from "../components/TypeSelector";
import GraphDisplay from "../components/GraphDisplay";

function Home() {

  const handleCountryChange = (event) => {
    console.log(event.target.value)
  }
  const handleTypeChange = (event) => {
    console.log(event.target.value)
  }
  return (
    <div id="main-container">
      <h1 id="header-main">
        Visualize public spending for
        <CountrySelector handleCountryChange={handleCountryChange} />
        represented as
        <TypeSelector handleTypeChange={handleTypeChange} />
      </h1>
      <GraphDisplay />
      <p>
        <em>
          Data is for year 2018. Source: <a href="https://stats.oecd.org" target="_blank" rel="noreferrer noopener">stats.oecd.org</a>
        </em>
      </p>
    </div>
  );
}

export default Home;

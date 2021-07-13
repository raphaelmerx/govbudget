import CountrySelector from "../components/CountrySelector";
import TypeSelector from "../components/TypeSelector";
import GraphDisplay from "../components/GraphDisplay";

function Home() {

  return (
    <div id="main-container">
      <h1 id="header-main">
        Visualise public spending for
        <CountrySelector />
        represented as
        <TypeSelector />
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

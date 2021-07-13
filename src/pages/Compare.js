import Container from '@material-ui/core/Container';

import CountrySelector from "../components/CountrySelector";
import TableComparison from "../components/TableComparison";

function Compare() {

  return (
    <Container id="about-container">
      <h1 id="header-main">
        Compare public spending in
        <CountrySelector />
        with
        <CountrySelector useCountry2="true" />
      </h1>
      <div>
        <TableComparison />
      </div>
      <p>
        <em>
          Data is for year 2018. Source: <a href="https://stats.oecd.org" target="_blank" rel="noreferrer noopener">stats.oecd.org</a>
        </em>
      </p>
    </Container>
  );
}

export default Compare;

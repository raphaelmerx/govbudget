import './About.css'
import Container from '@material-ui/core/Container';

function About() {
  return (
  <Container id="about-container">
      <h3 class="question">
        What is OpenBudget?
      </h3>
      <p>
        OpenBudget was created as a visualisation tool for public spending, and for comparing how different countries spend their budgets. 
        In 2020, as public spending is poised to break records because of the COVID-19 crisis,
        it aims to give answers about what makes the bulk of public spending in different countries,
        and how they compare with each other with regards to budget allocation.
      </p>
      <h3 class="question">
        What public expenditures are included?
      </h3>
      <p class="answer">
        Data shown on OpenBudget is a combination of public spending at the Central Government, State Government, and Local Government levels.
        Therefore, spending by subnational entities (e.g. a U.S. State) is included in the data shown.
        Social security spending is also included. As a consequence, when pensions are financed through the public sector,
        they count as public spending, whereas pensions that come from private pension plans are not represented.
      </p>
      <h3 class="question">
        Where did the idea behind OpenBudget come from?
      </h3>
      <p>
        On July 2020, Banque de France Governor Villeroy de Galhau declared 
        "Our [French] public social model is too costly. 55% of our national wealth is spent in public spending
        whereas our European neighbors with a similar model spend 45%". This prompted me (Raphaël Merx)
        to dig deeper into where the majority of public spending goes, and how it varies by country.
        Realising that I could find budget visualisations for each country, but no standardised visualisation
        for comparing countries, I set out to build OpenBudget.
      </p>
      <h3 class="question">
        What are some other resources to find comparisons of public spending?
      </h3>
      <ul>
        <li>- <b>OurWorldInData</b> compiled an <a href="https://ourworldindata.org/government-spending" target="_blank" rel="noopener">excellent article on Government spending</a></li>
        <li>- The <b>OECD</b> statistics website contains <a href="https://stats.oecd.org/Index.aspx?datasetcode=SNA_TABLE11_ARCHIVE" target="_blank" rel="noopener">spending tables</a> for several (OECD and non-OECD) countries.</li>
        <li>- <b>Wikipedia</b> has entries for comparing{' '}
          <a href="https://en.wikipedia.org/wiki/List_of_countries_by_government_spending_as_percentage_of_GDP" target="_blank" rel="noopener">Government spending</a>,
          <a href="https://en.wikipedia.org/wiki/List_of_countries_by_spending_on_education_(%25_of_GDP)" target="_blank" rel="noopener">education spending</a>, 
          and <a href="https://en.wikipedia.org/wiki/List_of_countries_by_social_welfare_spending" target="_blank" rel="noopener">welfare spending</a> by country.
        </li>
      </ul>
      <h3 class="question">
        I have a suggestion for OpenBudget...
      </h3>
      <p>
        Would love to hear it, please email me at{' '}
        <a href="#" class="cryptedmail"
          data-name="raphael.merx"
          data-domain="gmail"
          data-tld="com"
          onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;"></a>
        .
      </p>
  </Container>

  )
}

export default About;

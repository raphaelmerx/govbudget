import { useSelector } from 'react-redux'
import { getcountryInfo } from '../reducers/countrySlice'
import {getFormattedAmount, getTotalSpend, getCategorySpend} from '../helpers/financials'

import SidebarItem from './SidebarItem'

const Sidebar = (props) => {
  const [countryOptions, selectedCountry] = useSelector((state) => [state.country.options, state.country.value])
  let selectedCategory = useSelector((state) => state.category.value)
  selectedCategory = (selectedCategory === 'Total') ? null : selectedCategory
  
  const countryInfo = getcountryInfo(selectedCountry, countryOptions)
  const formattedGDP = getFormattedAmount(countryInfo.GDP * 1000000, countryInfo.currency)

  const totalSpend = getTotalSpend(selectedCountry)
  const formattedTotalSpend = getFormattedAmount(totalSpend * 1000000, countryInfo.currency)
  const percentGDP = Math.round(totalSpend / countryInfo.GDP * 1000) / 10;
  const spendWithGDPComparison = `${formattedTotalSpend} (${percentGDP}% of GDP)`

  let formattedCategorySpend;
  if (selectedCategory) {
    formattedCategorySpend = getFormattedAmount(getCategorySpend(selectedCountry, selectedCategory) * 1000000, countryInfo.currency)
  }

  return (
    <>
      <SidebarItem label={selectedCountry + ' GDP'} value={formattedGDP} hasNext={true} />
      <SidebarItem label="Public spending" value={spendWithGDPComparison} hasNext={selectedCategory} />
      {formattedCategorySpend &&
        <SidebarItem label={selectedCategory} value={formattedCategorySpend} />
      }
    </>
  );
}

export default Sidebar;

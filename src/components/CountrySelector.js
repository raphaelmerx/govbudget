import { useSelector, useDispatch } from 'react-redux'
import { selectOption as selectCountry } from '../reducers/countrySlice'
import { selectOption as selectCountry2 } from '../reducers/countrySlice2'

const CountrySelector = (props) => {
  const [countryOptions, selectedCountry] = useSelector((state) => [state.country.options, state.country.value])
  const selectedCountry2 = useSelector((state) => state.country2.value)
  const dispatch = useDispatch()

  const handleCountryChange = (event) => {
    if (props.useCountry2) dispatch(selectCountry2(event.target.value))
    else dispatch(selectCountry(event.target.value))
  };

  return (
    <select onChange={handleCountryChange} defaultValue={props.useCountry2 ? selectedCountry2 : selectedCountry}>
      <option value="" disabled>country</option>
      {countryOptions.map((option) => (
        <option key={option.key} value={option.key}>{option.key}</option>
      ))}
    </select >
  );
}

export default CountrySelector;

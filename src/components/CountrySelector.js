import { useSelector, useDispatch } from 'react-redux'
import { selectOption } from '../reducers/countrySlice'

const CountrySelector = (props) => {
  const [countryOptions, selectedCountry] = useSelector((state) => [state.country.options, state.country.value])
  const dispatch = useDispatch()

  const handleCountryChange = (event) => {
    dispatch(selectOption(event.target.value))
  };

  return (
    <select onChange={handleCountryChange} defaultValue={selectedCountry}>
      <option value="" disabled>country</option>
      {countryOptions.map((option) => (
        <option key={option.key} value={option.key}>{option.key}</option>
      ))}
    </select >
  );
}

export default CountrySelector;

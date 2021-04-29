import { useSelector, useDispatch } from 'react-redux'
import { selectOption } from '../reducers/typeSlice'


const TypeSelector = (props) => {
  const [typeOptions, selectedType] = useSelector((state) => [state.type.options, state.type.value])
  const dispatch = useDispatch()

  const handleTypeChange = (event) => {
    dispatch(selectOption(event.target.value))
  };

  return (
    <select onChange={handleTypeChange} defaultValue={selectedType}>
      <option value="" disabled>breakdown type</option>
      {typeOptions.map((type) => (
        <option key={type.key} value={type.key}>{type.name}</option>
      ))}
    </select>
  );
}

export default TypeSelector;

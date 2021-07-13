import { useSelector, useDispatch } from 'react-redux'
import { selectOption } from '../reducers/categorySlice'

import {getCategories} from '../helpers/financials'

const CategorySelector = (props) => {
  const selectedCategory = useSelector((state) => state.category.value)
  const dispatch = useDispatch()

  const handleCategoryChange = (event) => {
    dispatch(selectOption(event.target.value))
  };

  const categoryOptions = ['Total', ...getCategories('Australia')]

  return (
    <select onChange={handleCategoryChange} defaultValue={selectedCategory}>
      <option value="" disabled>Category</option>
      {categoryOptions.map((category) => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  );
}

export default CategorySelector;

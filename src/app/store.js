import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../reducers/countrySlice'
import countryReducer2 from '../reducers/countrySlice2'
import typeReducer from '../reducers/typeSlice'
import categorySlice from '../reducers/categorySlice'

export default configureStore({
  reducer: {
    country: countryReducer,
    country2: countryReducer2,
    type: typeReducer,
    category: categorySlice,
  },
})

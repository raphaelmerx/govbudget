import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../reducers/countrySlice'
import typeReducer from '../reducers/typeSlice'
import categorySlice from '../reducers/categorySlice'

export default configureStore({
  reducer: {
    country: countryReducer,
    type: typeReducer,
    category: categorySlice,
  },
})

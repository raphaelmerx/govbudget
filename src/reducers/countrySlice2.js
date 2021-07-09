import { createSlice } from '@reduxjs/toolkit'

import countries from '../app/countries.json'

export const getcountryInfo = (key, options) => {
  return options.find(option => option.key === key);
}

export const countrySlice = createSlice({
  name: 'country2',
  initialState: {
    value: "France",
    options: countries,
  },
  reducers: {
    selectOption: (state, action) => {
      state.value = action.payload
    },
  },
})


// Action creators are generated for each case reducer function
export const { selectOption } = countrySlice.actions

export default countrySlice.reducer

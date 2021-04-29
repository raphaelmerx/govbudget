import { createSlice } from '@reduxjs/toolkit'

export const getcountryInfo = (key, options) => {
  return options.find(option => option.key === key);
}

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    value: "Australia",
    options: [
      { key: "Australia", GDP: 1947246, population: 24992860, currency: "A$" },
      { key: "Austria", GDP: 385711.94, population: 8837707, currency: "€" },
      { key: "Belgium", GDP: 459531.6, population: 11403740, currency: "€" },
      { key: "Czech Republic", GDP: 5408766, population: 10626430, currency: "CZK" },
      { key: "Denmark", GDP: 2245954.115, population: 5789957, currency: "DKK" },
      { key: "Estonia", GDP: 26035.854, population: 1321977, currency: "€" },
      { key: "Finland", GDP: 233662, population: 5515525, currency: "€" },
      { key: "France", GDP: 2360687, population: 66941698, currency: "€" },
      { key: "Germany", GDP: 3344370, population: 82914191, currency: "€" },
      { key: "Greece", GDP: 184713.6072, population: 10725886, currency: "€" },
      { key: "Hungary", GDP: 42661805, population: 9767600, currency: "HUF" },
      { key: "Iceland", GDP: 2787386.0031, population: 352722, currency: "ISK" },
      { key: "Ireland", GDP: 324038.1891, population: 4857015, currency: "€" },
      { key: "Israel", GDP: 1330617.6731, population: 8872943, currency: "ILS" },
      { key: "Italy", GDP: 1766168.2, population: 60421797, currency: "€" },
      { key: "Japan", GDP: 547125500, population: 126443180, currency: "¥" },
      { key: "Latvia", GDP: 29056.05, population: 1927170, currency: "€" },
      { key: "Lithuania", GDP: 45264.3769, population: 2801541, currency: "€" },
      { key: "Netherlands", GDP: 773987, population: 17231622, currency: "€" },
      { key: "Norway", GDP: 3530860, population: 5311916, currency: "NOK" },
      { key: "Poland", GDP: 2120480, population: 38413139, currency: "PLN" },
      { key: "Portugal", GDP: 204304.761, population: 10283822, currency: "€" },
      { key: "Slovak Republic", GDP: 89605.907, population: 5446771, currency: "€" },
      { key: "Slovenia", GDP: 45754.8179, population: 2070050, currency: "€" },
      { key: "Spain", GDP: 1202193, population: 46733038, currency: "€" },
      { key: "Sweden", GDP: 4828306, population: 10175214, currency: "SEK" },
      { key: "Switzerland", GDP: 689545.26, population: 8513227, currency: "CHF" },
      { key: "United Kingdom", GDP: 2144304, population: 66435550, currency: "£" },
      { key: "United States", GDP: 20580159.8, population: 327167434, currency: "$" },
    ],
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

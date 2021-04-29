import { createSlice } from '@reduxjs/toolkit'


export const typeSlice = createSlice({
  name: 'type',
  initialState: {
    value: "nominal-per-capita",
    options: [
      {key: "percentTotalSpend", name: "% of Government spending"},
      {key: "percentGDP", name: "% of GDP"},
      {key: "nominal", name: "total amount"},
      {key: "nominal-per-capita", name: "amount per capita"},
    ],
  },
  reducers: {
    selectOption: (state, action) => {
      state.value = action.payload
    },
  },
})


// Action creators are generated for each case reducer function
export const { selectOption } = typeSlice.actions

export default typeSlice.reducer

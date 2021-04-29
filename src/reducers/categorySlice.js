import { createSlice } from '@reduxjs/toolkit'


export const categorySlice = createSlice({
  name: 'function',
  initialState: {
    value: null
  },
  reducers: {
    selectOption: (state, action) => {
      state.value = action.payload
    },
  },
})


// Action creators are generated for each case reducer function
export const { selectOption } = categorySlice.actions

export default categorySlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const graphSlice = createSlice({
  name: 'GraphData',
  initialState: {
    data: [
        ["Year","Sales","Profit"],
        [2018,1000,200],
        [2019,1170,250],
        [2020,660,300],
        [2021,1030,400],
        [2022,1130,500],
      ],
    graphType: '',
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setGraphType: (state, action) => {
        state.graphType = action.payload;
    }
  },
})

export const { setData, setGraphType } = graphSlice.actions

export const selectData = (state) => state.graph.data;
export const selectGraphType = (state) => state.graph.graphType;

export default graphSlice.reducer

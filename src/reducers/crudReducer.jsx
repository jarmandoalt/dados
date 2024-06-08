import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: {
    arrNames:[]
  }
};

const crudReducer = createSlice({
  name: "crudReducer",
  initialState,
  reducers: {
    DATA: (state, action) => {
      state.data = Object.assign(state.data, action.payload);
    },
  },
});

export const {
  DATA
} = crudReducer.actions;

export default crudReducer.reducer;

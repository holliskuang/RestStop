import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const existingReqSlice = createSlice({
  name: 'ExistingReqRes',
  initialState,
  reducers: {
    addReqRes: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    deleteReqRes: (state, action) => {
      delete state[action.payload.id];
    },
  },
});

export const { addReqRes, deleteReqRes } = requestSlice.actions;
export default requestSlice.reducer;

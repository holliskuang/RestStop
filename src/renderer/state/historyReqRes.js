import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const historyReqRes = createSlice({
  name: 'historyReqRes',
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

export const { addReqRes, deleteReqRes } = historyReqRes.actions;
export default historyReqRes.reducer;

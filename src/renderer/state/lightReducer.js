import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
};

const lightReducer = createSlice({
  name: 'light',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setMode } = lightReducer.actions;
export default lightReducer.reducer;

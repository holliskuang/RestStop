import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
};

const lightSlice = createSlice({
  name: 'light',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      console.log(state.mode)
    },
  },
});

export const { setMode } = lightSlice.actions;
export default lightSlice.reducer;

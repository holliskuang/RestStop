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

    },
  },
});

export const { setMode } = lightSlice.actions;
export default lightSlice.reducer;

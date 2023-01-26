import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: '',
  method: 'GET',
  headers: {},
  body: '',
  response: '',
  error: false,
  loading: true,
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setMethod: (state, action) => {
      state.method = action.payload;
    },
    addHeaders: (state, action) => {
      state.headers = {...state.headers, [action.payload.key]: action.payload.value}
    },
    subtractHeaders: (state, action) => {

    }
    setBody: (state, action) => {
      state.body = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUrl,
  setMethod,
  addHeaders,
    subtractHeaders,
  setBody,
  setResponse,
  setError,
  setLoading,
} = requestSlice.actions;
export default requestSlice.reducer;

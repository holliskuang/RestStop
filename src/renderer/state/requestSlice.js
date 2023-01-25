import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: '',
  method: 'GET',
  headers: '',
  body: '',
  response: '',
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
        setHeaders: (state, action) => {
            state.headers = action.payload;
        }
        setBody: (state, action) => {
            state.body = action.payload;
        }
        setResponse: (state, action) => {
            state.response = action.payload;
        }
      },
    },
  );

    export const { setUrl, setMethod, setHeaders, setBody, setResponse } = requestSlice.actions;
    export default requestSlice.reducer;
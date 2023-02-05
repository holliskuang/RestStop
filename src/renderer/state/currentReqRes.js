import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initalObj = {};
initalObj[uuid()] = { key: '', value: '', checked: false };

const initialState = {
  url: 'https://spacex-production.up.railway.app/',
  method: 'GET',
  headers: initalObj,
  body: `query ExampleQuery {
    company {
      people
    }
    roadster {
      apoapsis_au
    }
  }`,
  bodyType: 'text/plain',
  response: '',
  error: false,
  loading: true,
  folder: 'Home Folder',
  test: 'assert(response.status === 200)',
  responseMode: 'HTTP',
  variables: `{
    "people" : "ceo"
  }`,
};

const currentReqRes = createSlice({
  name: 'currentReqRes',
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
    },
    setBody: (state, action) => {
      state.body = action.payload;
    },
    setBodyType: (state, action) => {
      state.bodyType = action.payload;
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
    setFolder: (state, action) => {
      state.folder = action.payload;
    },
    setTest: (state, action) => {
      state.test = action.payload;
    },
    setResponseMode: (state, action) => {
      state.responseMode = action.payload;
    },
    setVariables: (state, action) => {
      state.variables = action.payload;
    },
  },
});

export const {
  setUrl,
  setMethod,
  setHeaders,
  setBody,
  setBodyType,
  setResponse,
  setError,
  setLoading,
  setFolder,
  setTest,
  setResponseMode,
  setVariables,
} = currentReqRes.actions;
export default currentReqRes.reducer;

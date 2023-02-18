import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initalObj = {};
initalObj[uuid()] = { key: '', value: '', checked: false };

const initialState = {
  url: '',
  method: 'GET',
  headers: initalObj,
  body: ``,
  bodyType: 'text/plain',
  response: '',
  error: false,
  loading: true,
  folder: 'Home Folder',
  test: 'assert(response.status === 200)',
  responseMode: 'HTTP',
  variables: ``,
  connectionStatus: 'Closed',
  filedata: '',
  rpcs: [],
  service: '',
  filePath: '',
  gRPCChatLog: [],
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
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
    setFileData: (state, action) => {
      state.filedata = action.payload;
    },
    setRpcs: (state, action) => {
      state.rpcs = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setFilePath: (state, action) => {
      state.filePath = action.payload;
    },
    setGRPCChatLog: (state, action) => {
      state.gRPCChatLog = action.payload;
    }
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
  setConnectionStatus,
  setFileData,
  setRpcs,
  setService,
  setFilePath,
  setGRPCChatLog,
} = currentReqRes.actions;
export default currentReqRes.reducer;

/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import chai from 'chai';

var setCookie = require('set-cookie-parser');
var assert = chai.assert;

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

// handle Request , pull in headers and cookies and body and return response object
export async function handleRequest(reqResObj) {
  const resHeader = {};
  let response = await fetch(
    reqResObj.url,
    {
      method: reqResObj.method,
      headers: reqResObj.headers,
    }
    // handle error
  ).catch((err) => {
    console.log(err);
    reqResObj['responseStatus'] = 500;
    reqResObj['responseBody'] = err.message;
    return reqResObj;
  });

  if (reqResObj.responseStatus == 500) {
    reqResObj['responseCookies'] = [{}];
    reqResObj['responseHeaders'] = {};
    return reqResObj;
  }

  handleTest(reqResObj, response);

  /*const testResults = handleTest(reqResObj, response);
  reqResObj['responseTest'] = testResults; */
  const contentType = response.headers.get('content-type');
  const cookieMonster = setCookie.parse(response.headers.get('set-cookie'));

  response.headers.forEach((value, key) => {
    resHeader[key] = value;
  });

  reqResObj['responseCookies'] = cookieMonster;
  reqResObj['responseHeaders'] = resHeader;
  reqResObj['responseStatus'] = response.status;

  // if JSON
  if (contentType && contentType.indexOf('application/json') !== -1) {
    let json = await response.json();
    reqResObj['responseBody'] = json;
  }
  // if text
  else {
    let text = await response.text();
    reqResObj['responseBody'] = text;
  }

  return reqResObj;
}

async function handleTest(reqResObj, response) {
  reqResObj['originalTest'] = reqResObj.test;
  try {
    eval(reqResObj.test);
    reqResObj['responseTest'] = true;
  } catch (err) {
    reqResObj['responseTest'] = false;
    return;
  }
}

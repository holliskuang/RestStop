import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import NodeWebSocket from 'ws';
import { electronDispatch } from '../renderer/state/store';
import { setResponse } from '../renderer/state/currentReqRes';

export async function GQLFetch(reqResObj, mainWindow): Promise<object> {
  // if (reqResObj.method === 'SUBSCRIPTION') we have to separate it from the rest of the methods
  // because it uses websocket not http
  const wsLink = new GraphQLWsLink(
    createClient({
      webSocketImpl: typeof window === 'undefined' ? NodeWebSocket : WebSocket,
      url: `${reqResObj.url}`,
      connectionParams: {
        headers: reqResObj.headers,
      },
    })
  );

  // Links for URL and Headers
  const authLink = setContext((_, { headers }) => {
    return { headers: reqResObj.headers };
  });

  const httpLink = new HttpLink({
    uri: `${reqResObj.url}`,
    fetchOptions: {
      mode: 'no-cors',
    },
  });
  //on error Link
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      reqResObj['responseBody'] = `networkError`;
    }
  });

  // Switch Out any Variables
  handleVariables(reqResObj);
  //test graphql client
  const client = new ApolloClient({
    link: from([
      errorLink,
      authLink,
      reqResObj.method === 'SUBSCRIPTION' ? wsLink : httpLink,
    ]),
    // uri: `${reqResObj.url}`,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
  // if subscription, we have to use the client.subscribe method

  if (reqResObj.method === 'SUBSCRIPTION') {
    const observableSubscription = client.subscribe({
      query: gql`
        ${reqResObj.body}
      `,
    });

    observableSubscription.subscribe(
      (result) => {
        // ipc send update to renderer
        console.log(result);
        mainWindow.webContents.send('subscription', result);
      },
      // on error
      (error) => {
        mainWindow.webContents.send('subscription', error);
        return reqResObj;
      }
    );
  }

  // const client = ...
  if (reqResObj.method === 'QUERY') {
    const query = await client.query({
      query: gql`
        ${reqResObj.body}
      `,
    });
    const responseBody = query.data;
    reqResObj['responseBody'] = responseBody;
  } else if (reqResObj.method === 'MUTATION') {
    const mutation = await client.mutate({
      mutation: gql`
        ${reqResObj.body}
      `,
    });

    const responseBody = mutation.data;
    reqResObj['responseBody'] = responseBody;
  }

  return reqResObj;
}

// dissect JSON variables for each individual variable and apply variables to body
function handleVariables(reqResObj): object {
  const variables = reqResObj.variables;
  const body = reqResObj.body;
  const variableKeys = Object.keys(variables);

  variableKeys.forEach((key) => {
    const variable = variables[key];
    const variableType = typeof variable;
    if (variableType === 'string') {
      reqResObj.body = body.replaceAll(`${key}`, `${variable}`);
    } else if (variableType === 'number') {
      reqResObj.body = body.replaceAll(`${key}`, `${variable}`);
    } else if (variableType === 'boolean') {
      reqResObj.body = body.replaceAll(`${key}`, `${variable}`);
    } else if (variableType === 'object') {
      reqResObj.body = body.replaceALl(`${key}`, `${JSON.stringify(variable)}`);
    }
  });

  return reqResObj;
}

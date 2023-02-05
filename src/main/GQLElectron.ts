import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  gql,
  HttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

export async function GQLFetch(reqResObj): Promise<object> {
  // Links for URL and Headers
  console.log('GQLTest', reqResObj)
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
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  // Switch Out any Variables
  handleVariables(reqResObj);
  //test graphql client
  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    // uri: `${reqResObj.url}`,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

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

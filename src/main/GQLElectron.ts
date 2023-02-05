import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

export async function GQLTest(reqResObj): Promise<object> {
  // Switch Out any Variables
  handleVariables(reqResObj);
  //test graphql client
  const client = new ApolloClient({
    uri: `${reqResObj.url}`,
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

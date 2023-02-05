import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

export async function GQLTest(reqResObj): object {
  //test graphql client
  const client = new ApolloClient({
    uri: `${reqResObj.url}`,
    cache: new InMemoryCache(),
  });

  // const client = ...
  if (reqResObj.method === 'QUERY') {
    const query = await client.query({
      query: gql`
        ${reqResObj.body}
      `,
    });
    reqResObj['responseBody'] = query;
  } else if (reqResObj.method === 'MUTATION') {
    const mutation = await client.mutate({
      mutation: gql`
        ${reqResObj.body}
      `,
    });
    reqResObj['responseBody'] = mutation;
  }
  handleVariables(reqResObj);
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
      reqResObj.body = body.replace(`$${key}`, `"${variable}"`);
    } else if (variableType === 'number') {
      reqResObj.body = body.replace(`$${key}`, `${variable}`);
    } else if (variableType === 'boolean') {
      reqResObj.body = body.replace(`$${key}`, `${variable}`);
    } else if (variableType === 'object') {
      reqResObj.body = body.replace(`$${key}`, `${JSON.stringify(variable)}`);
    }
  });

  return reqResObj;
}

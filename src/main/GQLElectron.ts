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
  if (reqResObj.variables === '') {
    return reqResObj;
  }
  const variables = reqResObj.variables;
  const variablesArray = variables.split(',');
  const variablesObject = {};
  variablesArray.forEach((variable) => {
    const variableArray = variable.split(':');
    variablesObject[variableArray[0]] = variableArray[1];
  });
  reqResObj['body'] = reqResObj.body.replace('CEO', 'testworks');
  return reqResObj;
}

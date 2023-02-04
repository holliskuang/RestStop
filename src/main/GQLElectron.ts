import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

export default async function GQLTest(reqResObj): object {
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

  return reqResObj;
}

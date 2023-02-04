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
        query ExampleQuery {
          company {
            ceo
          }
          roadster {
            apoapsis_au
          }
        }
      `,
    });
    reqResObj['responseBody'] = query;
  } else if (reqResObj.method === 'MUTATION') {
    const mutation = await client.mutate({
      mutation: gql`
        mutation ExampleMutation {
          company {
            ceo
          }
          roadster {
            apoapsis_au
          }
        }
      `,
    });
    reqResObj['responseBody'] = mutation;
  }

  return reqResObj;
}

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

export default async function GQLTest(reqResObj): object {
  //test graphql client
  const client = new ApolloClient({
    uri: 'https://spacex-production.up.railway.app/',
    cache: new InMemoryCache(),
  });

  // const client = ...

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

  reqResObj['responseBody'] = query

  return reqResObj;
}

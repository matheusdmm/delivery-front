import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { supabase } from '../../supabase.config';

const httpLink = createHttpLink({
  uri: 'http://localhost:3030/',
});

const authLink = setContext(async (_, { headers }) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

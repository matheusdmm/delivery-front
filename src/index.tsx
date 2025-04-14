import ReactDOM from 'react-dom/client'; // Importar 'react-dom/client'
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

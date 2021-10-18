import './App.css';
import BookList from './components/BookList';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddBookForm from './components/AddBookForm';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>
          {'Aahad\'s Reading List!'}
        </h1>
        <div className="flex-container">
          <BookList />
          <AddBookForm />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;

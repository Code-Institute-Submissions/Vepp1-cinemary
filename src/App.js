import { Container } from 'react-bootstrap';
import './App.css';
import { Route, Switch } from "react-router-dom";
import PostList from './pages/posts/PostList';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
          <Switch>
            <Route exact path='/' render={() => <PostList />} />
          </Switch>
      </Container>
    </div>
  );
}

export default App;

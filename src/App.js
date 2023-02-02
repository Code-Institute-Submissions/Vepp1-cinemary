import { Container } from "react-bootstrap";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PostList from "./pages/posts/PostList";
import NavBar from "./components/NavBar";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import CreatePost from "./pages/posts/CreatePost";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <PostList />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route export path="/posts/create" render={() => <CreatePost />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;

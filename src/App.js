import { Container } from "react-bootstrap";
import "./App.css";
import { Route, Routes } from "react-router-dom";
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
        <Routes>
          <Route exact path="/" element={<PostList />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route export path="/posts/create" element={<CreatePost />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

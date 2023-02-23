import { Container } from "react-bootstrap";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MovieList from "./pages/posts/MovieList";
import NavBar from "./components/NavBar";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import CreateReview from "./pages/posts/CreateReview";
import EditReview from "./pages/posts/EditReview";
import MoviePage from "./pages/posts/MoviePage";
import ChangePassword from "./pages/auth/ChangePassword";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container fluid>
        <Routes>
          <Route exact path="/" element={<MovieList />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route export path="/posts/create" element={<CreateReview />} />
          <Route export path="/edit/:id" element={<EditReview />} />
          <Route export path="/posts/:id" element={<MoviePage />} />
          <Route export path="/profiles/:id" element={<ChangePassword />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

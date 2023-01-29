import { Container } from 'react-bootstrap';
import './App.css';
import { Route, Switch } from "react-router-dom";
import PostList from './pages/posts/PostList';
import NavBar from './components/NavBar';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/')
      setCurrentUser(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleMount()
  }, [])
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className="App">
          <NavBar />
          <Container>
              <Switch>
                <Route exact path='/' render={() => <PostList />} />
                <Route exact path='/signup' render={() => <SignUpForm />} />
                <Route exact path='/signin' render={() => <SignInForm />} />
              </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCurrentUser } from '../context/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser()

  const loggedInNav = (<><Nav.Link href="/">Create Post</Nav.Link>
                      <Nav.Link href="/">Logout</Nav.Link> 
                      <Nav.Link>{currentUser?.username}</Nav.Link> </>)
  const loggedOutNav = (<><Nav.Link href="/signin">Sign in</Nav.Link>
                      <Nav.Link href="/signup">Sign up</Nav.Link></>)

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Cinemary</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            { currentUser ? loggedInNav : loggedOutNav}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
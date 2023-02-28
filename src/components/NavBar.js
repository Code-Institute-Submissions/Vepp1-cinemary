import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { axiosReq } from "../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";
import styles from "../styles/NavBar.module.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosReq.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (error) {
      console.log(error);
    }
  };

  function LoggedInIcons() {
    return (
      <>
        <Nav.Link className={styles.Navlink} href="/">
          <i className="fa-solid fa-list" />
          Reviews
        </Nav.Link>
        <Nav.Link className={styles.Navlink} href="/liked">
          <i className="fa-solid fa-heart" />
          Liked
        </Nav.Link>
        <Nav.Link className={styles.Navlink} href="/posts/create">
          <i className="fa-solid fa-pencil" />
          Create
        </Nav.Link>
        <NavDropdown
          variant="dark"
          title={
            <>
              <i className={`fa-solid fa-user`} /> {currentUser?.username}
            </>
          }
          className={styles.Dropdown}
        >
          <NavDropdown.Item className="text-dark" onClick={handleLogout}>
            Logout
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => navigate(`/profiles/${currentUser.profile_id}`)}
            className="text-dark"
          >
            Change Credentials
          </NavDropdown.Item>
        </NavDropdown>
      </>
    );
  }

  function LoggedOutIcons() {
    return (
      <>
        <Nav.Link href="/" className={styles.Navlink}>
          <i className="fa-solid fa-list" />
          Reviews
        </Nav.Link>
        <Nav.Link href="/signin" className={styles.Navlink}>
          <i className="fa-solid fa-right-to-bracket" />
          Sign in
        </Nav.Link>
        <Nav.Link href="/signup" className={styles.Navlink}>
          <i className="fa-solid fa-user-plus" />
          Sign up
        </Nav.Link>
      </>
    );
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand className={`mx-auto ${styles.Logo}`} href="/">
          Cinemary
          <i className="fa-solid fa-film" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ml-auto ${styles.Nav}`}>
            {currentUser ? <LoggedInIcons /> : <LoggedOutIcons />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

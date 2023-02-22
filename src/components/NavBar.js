import { DropdownButton, NavLink } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { axiosReq } from "../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";
import styles from "../styles/NavBar.module.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleLogout = async () => {
    try {
      await axiosReq.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className={styles.Logo} href="/">
          Cinemary
          <i className="fa-solid fa-film" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.Nav}>
            {currentUser ? (
              <>
                <NavLink href="/">Reviews</NavLink>
                <NavLink href="/posts/create">Create</NavLink>

                <DropdownButton
                  variant="dark"
                  className=""
                  title={currentUser?.username}
                >
                  <DropdownItem>
                    <NavLink className="text-dark" onClick={handleLogout}>
                      Logout
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink className="text-dark">Change Credentials</NavLink>
                  </DropdownItem>
                </DropdownButton>
              </>
            ) : (
              <>
                <NavLink href="/">Review</NavLink>
                <NavLink href="/signin">Sign in</NavLink>
                <NavLink href="/signup">Sign up</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

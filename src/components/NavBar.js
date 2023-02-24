import { NavDropdown, NavLink } from "react-bootstrap";
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

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand className={styles.Logo} href="/">
        Cinemary
        <i className="fa-solid fa-film" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles.Nav}>
          {currentUser ? (
            <>
              <Nav.Link className={styles.Icons} href="/">
                <i class="fa-solid fa-list" />
                Reviews
              </Nav.Link>
              <Nav.Link className={styles.Icons} href="/posts/create">
                <i class="fa-solid fa-pencil" />
                Create
              </Nav.Link>
              <NavDropdown
                variant="dark"
                className={styles.Icons}
                title={
                  <>
                    <i class={`fa-solid fa-user`} /> {currentUser?.username}
                  </>
                }
              >
                <NavDropdown.Item>
                  <Nav.Link className="text-dark" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink
                    onClick={() => navigate(`/profiles/${currentUser.pk}`)}
                    className="text-dark"
                  >
                    Change Credentials
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Link href="/">Reviews</Nav.Link>
              <Nav.Link href="/signin">Sign in</Nav.Link>
              <Nav.Link href="/signup">Sign up</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

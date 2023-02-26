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
import { NavLink, useNavigate } from "react-router-dom";

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
      <Container>
        <Navbar.Brand className={`mx-auto ${styles.Logo}`} href="/">
          Cinemary
          <i className="fa-solid fa-film" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ml-auto ${styles.Nav}`}>
            {currentUser ? (
              <>
                <NavLink
                  className={styles.Navlink}
                  to="/"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                        }
                      : undefined
                  }
                >
                  <i className="fa-solid fa-list" />
                  Reviews
                </NavLink>
                <NavLink
                  className={styles.Navlink}
                  to="/liked"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                        }
                      : undefined
                  }
                >
                  <i className="fa-solid fa-heart" />
                  Liked
                </NavLink>
                <NavLink
                  className={styles.Navlink}
                  to="/posts/create"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                        }
                      : undefined
                  }
                >
                  <i className="fa-solid fa-pencil" />
                  Create
                </NavLink>
                <NavDropdown
                  variant="dark"
                  className={styles.Navlink}
                  title={
                    <>
                      <i className={`fa-solid fa-user`} />{" "}
                      {currentUser?.username}
                    </>
                  }
                >
                  <NavDropdown.Item
                    className="text-dark"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() =>
                      navigate(`/profiles/${currentUser.profile_id}`)
                    }
                    className="text-dark"
                  >
                    Change Credentials
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={styles.Navlink}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                        }
                      : undefined
                  }
                >
                  <i className="fa-solid fa-list" />
                  Reviews
                </NavLink>
                <NavLink
                  to="/signin"
                  className={styles.Navlink}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                        }
                      : undefined
                  }
                >
                  <i className="fa-solid fa-right-to-bracket" />
                  Sign in
                </NavLink>
                <NavLink
                  to="/signup"
                  className={styles.Navlink}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                        }
                      : undefined
                  }
                >
                  <i className="fa-solid fa-user-plus" />
                  Sign up
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { HiMenuAlt3 } from "react-icons/hi";
import logo from "../../logo.png";
import Search from "../search/Search";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  //style on current
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  //navigate after login
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  //to redirect to login if directly to /admin
  useEffect(() => {
    const auth = true;
    if (!auth) {
      navigate("/login");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <div className={styles.header}>
      <nav>
        <div className={styles.flex}>
          <Link to="/" exact="true" className={styles.logo}>
            <img src={logo} alt="Back to home" />
          </Link>
          <Search className={styles.search} />
        </div>

        <button
          className={styles.hamburger}
          aria-label="Search"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <HiMenuAlt3 />
        </button>
        <div className={isNavExpanded ? "menu expanded" : "menu"} onClick={() => setIsNavExpanded(!isNavExpanded)}>
          <ul>
            <li>
              <Link to="/" exact="true" className={`${splitLocation[1] === "" ? "current" : "current:hover"} ${styles.link}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`${splitLocation[1] === "contact" ? "current" : "current:hover"} ${styles.link}`}>
                Contact
              </Link>
            </li>

            <li>
              <Link to="/about" className={`${splitLocation[1] === "about" ? "current" : "current:hover"} ${styles.link}`}>
                About us
              </Link>
            </li>
            <li>
              {auth ? (
                <div className={styles.loggedIn}>
                  <Link to="/admin" className={`${styles.link} "logged-in-link"`}>
                    Dashboard | Logged in
                  </Link>

                  <button className={styles.loginBtn} onClick={logout}>
                    Log out
                  </button>
                </div>
              ) : (
                <Link to="/login" className={styles.link}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;

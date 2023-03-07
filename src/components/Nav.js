import { Link } from "react-router-dom";
import * as cognito from "../cognito";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

const Nav = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    cognito.signOut();
    setUser("");
  };

  return (
    <nav className="bg-rose-400">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/singup">Sing Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/create">create</Link>
            </li>
            <li>
              <Link to="/myposts">myposts</Link>
            </li>
            <li>
              <Link to="/mycomments">mycomments</Link>
            </li>

            <li onClick={handleLogout} className="cursor-auto">
              Logout
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

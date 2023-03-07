import { Link } from "react-router-dom";
import * as cognito from "../cognito";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth/AuthContext";

const Nav = () => {
  const { user, setUser } = useContext(AuthContext);

  const [navOpen, setNavOpen] = useState(false);

  const handleLogout = () => {
    cognito.signOut();
    setUser("");
  };

  const isDesktop = (e) => {
    if (e.matches) {
      setNavOpen(false);
    }
  };

  const showHideNav = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 800px");
    mediaQuery.addEventListener("change", isDesktop);
    return () => mediaQuery.addEventListener("change", isDesktop);
  }, []);

  return (
    <nav className="bg-emerald-500 text-white flex flex-wrap items-center justify-between w-full py-4 px-4">
      <div className="font-bold">
        <a href="/">BChat</a>
      </div>

      {user ? (
        <button onClick={showHideNav}>
          <div className="rounded-full w-7 h-7 bg-gray-400 visible justify-center items-center md:invisible md:flex">
            <i className="fa-solid fa-user"></i>
          </div>
        </button>
      ) : (
        ""
      )}

      <div className={` ${navOpen ? "" : "hidden"} w-full md:w-auto  md:flex md:items-center `} id="menu">
        <ul className="text-right pt-4 text-base md:flex md:justify-between md:pt-0">
          {user ? (
            <>
              <li className="p-2 hover:text-emerald-700 md:pr-2">
                <Link to="/">{navOpen ? <i className="fa-solid fa-house pr-2"></i> : ""} Home</Link>
              </li>
              <li className="p-2 hover:text-emerald-700 md:pr-2">
                <Link to="/profile">{navOpen ? <i className="fa-regular fa-user pr-2"></i> : ""} Profile</Link>
              </li>
              <li className="p-2 hover:text-emerald-700 md:pr-2">
                <Link to="/myposts">
                  {navOpen ? <i className="fa-regular fa-pen-to-square pr-2"></i> : ""} My Posts
                </Link>
              </li>
              <li className="p-2 hover:text-emerald-700 md:pr-2">
                <Link to="/mycomments">
                  {navOpen ? <i className="fa-regular fa-comment pr-2"></i> : ""} My Comments
                </Link>
              </li>

              <li onClick={handleLogout} className="cursor-pointer p-2 hover:text-emerald-700 md:pr-2">
                {navOpen ? <i className="fa-solid fa-arrow-right-from-bracket pr-2"></i> : ""} Logout
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
      {user ? (
        ""
      ) : (
        <div className="bg-white text-emerald-500 rounded px-2 font-bold hover:bg-emerald-900">
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;

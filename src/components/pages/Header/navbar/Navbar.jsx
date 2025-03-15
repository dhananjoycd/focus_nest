import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../../Providers/AuthContext/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink to="/profile"> My Profile</NavLink>
      </li>
      <li>
        <NavLink to="/money_track">Money</NavLink>
      </li>
      <li>
        <NavLink to="/time_track">Time</NavLink>
      </li>
      <li>
        <NavLink to="/signIn">Sign In</NavLink>
      </li>
      <li>
        <NavLink to="/signUp">Sign Up</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        <NavLink className="btn btn-ghost text-xl" to="/">
          Focus Nest
        </NavLink>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button className="btn btn-error" onClick={signOutUser}>
            Sign Out
          </button>
        ) : (
          <NavLink className="btn btn-primary" to="/signIn">
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;

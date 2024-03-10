import { NavLink, useNavigate } from "react-router-dom";
import "./nav.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, logout } from "./state/authSlice";
export const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user?.role);
  const [userRole, setUserRole] = useState("patient");
  const [checkedUserStatus, setCheckedUserStatus] = useState(false);
  // If user is logged in, navigate to homepage
  useEffect(() => {
    dispatch(checkUser())
      .then(() => {
        setUserRole(user || "patient");
        // setCheckedUserStatus(true);
        // console.log(user);
      })
      .catch((error) => {
        console.error("Error checking user status:", error);
      });
  }, [dispatch]);
  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     try {
  //       dispatch(checkUser());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   checkLoggedIn();
  // }, [dispatch]);

  const handleLogout = async () => {
    try {
      // Dispatch the logoutUser action
      await dispatch(logout());
      navigate("/login", { replace: true });
      // Redirect or perform any other action after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-options">
        <NavLink to="/">
          {" "}
          <h1 className="logo">MediConnect</h1>
        </NavLink>
        {user === "doctor" ? (
          <NavLink to={"/add-availability"}>Add Availability</NavLink>
        ) : (
          <NavLink to={"/book-consultation"}>Book Consultation</NavLink>
        )}
        {user === "doctor" ? (
          <NavLink to={"/orders"}>Orders</NavLink>
        ) : (
          <NavLink to={"/user-orders"}>Orders</NavLink>
        )}
        {user === "doctor" && <NavLink to={"/add-key"}>Add GPT Key</NavLink>}
        {/* <h1>Choose Doctor</h1>
        <h1>My Orders</h1> */}
      </div>
      <div className="nav-auth">
        {isLoggedIn ? (
          <button className="login-btn" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <>
            <NavLink to="signup">
              {/* Sign up */}
              <button className="signup--btn">Sign up</button>
            </NavLink>
            <NavLink to="login">
              <button className="login--btn">Log in</button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

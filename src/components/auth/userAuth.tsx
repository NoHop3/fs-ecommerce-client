import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const IsUserAuthenticated = () => {
  let loggedInUser = localStorage.getItem("token");

  const user: any = loggedInUser && jwt_decode(loggedInUser);
  if (user?.email || user?.username) {
    return <Outlet />;
  } else {
    localStorage.removeItem("token");
    return <Navigate to='/authentication' />;
  }
};

export const IsUserUnAuthenticated = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
};

export const IsUserAdmin = () => {
  let loggedInUser = localStorage.getItem("token");
  const user: any = loggedInUser && jwt_decode(loggedInUser);
  if (user?.email) {
    if (user.isAdmin === false) {
      return <Navigate to='/' />;
    }
    return <Outlet />;
  }
  return <Navigate to='/login' />;
};

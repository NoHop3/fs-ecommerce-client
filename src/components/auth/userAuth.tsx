import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { signInUser, signOutUser } from "../../redux/actions/actions";

export const IsUserAuthenticated = () => {
  const dispatch = useDispatch();
  let loggedInUser = localStorage.getItem("token");
  const user: any = loggedInUser && jwt_decode(loggedInUser);
  if (user?.email || user?.username) {
    dispatch(signInUser(user));
    return <Outlet />;
  } else {
    localStorage.removeItem("token");
    dispatch(signOutUser());
    return <Navigate to='/authentication' />;
  }
};

export const IsUserUnAuthenticated = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
    let loggedInUser = localStorage.getItem("token");
    const user: any = loggedInUser && jwt_decode(loggedInUser);
    dispatch(signInUser(user));
    return <Navigate to='/' />;
  }
  localStorage.removeItem("token");
  dispatch(signOutUser());
  return <Outlet />;
};


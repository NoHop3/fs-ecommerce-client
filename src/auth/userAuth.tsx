import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { signInUserWithIdAxios, signOutUser } from "../redux/actions/actions";

export const IsUserAuthenticated = () => {
  const dispatch = useDispatch();
  let loggedInUser = localStorage.getItem("token");
  const user: any = loggedInUser && jwt_decode(loggedInUser);
  if (user?.email || user?.username) {
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
    if (user?.email || user?.username) {
      dispatch(signInUserWithIdAxios(user._id as string));
      return <Navigate to='/' />;
    }
  }
  localStorage.removeItem("token");
  dispatch(signOutUser());
  return <Outlet />;
};

export const IsUserAdmin = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
    let loggedInUser = localStorage.getItem("token");
    const user: any = loggedInUser && jwt_decode(loggedInUser);
    if ((user?.email || user?.username) && user?.isAdmin) {
      return <Outlet />;
    }
  }
  localStorage.removeItem("token");
  dispatch(signOutUser());
  return <Navigate to='/authentication' />;
};

export const UserHasWriteAccess = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
    let loggedInUser = localStorage.getItem("token");
    const user: any = loggedInUser && jwt_decode(loggedInUser);
    if (
      (user?.email || user?.username) &&
      (user?.hasWriteAccess || user?.hasWriteAcces || user?.isAdmin)
    ) {
      return <Outlet />;
    }
  }
  localStorage.removeItem("token");
  dispatch(signOutUser());
  return <Navigate to='/authentication' />;
};

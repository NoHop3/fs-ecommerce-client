import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  signOutUser,
  toggleIsLoggedIn,
  toggleNav,
  toggleTheme,
} from "../../redux/actions/actions";
import { RootState } from "../../typescript/redux/store";

export default function Navigation() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.authState);
  const { lamp } = useSelector((state: RootState) => state.themeState);
  const handleClick = () => {
    if (isLoggedIn) {
      dispatch(toggleIsLoggedIn());
      dispatch(signOutUser());
    }
  };
  return (
    <>
      <button
        onClick={() => dispatch(toggleNav())}
        className={"nav-toggle"}
        aria-label='toggle navigation'>
        <span className='hamburger'></span>
      </button>
      <button className={"themeIcon"} onClick={() => dispatch(toggleTheme())}>
        <img
          className={"themeImage"}
          src={lamp ? "/images/icons8-fog.gif" : "/images/icons8-sun.gif"}
          alt='Theme icon'
        />
      </button>
      <nav className='nav'>
        <ul onClick={() => dispatch(toggleNav())} className='nav__list'>
          <li className='nav__item'>
            <Link to={"/"} className='nav__link'>
              Home 🏠
            </Link>
          </li>
          <li className='nav__item'>
            <Link to={"/products"} className='nav__link'>
              Products 💎
            </Link>
          </li>
          {isLoggedIn ? (
            <li className='nav__item'>
              <Link to={"/cart"} className='nav__link'>
                My Cart 🛒
              </Link>
            </li>
          ) : null}
          {isLoggedIn ? (
            <li className='nav__item'>
              <Link to={"/orders"} className='nav__link'>
                Orders 💳
              </Link>
            </li>
          ) : null}
          <li className='nav__item'>
            <Link to={"/contact"} className='nav__link'>
              Contact 📇
            </Link>
          </li>
          {isLoggedIn ? (
            <li className='nav__item'>
              <Link to={"/profile"} className='nav__link'>
                Profile 🧙
              </Link>
            </li>
          ) : null}
          <li className='nav__item'>
            <Link
              onClick={handleClick}
              to={!isLoggedIn ? "/authentication" : "/"}
              className='nav__link'>
              {!isLoggedIn ? "Sign in 🔐" : "Sign out 🗝️"}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

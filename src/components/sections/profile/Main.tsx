import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../../../redux/actions/actions";
import { RootState } from "../../../typescript/redux/store";
import { evtChangeType } from "../../../typescript/types";

export const Main = ({ theme }: { theme: string }) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const [toSave, setToSave] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });
  const handleChange = useCallback(
    (e: evtChangeType) => {
      setToSave({ ...toSave, [e.target.name]: e.target.value });
    },
    [toSave]
  );
  const handleCancelClick = () => {
    setToSave({
      email: "",
      firstName: "",
      lastName: "",
      username: "",
    });
  };
  const handleSaveClick = () => {
    dispatch(edit(toSave, loggedUser._id));
  };
  const avatar =
    loggedUser.image === ""
      ? "/images/grey_avatar_2.svg"
      : `${loggedUser.image}`;
  return (
    <main>
      <div className='profile__wrapper'>
        <div className='profile__wrapper--grid'>
          <div className='avatar__container'>
            <div className='avatar__container__wrapper'>
              <img src={avatar} alt='Profile avatar' />
              {/* TODO Add images to cloudinary*/}
            </div>
          </div>
          <div className='email__container'>
            {loggedUser.email !== "" ? (
              <div className='edit__group'>
                <input
                  onChange={handleChange}
                  name='email'
                  type='text'
                  value={toSave.email}
                  className='edit__input'
                  placeholder={`${loggedUser.email}`}
                />
                <label htmlFor='name' className='edit__label'>
                  Before: {loggedUser.email}
                </label>
              </div>
            ) : (
              <h2 className='error'>Error, no user logged</h2>
            )}
          </div>
          <div className='username__container'>
            {loggedUser.username !== "" ? (
              <div className='edit__group'>
                <input
                  onChange={handleChange}
                  name='username'
                  type='text'
                  value={toSave.username}
                  className='edit__input'
                  placeholder={`${loggedUser.username}`}
                />
                <label htmlFor='name' className='edit__label'>
                  Before: {loggedUser.username}
                </label>
              </div>
            ) : (
              <h2 className='error'>Error, no user logged</h2>
            )}
          </div>
          <div className='firstName__container'>
            {loggedUser.firstName !== "" ? (
              <div className='edit__group'>
                <input
                  onChange={handleChange}
                  type='text'
                  name='firstName'
                  value={toSave.firstName}
                  className='edit__input'
                  placeholder={`${loggedUser.firstName}`}
                />
                <label htmlFor='name' className='edit__label'>
                  Before: {loggedUser.firstName}
                </label>
              </div>
            ) : (
              <h2 className='error'>Error, no user logged</h2>
            )}
          </div>
          <div className='lastName__container'>
            {loggedUser.lastName !== "" ? (
              <div className='edit__group'>
                <input
                  onChange={handleChange}
                  name='lastName'
                  type='text'
                  value={toSave.lastName}
                  className='edit__input'
                  placeholder={`${loggedUser.lastName}`}
                />
                <label htmlFor='name' className='edit__label'>
                  Before: {loggedUser.lastName}
                </label>
              </div>
            ) : (
              <h2 className='error'>Error, no user logged</h2>
            )}
          </div>
          <div className='buttons__container'>
            <button
              className='btn'
              style={{
                marginRight: ".75rem",
              }}
              onClick={handleSaveClick}>
              apply
            </button>
            <button className='btn' onClick={handleCancelClick}>
              cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(Main);

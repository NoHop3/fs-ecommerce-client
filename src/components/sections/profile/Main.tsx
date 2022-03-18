import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/redux/store";

export const Main = ({ theme }: { theme: string }) => {
  const { loggedUser } = useSelector((state: RootState) => state.authState);
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
              <div className="edit__group">
                <input
                  type='text'
                  className='edit__input'
                  placeholder={`Email : ${loggedUser.email}`}
                />
                <label htmlFor='name' className='edit__label'>
                  Before: {loggedUser.email}
                </label>
              </div>
            ) : (
              <h2 className="error">Error, no user logged</h2>
            )}
          </div>
          <div className='username__container'></div>
          <div className='firstName__container'></div>
          <div className='lastName__container'></div>
          <div className='buttons__container'>
            <button className='btn'>apply</button>
            <button className='btn'>back</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(Main);

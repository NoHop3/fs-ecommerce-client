import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authError, editUserAxios, setServerResMesssage } from "../../../redux/actions/actions";
import { RootState } from "../../../typescript/redux/store";
import { EvtChangeType } from "../../../typescript/types";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { dropzoneChildren } from "../../../hooks/useDropzone";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const { response } = useSelector(
    (state: RootState) => state.serverResponseState
  );
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const [image, setImage] = useState(
    loggedUser.image === "" ? "/images/grey_avatar_2.svg" : loggedUser.image
  );
  const [error, setError] = useState("");
  const [toSave, setToSave] = useState({
    image: image,
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });
  const [opened, setOpened] = useState(false);
  const handleChange = useCallback(
    (e: EvtChangeType) => {
      setToSave({ ...toSave, [e.target.name]: e.target.value });
    },
    [toSave]
  );
  const handleCancelClick = useCallback(() => {
    setToSave({
      image: loggedUser.image,
      email: "",
      firstName: "",
      lastName: "",
      username: "",
    });
    setImage(loggedUser.image);
  }, [loggedUser]);
  const handleSaveClick = useCallback(() => {
    try {
      dispatch(
        editUserAxios(
          {
            image: toSave.image,
            email: toSave.email === "" ? loggedUser.email : toSave.email,
            username:
              toSave.username === "" ? loggedUser.username : toSave.username,
            firstName:
              toSave.firstName === "" ? loggedUser.firstName : toSave.firstName,
            lastName:
              toSave.lastName === "" ? loggedUser.lastName : toSave.lastName,
          },
          loggedUser._id
        )
      );
      setError("");
    } catch (error) {
      if (error instanceof Error) setError(error.message as string);
    }
  }, [dispatch, loggedUser, toSave]);
  const handleBackClick = () => {
    dispatch(setServerResMesssage(""));
    navigate("/");
  };
  return (
    <main>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Drop your avatar!'
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.95}>
        <Dropzone
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
          onDrop={(file) => {
            const reader = new FileReader();
            reader.onload = () => {
              const formData = new FormData();
              formData.append("file", reader.result as string);
              formData.append("upload_preset", "zwhjf8pn");
              axios
                .post(
                  "https://api.cloudinary.com/v1_1/dtggdx3hc/image/upload",
                  formData
                )
                .then((response: any) => {
                  setToSave({
                    ...toSave,
                    image: response.data.secure_url,
                  });
                  setImage(response.data.secure_url);
                })
                .catch((err: any) => {
                  dispatch(authError(err.response.data.message));
                });
            };
            reader.readAsDataURL(new Blob(file));
            setOpened(false);
          }}>
          {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
      </Modal>

      <div className='profile__wrapper'>
        <div className='profile__wrapper--grid'>
          <div className='avatar__container'>
            <div
              className='avatar__container__wrapper'
              onClick={() => {
                setOpened(true);
              }}>
              <img src={image} alt='Profile avatar' />
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
              <>{setError("No user logged")} </>
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
              <>{setError("No user logged")} </>
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
              <>{setError("No user logged")} </>
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
              <>{setError("No user logged")} </>
            )}
          </div>
          <h2 className='error'>{error}</h2>
          <div className='buttons__container'>
            <button
              className='btn'
              style={{
                marginRight: ".75rem",
              }}
              disabled={
                toSave.email !== "" ||
                toSave.firstName !== "" ||
                toSave.lastName !== "" ||
                toSave.username !== "" ||
                image !== loggedUser.image
                  ? false
                  : true
              }
              onClick={handleSaveClick}>
              apply
            </button>
            <button className='btn' onClick={handleCancelClick}>
              cancel
            </button>
            <button
              type='button'
              className='btn backBtn'
              onClick={handleBackClick}>
              back
            </button>
          </div>
          <div
            className='internalErrors'
            style={
              response.message === "Success! User edited!"
                ? {
                    color: "lightgreen",
                  }
                : {}
            }>
            {response.message}
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(Main);

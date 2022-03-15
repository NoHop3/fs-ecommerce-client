import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSignIn } from "../../../../redux/actions/actions";
import { RootState } from "../../../../typescript/redux/store";

export const SignIn = ({ style }: any) => {
  const { isInSignIn } = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();
  return (
    <div
      className='authentication__form--signIn'
      style={style}
      onClick={() => {
        if (!isInSignIn) dispatch(toggleSignIn());
      }}></div>
  );
};

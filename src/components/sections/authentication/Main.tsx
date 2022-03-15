import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/redux/store";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

export const Main = () => {
  const { isInSignIn } = useSelector((state: RootState) => state.authState);
  return (
    <div>
      <div className='authentication'>
        <div className='authentication__rotated'></div>
        <div className='authentication__form'>
          <SignIn style={{width: isInSignIn?"70%":"30%"}}/>
          <SignUp style={{width: isInSignIn?"30%":"70%"}}/>
        </div>
      </div>
    </div>
  );
};

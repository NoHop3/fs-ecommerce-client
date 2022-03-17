import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../typescript/redux/store";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import useTemplate from "../../../hooks/useImports";

export const Main = () => {
  const { isInSignIn } = useSelector((state: RootState) => state.authState);
  const { isLaptop, isTablet } = useTemplate();
  return (
    <div>
      <div className='authentication'>
        <div className='authentication__rotated'></div>
        <div className='authentication__form'>
          <SignIn
            style={{
              transform: isInSignIn
                ? isLaptop
                  ? "translate(0%, 0%)"
                  : isTablet
                  ? "translate(20%,25%)"
                  : "translate(0%,10%)"
                : "translate(-1000%, 0%)",
            }}
          />

          <SignUp
            style={{
              transform: !isInSignIn
                ? isLaptop
                  ? "translate(0%, 0%)"
                  : isTablet
                  ? "translate(-80%,25%)"
                  : "translate(-100%,10%)"
                : "translate(-1000%, 0%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

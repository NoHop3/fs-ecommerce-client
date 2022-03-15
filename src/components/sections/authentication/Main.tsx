import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../typescript/redux/store';
import { SignIn } from './SignIn/SignIn'
import { SignUp } from './SignUp/SignUp';

export const Main = () => {
    const { isInSignIn } = useSelector((state: RootState) => state.authState);
  return (
    <div>
      {!isInSignIn?<SignIn/>:<SignUp/>}
    </div>
  )
}

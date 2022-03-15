import { useDispatch, useSelector } from "react-redux";
import { signUpAction, toggleSignIn } from "../../../../redux/actions/actions";
import { RootState } from "../../../../typescript/redux/store";
import { Formik, Field, Form } from "formik";

export const SignUp = ({ style }: any) => {
  const { isInSignIn } = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();
  return (
    <div
      className='authentication__form--signUp'
      style={style}
      onClick={() => {
        if (isInSignIn) dispatch(toggleSignIn());
      }}>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          image: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          dispatch(signUpAction(values));
        }}>
        <Form>
          <div>
            <label htmlFor='email'>Email</label>
            <br />
            <Field id='email' name='email' placeholder='Input email'></Field>
          </div>
          <div>
            <label htmlFor='username'>Username</label>
            <br />
            <Field
              id='username'
              name='username'
              placeholder='Input username'></Field>
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <br />
            <Field
              type='password'
              id='password'
              name='password'
              placeholder='Input password'></Field>
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirm password</label>
            <br />
            <Field
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirm password'></Field>
          </div>
          <div>
            <label htmlFor='firstName'>First name</label>
            <br />
            <Field
              id='firstName'
              name='firstName'
              placeholder='Input firstName'></Field>
          </div>
          <div>
            <label htmlFor='lastName'>Last name</label>
            <br />
            <Field
              id='lastName'
              name='lastName'
              placeholder='Input lastName'></Field>
          </div>
          <button type='submit'>Sign up</button>
        </Form>
      </Formik>
    </div>
  );
};

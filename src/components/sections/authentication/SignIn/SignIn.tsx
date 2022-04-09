import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { signIn, toggleSignIn } from "../../../../redux/actions/actions";
import { RootState } from "../../../../typescript/redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SignIn = ({ style }: any) => {
  const dispatch = useDispatch();
  const { isLoggedIn, authError } = useSelector(
    (state: RootState) => state.authState
  );
  const navigate = useNavigate();
  useEffect(() => {
    isLoggedIn ? navigate("/") : console.log()
  }, [isLoggedIn, navigate, authError]);
  return (
    <div className='authentication__form--signIn' style={style}>
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
        validationSchema={userSchema}
        onSubmit={(values) => {
          dispatch(signIn(values));
        }}>
        {({ errors, touched }) => (
          <Form className='signUp__form'>
            <h2>Sign in now!</h2>

            <div className='form-field'>
              <Field name='email'></Field>
              {errors.email && touched.email ? (
                <div className='Errors'>{errors.email}</div>
              ) : null}
              <label htmlFor='email'>Email</label>
            </div>

            <div className='form-field'>
              <Field name='username'></Field>
              {errors.username && touched.username ? (
                <div className='Errors'>{errors.username}</div>
              ) : null}
              <label htmlFor='username'>Username</label>
            </div>

            <div className='form-field'>
              <Field type='password' name='password'></Field>
              {errors.password && touched.password ? (
                <div className='Errors'>{errors.password}</div>
              ) : null}
              <label htmlFor='password'>Password</label>
            </div>
            <div className='form-field'>
              <Field type='password' name='confirmPassword'></Field>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className='Errors'>{errors.confirmPassword}</div>
              ) : null}
              <label htmlFor='confirmPassword'>Confirm password</label>
            </div>

            <div className='signIn__form__button'>
              <button type='submit'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Sign in
              </button>
              <button
                type='button'
                className='nextBtn'
                onClick={() => dispatch(toggleSignIn())}>
                <img
                  src='https://img.icons8.com/ios-glyphs/38/000000/end--v2.png'
                  alt=''
                />
              </button>
            </div>
            <div className='error'>{authError}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const userSchema = Yup.object().shape(
  {
    username: Yup.string()
      .min(2, "Username cannot be less than 2 characters")
      .max(50, "Username cannot be more than 50 characters")
      .when("email", {
        is: "",
        then: Yup.string().required("Either username or email is required"),
        otherwise: Yup.string(),
      }),
    email: Yup.string()
      .email("Invalid email")
      .when("username", {
        is: "",
        then: Yup.string().required("Either username or email is required"),
        otherwise: Yup.string(),
      }),
    password: Yup.string()
      .min(3, "Password should be min 3 characters")
      .required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  },
  [["email", "username"]]
);

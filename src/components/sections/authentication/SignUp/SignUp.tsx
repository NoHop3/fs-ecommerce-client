import { useDispatch, useSelector } from "react-redux";
import { signUpAxios, toggleSignIn } from "../../../../redux/actions/actions";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { RootState } from "../../../../typescript/redux/store";

export const SignUp = ({ style }: any) => {
  const dispatch = useDispatch();
  const { authError } = useSelector((state: RootState) => state.authState);
  const handleBtnClick = () => {
    dispatch(toggleSignIn());
  };
  return (
    <div className='authentication__form--signUp' style={style}>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
        }}
        validationSchema={userSchema}
        onSubmit={(values) => {
          dispatch(signUpAxios(values));
          handleBtnClick();
        }}>
        {({ errors, touched }) => (
          <Form className='signUp__form'>
            <h2>Sign up now!</h2>
            <div className='combine'>
              <div className='form-field'>
                <Field id='email' name='email'></Field>
                {errors.email && touched.email ? (
                  <div className='Errors'>{errors.email}</div>
                ) : null}
                <label htmlFor='email'>Email</label>
              </div>

              <div className='form-field'>
                <Field id='username' name='username'></Field>
                {errors.username && touched.username ? (
                  <div className='Errors'>{errors.username}</div>
                ) : null}
                <label htmlFor='username'>Username</label>
              </div>
            </div>
            <div className='combine'>
              <div className='form-field'>
                <Field id='password' type='password' name='password'></Field>
                {errors.password && touched.password ? (
                  <div className='Errors'>{errors.password}</div>
                ) : null}
                <label htmlFor='password'>Password</label>
              </div>
              <div className='form-field'>
                <Field
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'></Field>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className='Errors'>{errors.confirmPassword}</div>
                ) : null}
                <label htmlFor='confirmPassword'>Confirm password</label>
              </div>
            </div>
            <div className='combine'>
              <div className='form-field'>
                <Field id='firstName' name='firstName'></Field>
                {errors.firstName && touched.firstName ? (
                  <div className='Errors'>{errors.firstName}</div>
                ) : null}
                <label htmlFor='firstName'>First name</label>
              </div>
              <div className='form-field'>
                <Field id='lastName' name='lastName'></Field>
                {errors.lastName && touched.lastName ? (
                  <div className='Errors'>{errors.lastName}</div>
                ) : null}
                <label htmlFor='lastName'>Last name</label>
              </div>
            </div>
            <div className='signUp__form__button'>
              <button type='button' className='prvBtn' onClick={handleBtnClick}>
                <img
                  src='https://img.icons8.com/ios-glyphs/38/000000/skip-to-start--v2.png'
                  alt=''
                />
              </button>
              <button type='submit'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Sign up
              </button>
            </div>
            <div className='error'>{authError}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const userSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username cannot be less than 2 characters")
    .max(50, "Username cannot be more than 50 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(3, "Password should be min 3 characters")
    .required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  firstName: Yup.string()
    .min(2, "First name cannot contain less than 2 characters")
    .max(50, "First name cannot contain more than 50 characters")
    .required("This field is required"),
  lastName: Yup.string()
    .min(2, "Last name cannot contain less than 2 characters")
    .max(50, "Last name cannot contain more than 50 characters")
    .required("This field is required"),
});

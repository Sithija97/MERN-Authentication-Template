import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LOGIN } from "../routes";
import { Button, TextInput } from "../components";
import { registerInputData } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { register } from "../store/auth/authslice";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Confirm Password is required"),
});

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state: RootState) => state.auth);

  const redirectToLogin = () => {
    navigate(LOGIN);
  };

  const handleRegister = async (values: registerInputData) => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      alert("Error : Passwords don't match, please check again.");
    } else {
      const response = await dispatch(register({ username, email, password }));
      if (response.meta.requestStatus === "fulfilled") {
        alert("Success : User created Successfully");
        formik.resetForm();
        redirectToLogin();
      }
      if (response.meta.requestStatus === "rejected") {
        alert(`Error : ${response.payload}`);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center min-w-lg p-6 items-start shrink-0 gap-6 bg-white rounded-xl shadow-lg"
      >
        <div className="flex flex-col justify-center items-start self-stretch">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <p className="text-lg font-semibold text-gray-900">Authsync</p>
          </div>
        </div>

        <div>
          <p className="leading-tight text-2xl font-bold text-gray-900 mb-1">
            Sign Up to your account.
          </p>
          <p className="leading-6 text-lg font-medium text-gray-500 flex items-center gap-1">
            Already have an account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={redirectToLogin}
            >
              Login here
            </span>
          </p>
        </div>

        <div>
          <TextInput
            labelText="Username"
            id="username"
            name="username"
            type="username"
            placeholder="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : undefined
            }
            styles="w-96"
          />
          <TextInput
            labelText="Email"
            id="email"
            name="email"
            type="email"
            placeholder="sample@email.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
            styles="w-96"
          />

          <div className="grid grid-cols-2 gap-2">
            <TextInput
              labelText="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
              styles="w-[188px]"
            />
            <TextInput
              labelText="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
              styles="w-[188px]"
            />
          </div>
        </div>

        <Button title="Sign Up" type="submit" loading={isLoading} />

        <div className="flex -mt-2 mb-1 m-auto">
          <p className="leading-none text-base font-medium text-gray-500">
            Already have an account?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={redirectToLogin}
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

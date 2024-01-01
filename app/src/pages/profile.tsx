import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar, Button, TextInput } from "../components";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import {
  changePassword,
  updateProfilePicture,
  updateUser,
} from "../store/auth/authslice";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../routes";
import { Auth_Method } from "../enums";
import { useRef } from "react";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  oldPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Old Password is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { user, changePasswordLoading, updateUserLoading } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handlePasswordChange = async () => {
    const { oldPassword, password } = formik.values;
    const response = await dispatch(changePassword({ oldPassword, password }));

    if (response.meta.requestStatus === "fulfilled") {
      formik.resetForm();
      navigate(LOGIN);
      alert(response.payload.message);
    }
    if (response.meta.requestStatus === "rejected") {
      alert(`Error: ${response.payload}`);
    }
  };

  const handleProfileUpdate = async () => {
    const { username } = formik.values;
    const response = await dispatch(updateUser({ username }));

    if (response.meta.requestStatus === "fulfilled") {
      alert("Profile updated successcully!");
    }
    if (response.meta.requestStatus === "rejected") {
      alert(`Error: ${response.payload}`);
    }
  };

  const handleProfilePictureUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target?.files?.[0];
    if (selectedFile && user?.authMethod === Auth_Method.EMAIL) {
      const storageRef = ref(storage, "images/" + selectedFile.name);
      try {
        // Upload the image file
        await uploadBytes(storageRef, selectedFile);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
        console.log("File uploaded:", downloadURL);
        dispatch(updateProfilePicture(downloadURL));

        const response = await dispatch(updateUser({ photo: downloadURL }));

        if (response.meta.requestStatus === "fulfilled") {
          alert("Profile updated successcully!");
        }
        if (response.meta.requestStatus === "rejected") {
          alert(`Error: ${response.payload}`);
        }

        // Now we can use this downloadURL as needed (e.g., save it to state or database)
        return downloadURL;
      } catch (error) {
        alert(`Error uploading file: ${error}`);
        return null;
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      oldPassword: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  });
  return (
    <div className="flex flex-col justify-center min-w-lg p-6 items-start shrink-0 gap-6 bg-white rounded-xl shadow-lg">
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
        <Avatar
          name={user?.username}
          styles="w-20 h-20"
          imgUrl={user?.photo}
          onClick={() => inputRef?.current?.click()}
        />
        <input
          type="file"
          ref={inputRef}
          hidden
          accept="image/*"
          onChange={handleProfilePictureUpload}
        />
      </div>

      <div className="">
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

        {user?.authMethod === Auth_Method.EMAIL && (
          <>
            <TextInput
              labelText="Old Password"
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Old Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPassword}
              error={
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? formik.errors.oldPassword
                  : undefined
              }
              styles="w-96"
            />
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
              styles="w-96"
            />
          </>
        )}
      </div>

      <div className="w-full flex flex-row items-center gap-3 -mt-4">
        {user?.authMethod === Auth_Method.EMAIL && (
          <Button
            title="Change Password"
            type="button"
            styles="bg-red-500"
            loading={changePasswordLoading}
            onClick={handlePasswordChange}
          />
        )}
        <Button
          title="Change Profile"
          type="button"
          styles="bg-blue-700"
          loading={updateUserLoading}
          onClick={handleProfileUpdate}
        />
      </div>
    </div>
  );
};

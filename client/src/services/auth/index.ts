import axios from "axios";
import {
  loginInputs,
  registerInputs,
  userUpdateInputs,
  changePasswordInputs,
  loginWithGoogleInputs,
} from "../../models";

const BASE_URL = "/api/users";

const register = async (payload: registerInputs) => {
  const response = await axios.post(`${BASE_URL}/register`, payload);
  return response;
};

const login = async (payload: loginInputs) => {
  const response = await axios.post(`${BASE_URL}/login`, payload);
  return response;
};

const loginWithGoogle = async (payload: loginWithGoogleInputs) => {
  const response = await axios.post(`${BASE_URL}/google-login`, payload);
  return response;
};

const update = async (payload: userUpdateInputs) => {
  const response = await axios.patch(`${BASE_URL}/updateuser`, payload);
  return response;
};

const changePassword = async (payload: changePasswordInputs) => {
  const response = await axios.patch(`${BASE_URL}/changepassword`, payload);
  return response;
};

const authService = {
  register,
  login,
  loginWithGoogle,
  update,
  changePassword,
};

export default authService;

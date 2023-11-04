import axios from "axios";
import { loginInputs, registerInputs } from "../../models";

const BASE_URL = "/api/users";

const register = async (payload: registerInputs) => {
  const response = await axios.post(`${BASE_URL}/register`, payload);
  return response;
};

const login = async (payload: loginInputs) => {
  const response = await axios.post(`${BASE_URL}/login`, payload);
  return response;
};

const authService = {
  register,
  login,
};

export default authService;

import axios from "axios";
export const loginAPI = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      { email, password },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const signupAPI = async ({
  fullName,
  email,
  password,
  confirmPassword,
  role,
}) => {
  try {
    console.log(role);
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      { fullName, email, password, confirmPassword, role },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const checkUserAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/auth/check-user",
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const logoutAPI = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

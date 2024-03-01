import axios from "axios";

export const createDoctorProfileAPI = async ({
  specializations,
  location,
  yearsOfExperience,
  education,
  bio,
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/doctor/create-profile",
      { specializations, location, yearsOfExperience, education, bio },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getAllDoctorsAPI = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/doctor/", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDoctorAPI = async ({ id }) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/doctor/${id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

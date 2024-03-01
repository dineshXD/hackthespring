import axios from "axios";
export const getDoctorOrdersAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/order/get-doctor-orders",
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserOrdersAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/order/get-user-orders",
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const generateGPTResponseAPI = async ({
  fullName,
  medicalHistory,
  currentSymptoms,
  ongoingMedicine,
  vitalSigns,
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/order/generate-gpt-response",
      {
        fullName,
        medicalHistory,
        currentSymptoms,
        ongoingMedicine,
        vitalSigns,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const bookConsultationAPI = async ({
  selectedDoctorID,
  email,
  fullName,
  age,
  gender,
  contactNumber,
  medicalHistory,
  currentSymptoms,
  ongoingMedicine,
  vitalSigns,
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/order/book-consultation",
      {
        selectedDoctorID,
        email,
        fullName,
        age,
        gender,
        contactNumber,
        medicalHistory,
        currentSymptoms,
        ongoingMedicine,
        vitalSigns,
      },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

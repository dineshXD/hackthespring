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
export const updateOrderStatusAPI = async ({ orderId, status }) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/v1/order/update-order-status",
      { orderId, status },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const generateGPTResponseAPI = async ({
  orderId,
  fullName,
  medicalHistory,
  currentSymptoms,
  ongoingMedicine,
  vitalSigns,
}) => {
  console.log(orderId);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/response/get-gpt-response",
      {
        orderId,
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

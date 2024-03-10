import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  bookConsultationAPI,
  generateGPTResponseAPI,
  getDoctorOrdersAPI,
  getUserOrdersAPI,
  updateOrderStatusAPI,
} from "../api/orderApi";
export const getDoctorOrders = createAsyncThunk(
  "order/doctor-orders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDoctorOrdersAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserOrders = createAsyncThunk(
  "orders/user-orders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserOrdersAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "order/update-order-status",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatusAPI({ orderId, status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const generateGPTResponse = createAsyncThunk(
  "orders/generate-gpt-response",
  async (
    {
      orderId,
      fullName,
      medicalHistory,
      currentSymptoms,
      ongoingMedicine,
      vitalSigns,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(orderId);
      const response = await generateGPTResponseAPI({
        orderId,
        fullName,
        medicalHistory,
        currentSymptoms,
        ongoingMedicine,
        vitalSigns,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const bookConsultation = createAsyncThunk(
  "order/book-consultation",
  async (
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
    { rejectWithValue }
  ) => {
    try {
      const response = await bookConsultationAPI({
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
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderBooked: null,
    doctorOrders: [],
    userOrders: [],
    isLoading: false,
    error: null,
    gptResponse: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookConsultation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bookConsultation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderBooked = action.payload;
        state.error = null;
      })
      .addCase(bookConsultation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.orderBooked = null;
      })
      .addCase(getDoctorOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDoctorOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorOrders = action.payload.orders;
        state.error = null;
      })
      .addCase(getDoctorOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.doctorOrders = null;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload.orders;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userOrders = null;
      })
      .addCase(generateGPTResponse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateGPTResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gptResponse = action.payload;
        state.error = null;
      })
      .addCase(generateGPTResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.gptResponse = null;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderBooked = action.payload;
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.orderBooked = null;
      });
  },
});
export default orderSlice.reducer;

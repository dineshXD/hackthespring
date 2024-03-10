import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAvailabilityAPI,
  createDoctorProfileAPI,
  getAllDoctorsAPI,
  getDoctorAPI,
} from "../api/doctorApi";

export const createDoctorProfile = createAsyncThunk(
  "doctor/create-profile",
  async (
    { specializations, location, yearsOfExperience, education, bio },
    { rejectWithValue }
  ) => {
    try {
      const response = await createDoctorProfileAPI({
        specializations,
        location,
        yearsOfExperience,
        education,
        bio,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllDoctors = createAsyncThunk(
  "doctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllDoctorsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getDoctorByID = createAsyncThunk(
  "doctorbyID",
  async ({ id }, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await getDoctorAPI({ id });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addAvailability = createAsyncThunk(
  "add-availability",
  async ({ availability }, { rejectWithValue }) => {
    try {
      const response = await addAvailabilityAPI({ availability });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctorById: null,
    doctors: [],
    loading: false,
    error: null,
    profile: null,
    availability: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(createDoctorProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.profile = null;
      })
      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.doctors;
        state.error = null;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.doctors = [];
      })
      .addCase(getDoctorByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorByID.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorById = action.payload;
        state.error = null;
      })
      .addCase(getDoctorByID.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.doctorById = null;
      })
      .addCase(addAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload;
        state.error = null;
      })
      .addCase(addAvailability.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.availability = null;
      });
  },
});
export default doctorSlice.reducer;

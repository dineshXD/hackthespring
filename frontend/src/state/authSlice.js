import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkUserAPI, loginAPI, logoutAPI, signupAPI } from "../api/authApi";
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginAPI({ email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { fullName, email, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const response = await signupAPI({
        fullName,
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signupDoctor = createAsyncThunk(
  "auth/signupDoctor",
  async (
    { fullName, email, password, confirmPassword, role },
    { rejectWithValue }
  ) => {
    try {
      const response = await signupAPI({
        fullName,
        email,
        password,
        confirmPassword,
        role,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const checkUser = createAsyncThunk(
  "auth/checkUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkUserAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggedIn = true;
        state.error = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        // if (action.payload.user == null) {
        //   state.isLoggedIn = false;
        //   state.error = action.payload;
        // } else {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(signupDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(signupDoctor.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});
export default authSlice.reducer;

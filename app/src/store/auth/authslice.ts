/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth";
import {
  changePasswordInputs,
  initialAuthState,
  loginInputs,
  loginWithGoogleInputs,
  registerInputs,
  userUpdateInputs,
} from "../../models";

const initialState: initialAuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  updateUserLoading: false,
  changePasswordLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (payload: registerInputs, thunkAPI) => {
    try {
      const response = await authService.register(payload);
      return response.data;
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/google-login",
  async (payload: loginWithGoogleInputs, thunkAPI) => {
    try {
      const response = await authService.loginWithGoogle(payload);
      return response.data;
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: loginInputs, thunkAPI) => {
    try {
      const response = await authService.login(payload);
      return response.data;
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update-user",
  async (payload: userUpdateInputs, thunkAPI) => {
    try {
      const response = await authService.update(payload);
      return response.data;
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (payload: changePasswordInputs, thunkAPI) => {
    try {
      const response = await authService.changePassword(payload);
      return response.data;
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    updateProfilePicture: (state, { payload }) => {
      if (state?.user) {
        state.user.photo = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload as string;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(loginWithGoogle.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.updateUserLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.updateUserLoading = false;
        state.isError = true;
        state.message = payload as string;
      })
      .addCase(changePassword.pending, (state) => {
        state.changePasswordLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.changePasswordLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.changePasswordLoading = false;
        state.isError = true;
        state.message = payload as string;
      });
  },
});

export const { logout, updateProfilePicture } = authSlice.actions;

export default authSlice.reducer;

// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://uzneftegaz-backend-production.up.railway.app/api/auth/login",
        { phone, password }
      );

      const { token, user } = data;

      // 🔥 Token + expire time (48 soat)
      const expireTime = Date.now() + 48 * 60 * 60 * 1000; // 48 soat

      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpireTime", expireTime);

      return { token, user, expireTime };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    expireTime: localStorage.getItem("tokenExpireTime") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expireTime = null;
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpireTime");
    },

    // 🔥 App ochilganda expire time tekshirish
    checkTokenExpiration: (state) => {
      const expireTime = localStorage.getItem("tokenExpireTime");

      if (expireTime && Date.now() > Number(expireTime)) {
        state.user = null;
        state.token = null;
        state.expireTime = null;
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpireTime");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.expireTime = action.payload.expireTime;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login xatosi";
      });
  },
});

export const { logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;

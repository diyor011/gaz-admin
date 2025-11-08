// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";

// 1. Reducerlarni birlashtirish
const rootReducer = combineReducers({
  auth: authReducer,
});

// 2. Persist konfiguratsiyasi
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // faqat auth saqlansin
};

// 3. Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Store yaratish
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist uchun kerak
    }),
});

// 5. Persistor export qilish
export const persistor = persistStore(store);

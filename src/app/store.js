import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../services/CryptoAPI";
import newsReducer from "../services/NewsAPI";
import { coinSliceReducer } from "../services/CryptoAPI";

let store = configureStore({
  reducer: {
    users: userReducer,
    news: newsReducer,
    coins: coinSliceReducer,
  },
});

export default store;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let usersInitialState = {
  loading: true,
  users: [],
  error: "",
};

let fetchUsers = createAsyncThunk("users/fetchUsers", async (num = 100) => {
  let response = await axios.request({
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      limit: num,
      offset: "0",
      orderBy: "24hVolume",
      orderDirection: "desc",
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  });
  return response.data.data;
});

let coinsInitialState = {
  loading: true,
  data: [],
  error: "",
};

let getCoins = createAsyncThunk("coins/getCoins", async (data) => {
  let { coinId, timePeriod } = data;
  let response = await axios.request({
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
    params: { timePeriod: timePeriod },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  });
  return response.data.data.coin;
});

let coinSlice = createSlice({
  name: "coins",
  initialState: coinsInitialState,
  extraReducers: (builder) => {
    builder.addCase(getCoins.pending, (state, action) => {
      state.loading = true;
      state.data = [];
      state.error = "";
    });
    builder.addCase(getCoins.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getCoins.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

let usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
      state.users = [];
      state.error = "";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
let coinSliceReducer = coinSlice.reducer;

export { fetchUsers, coinSliceReducer, getCoins };

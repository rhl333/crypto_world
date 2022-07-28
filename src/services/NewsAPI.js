import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  loading: true,
  data: [],
  error: "",
};

let fetchNews = createAsyncThunk("data/fetchNews", async (count = 10) => {
  let response = axios.request({
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: { q: "cryptocurrencies", count: count, freshness: "Day", textFormat: "Raw", safeSearch: "Off" },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "d00cef50edmshebd666b51e7e5e2p144803jsnebecc2a2481c",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  });
  return response;
});

let NewsSlice = createSlice({
  name: "news",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state, action) => {
      state.loading = true;
      state.data = [];
      state.error = "";
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.loading = false;
      state.data = "";
      state.error = action.error.message;
    });
  },
});

export default NewsSlice.reducer;
export { fetchNews };

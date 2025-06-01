// src/features/loader/loadersSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loadersSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    ShowLoading: (state) => {
      state.isLoading = true;
    },
    HideLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = loadersSlice.actions;

export const selectIsLoading = (state) => state.loader.isLoading;

export default loadersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegin } from "./api";

const joke = createSlice({
  name: "joke",
  initialState: {
    isLoading: false,
    toast: { isOpen: false, type: "error", message: "Error" },
    story: "",
  },
  reducers: {
    jokeRequested: (joke) => {
      joke.isLoading = true;
    },
    jokeReceived: (joke, action) => {
      joke.story = action.payload.value.joke;
      joke.isLoading = false;
    },
    jokeRequestFailed: (joke, action) => {
      joke.toast = { isOpen: true, type: "error", message: action.message };
      joke.isLoading = false;
    },
    closeToast: (joke) => {
      joke.toast.isOpen = false;
    },
  },
});

export const {
  jokeRequested,
  jokeReceived,
  jokeRequestFailed,
  closeToast,
} = joke.actions;

export default joke.reducer;

export const getRandomJoke = () =>
  apiCallBegin({
    url: "/jokes/random?firstName=You&lastName=",
    method: "get",
    onStart: jokeRequested.type,
    onSuccess: jokeReceived.type,
    onError: jokeRequestFailed.type,
  });

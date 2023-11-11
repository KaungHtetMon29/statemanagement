import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", pw: "", login: false, errmsg: "" };
const Authslice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, actions) {
      if (
        state.name === actions.payload.name &&
        state.pw === actions.payload.pw
      ) {
        state.login = true;
        console.log("true");
        state.errmsg = "";
      } else {
        state.login = false;
        state.errmsg =
          "something went wrong . Check your username and password again";
      }
    },
    signup(state, actions) {
      state.name = actions.payload.name;
      state.pw = actions.payload.pw;
      state.login = true;
      state.errmsg = "";
      console.log("login");
    },
    logout(state) {
      state.login = false;
    },
    check() {
      console.log("run");
    },
  },
});
export const Authactions = Authslice.actions;
export default Authslice;

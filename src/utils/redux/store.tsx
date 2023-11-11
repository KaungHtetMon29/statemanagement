import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./auth";
import Playerslice from "./player";
import Teamslice from "./teams";
const Store = configureStore({
  reducer: {
    auth: Authslice.reducer,
    players: Playerslice.reducer,
    team: Teamslice.reducer,
  },
});
export default Store;

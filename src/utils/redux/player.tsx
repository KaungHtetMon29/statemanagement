import { createSlice } from "@reduxjs/toolkit";
const players: { players: any; page: number } = { players: [], page: 1 };
const Playerslice = createSlice({
  name: "players",
  initialState: players,
  reducers: {
    storeplayers(state, actions) {
      state.players = [...actions.payload];
    },
    getMorePlayers(state, action) {
      state.players.push(...action.payload);
    },
    updateplayer(state, action) {
      const index = state.players.findIndex(
        (e: any) => e.id === action.payload
      );
      state.players[index].team = { name: "" };
    },
    removeplayersfromteam(state, action) {
      const { teamname } = action.payload;
      const indexes = state.players.map((player: any, index: any) =>
        player.team.name === teamname ? index : -1
      );
      const mainindex = indexes.filter((i: any) => i !== -1);
      console.log(mainindex);
      for (let ind of mainindex) {
        state.players[ind].team = { name: "" };
      }
    },
    addtoteam(state, action) {
      const index = state.players.findIndex(
        (e: any) => e.id === action.payload.id
      );
      if (index !== -1) {
        state.players[index].team = { name: action.payload.name };
      }
    },
    updateteam(state, action) {
      const { defname, tname } = action.payload;
      const indexes = state.players.map((player: any, index: any) =>
        player.team.name === defname ? index : -1
      );
      const mainindex = indexes.filter((i: any) => i !== -1);
      console.log(mainindex);
      for (let ind of mainindex) {
        state.players[ind].team = { name: tname };
      }
    },
    changepage(state) {
      state.page = state.page + 1;
    },
  },
});
export const getplayers = (page: number, limit: number) => {
  return async (dispatch: any) => {
    try {
      dispatch(Playersactions.changepage());
      const res = await fetch(
        `https://www.balldontlie.io/api/v1/players?per_page=${limit}&page=${page}`
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      console.log(page);

      if (page === 1) {
        dispatch(Playersactions.storeplayers(data.data));
      } else {
        dispatch(Playersactions.getMorePlayers(data.data));
      }
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };
};

export const Playersactions = Playerslice.actions;
export default Playerslice;

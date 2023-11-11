import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
const initteam: { teams: any; errmsg: string } = {
  teams: [{ name: "k", players: [], region: "k", country: "k" }],
  errmsg: "",
};

const Teamslice = createSlice({
  name: "team",
  initialState: initteam,
  reducers: {
    createteam(state, actions) {
      const { name, region, country } = actions.payload;

      const hasSameName = state.teams.some((team: any) => team.name === name);

      if (!hasSameName) {
        state.teams.push({ name, players: [], region, country });
        state.errmsg = "";
      } else {
        state.errmsg = "team name already exist";
      }
    },
    cleanupmsg(state) {
      state.errmsg = "";
    },
    deleteteam(state, actions) {
      const { name } = actions.payload;
      const indexToRemove = state.teams.findIndex(
        (team: any) => team.name === name
      );
      console.log(name);
      if (indexToRemove !== -1) {
        state.teams.splice(indexToRemove, 1);
      }
    },
    addplayer(state, actions) {
      const { id, fname, lname } = actions.payload;
      state.teams[id].players.push({ firstname: fname, lastname: lname });
    },
    updateteam(state, actions) {
      const { name, region, country } = actions.payload;
      const teamkey = actions.payload.teamkey;
      console.log(teamkey);
      state.teams[teamkey].name = name;
      state.teams[teamkey].region = region;
      state.teams[teamkey].country = country;
    },
    removeplayer(state, actions) {
      const { firstname, lastname, tname } = actions.payload;
      const indexofteam = state.teams.findIndex(
        (team: any) => team.name === tname
      );
      if (indexofteam !== -1) {
        const indexofplayer = state.teams[indexofteam].players.findIndex(
          (p: any) => {
            p.firstname === firstname && p.lastname === lastname;
          }
        );
        state.teams[indexofteam].players.splice(indexofplayer, 1);
      }
    },
  },
});
export const Teamactions = Teamslice.actions;
export default Teamslice;

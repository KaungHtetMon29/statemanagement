import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Playersactions } from "@/utils/redux/player";
import { pid } from "process";
import Teamslice, { Teamactions } from "@/utils/redux/teams";
function Teamlist({
  settogglelist,
  playerid,
}: {
  settogglelist: any;
  playerid: number | null;
}) {
  const [selteam, setselteam] = useState(null);
  const [id, setid] = useState(null);
  const dispatch = useDispatch();
  const teams = useSelector((state: any) => state.team.teams);
  return (
    <div className="w-96 z-[50] flex fixed flex-col gap-8 items-center bg-slate-200 p-8 rounded-lg mx-auto mt-10 ">
      <div className="flex flex-wrap gap-4 justify-center">
        {console.log(playerid)}
        {teams.map((e: any, index: number) => (
          <Teamnamecard
            key={e.name}
            setid={setid}
            name={e.name}
            id={index}
            setselteam={setselteam}
            selteam={selteam}
          />
        ))}
      </div>

      <div className="flex gap-8">
        <button
          onClick={() => {
            settogglelist(false);
          }}
          className="bg-orange-500 w-fit px-4 py-2 text-white rounded-lg "
        >
          close
        </button>
        <button
          onClick={() => {
            dispatch(Playersactions.addtoteam({ id: playerid, name: selteam }));
            dispatch(
              Teamactions.addplayer({
                id: id,
                playerid: playerid,
                fname: "",
                lname: "",
              })
            );
            settogglelist(false);
          }}
          className="bg-orange-500 w-fit px-4 py-2 text-white rounded-lg "
        >
          Add
        </button>
      </div>
    </div>
  );
}
export default Teamlist;

export const Teamnamecard = ({
  setid,
  id,
  name,
  setselteam,
  selteam,
}: {
  setid: any;
  id: number;
  name: string;
  setselteam: any;
  selteam: any;
}) => {
  return (
    <div
      className={`flex cursor-pointer  px-4 py-2 rounded-md text-white ${
        selteam === name ? "bg-green-700" : "bg-orange-500 pointer"
      }`}
      onClick={() => {
        setid(id);
        setselteam(name);
      }}
    >
      {name}
    </div>
  );
};

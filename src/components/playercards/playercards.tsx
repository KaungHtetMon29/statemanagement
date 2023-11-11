import { Playersactions } from "@/utils/redux/player";
import { Teamactions } from "@/utils/redux/teams";
import { useSelector, useDispatch } from "react-redux";
type data = {
  firstname: string;
  lastname: string;
  team: string;
  position: string;
  uniquekey: number;
  togglelist: any;
  toggle: any;
  setplayerid: any;
  pid: number;
  pfname: string;
  plname: string;
  setplayername: any;
};
function Playercards({
  firstname,
  lastname,
  team,
  position,
  uniquekey,
  togglelist,
  toggle,
  setplayerid,
  pid,
  pfname,
  plname,
  setplayername,
}: data) {
  const dispatch = useDispatch();
  return (
    <div className="w-64 bg-zinc-900 text-white p-4 rounded-xl gap-4 flex flex-col font-semibold ">
      <Detailplayer header="First Name" detail={firstname} />

      <Detailplayer header="Last Name" detail={lastname} />
      <Detailplayer header="Team" detail={team === undefined ? "" : team} />
      <Detailplayer header="Position" detail={position} />
      <div className={`flex gap-5 text-xs `}>
        <button
          className={`bg-orange-500 w-fit px-4 py-2 text-white rounded-lg ${
            team.length === 0 || toggle
              ? "opacity-40 pointer-events-none"
              : "pointer-events-auto opacity-100"
          }`}
          onClick={() => {
            dispatch(
              Teamactions.removeplayer({
                firstname: firstname,
                lastname: lastname,
                tname: team,
              })
            );
            dispatch(Playersactions.updateplayer(uniquekey));
          }}
        >
          remove from team
        </button>
        <button
          onClick={() => {
            setplayername({
              firstname: firstname,
              lastname: lastname,
            });
            togglelist(true);
            setplayerid(pid);
          }}
          className={`bg-orange-500 w-fit px-4 py-2 text-white rounded-lg ${
            team.length !== 0 || toggle
              ? "pointer-events-none opacity-40"
              : "pointer-events-auto"
          }`}
        >
          add to team
        </button>
      </div>
    </div>
  );
}
export default Playercards;
export const Detailplayer = ({
  header,
  detail,
}: {
  header: string;
  detail: string;
}) => {
  return (
    <div className="flex">
      <div className="w-1/3">{header}</div>
      <div className="w-2/3">: {detail}</div>
    </div>
  );
};

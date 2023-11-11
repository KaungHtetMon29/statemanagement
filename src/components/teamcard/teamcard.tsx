import { Playersactions } from "@/utils/redux/player";
import { Teamactions } from "@/utils/redux/teams";
import { useSelector, useDispatch } from "react-redux";
function Teamcard({
  name,
  playercount,
  region,
  country,
  setenable,
  setteamindex,
  setupdate,
}: {
  name: string;
  playercount: number;
  region: string;
  country: string;
  setenable: any;
  setteamindex: any;
  setupdate: any;
}) {
  const dispatch = useDispatch();
  return (
    <div className="w-64 bg-zinc-900 text-white p-4 rounded-xl gap-4 flex flex-col font-semibold ">
      <DetailTeam header="Name" detail={name} />
      <DetailTeam header="Player count" detail={playercount} />
      <DetailTeam header="Region" detail={region} />
      <DetailTeam header="Country" detail={country} />
      <div className="flex gap-5">
        <button
          className="bg-orange-500 w-fit px-4 py-2 text-white rounded-lg "
          onClick={() => {
            dispatch(Playersactions.removeplayersfromteam({ teamname: name }));
            dispatch(Teamactions.deleteteam({ name: name }));
          }}
        >
          delete
        </button>
        <button
          className="bg-orange-500 w-fit px-4 py-2 text-white rounded-lg "
          onClick={() => {
            setenable(true);
            setteamindex(name);
            setupdate(true);
          }}
        >
          edit
        </button>
      </div>
    </div>
  );
}
export default Teamcard;

export const DetailTeam = ({
  header,
  detail,
}: {
  header: string;
  detail: string | number;
}) => {
  return (
    <div className="flex">
      <div className="w-1/3">{header}</div>
      <div className="w-2/3">: {detail}</div>
    </div>
  );
};

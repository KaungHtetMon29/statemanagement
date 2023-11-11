import { Playersactions } from "@/utils/redux/player";
import { Teamactions } from "@/utils/redux/teams";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function CreateTeam({
  close,
  update,
  teamindex,
  setupdate,
}: {
  close: () => void;
  update?: boolean;
  teamindex?: any;
  setupdate: any;
}) {
  const [defname, setdefname] = useState("");
  const [defregion, setdefregion] = useState("");
  const [defcountry, setdefcountry] = useState("");
  const [teamkey, setteamkey] = useState(null);
  const name = useRef<HTMLInputElement>(null);
  const count = useRef<HTMLInputElement>(null);
  const region = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [errmsg, seterrmsg] = useState("");
  const errmsgin = useSelector((state: any) => state.team.errmsg);
  const teams = useSelector((state: any) => state.team.teams);
  useEffect(() => {
    if (update === true) {
      const index = teams.findIndex((e: any) => e.name === teamindex);
      setteamkey(index);
      setdefname(teams[index].name);
      setdefregion(teams[index].region);
      setdefcountry(teams[index].country);
    }
  }, []);
  return (
    <div className="w-80 flex flex-col gap-8 bg-slate-200 p-8 rounded-lg mx-auto mt-10 absolute">
      <div className="gap-2 flex flex-col">
        <label>Enter Team Name</label>

        <input
          ref={name}
          defaultValue={defname.length !== 0 ? defname : ""}
          placeholder="Enter Team Name"
          className=" p-2 rounded-lg"
          required
        />
      </div>
      <div className="gap-2 flex flex-col">
        <label>Enter Region</label>
        <input
          defaultValue={defregion.length !== 0 ? defregion : ""}
          ref={region}
          placeholder="Enter Region"
          className=" p-2 rounded-lg"
          required
        />
      </div>
      <div className="gap-2 flex flex-col">
        <label>Enter Country</label>
        <input
          defaultValue={defcountry.length !== 0 ? defcountry : ""}
          ref={country}
          placeholder="Enter Country"
          className=" p-2 rounded-lg"
          required
        />
      </div>
      {errmsg.length !== 0 ? (
        <p className="text-red-800">{errmsg}</p>
      ) : errmsgin !== 0 ? (
        <p className="text-red-800">{errmsgin}</p>
      ) : (
        <></>
      )}
      <div className="flex gap-2">
        <button
          className="bg-orange-500 w-fit px-4 py-2 text-white rounded-lg "
          onClick={() => {
            close();
            setupdate(false);
            dispatch(Teamactions.cleanupmsg());
          }}
        >
          Close
        </button>
        <button
          className="bg-orange-500 w-fit px-4 py-2 text-white rounded-lg"
          onClick={() => {
            if (name.current && region.current && country.current) {
              create(
                defname,
                name.current.value,
                region.current.value,
                country.current.value,
                seterrmsg,
                dispatch,
                update,
                teamkey
              );
            }
          }}
        >
          {update ? "Update" : "create"}
        </button>
      </div>
    </div>
  );
}
export default CreateTeam;

export const create = (
  defname: string,
  name: string,
  region: string,
  country: string,
  seterrmsg: any,
  dispatch: any,
  update: boolean | undefined,
  teamkey: number | null
) => {
  console.log(update);
  if (name.length === 0) {
    return seterrmsg("enter team name");
  } else if (region.length === 0) {
    return seterrmsg("enter region");
  } else if (country.length === 0) {
    return seterrmsg("enter country");
  }
  seterrmsg("");

  if (update === true) {
    dispatch(Playersactions.updateteam({ defname: defname, tname: name }));
    dispatch(
      Teamactions.updateteam({
        name: name,
        region: region,
        country: country,
        teamkey: teamkey,
      })
    );
  } else {
    dispatch(
      Teamactions.createteam({
        name: name,
        region: region,
        country: country,
      })
    );
  }
};

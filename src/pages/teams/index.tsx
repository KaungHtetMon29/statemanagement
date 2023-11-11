import Playercards from "@/components/playercards/playercards";
import Frame from "@/layout/frame";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Playersactions, getplayers } from "@/utils/redux/player";
import CreateTeam from "@/components/create team form/createteam";
import Teamcard from "@/components/teamcard/teamcard";

export default function Teampage() {
  const router = useRouter();
  const [enable, setenable] = useState(false);
  const loginstatus = useSelector((state: any) => state.auth.login);
  const teams = useSelector((state: any) => state.team.teams);
  const [teamindex, setteamindex] = useState(null);
  const [update, setupdate] = useState(false);
  useEffect(() => {
    if (!loginstatus) {
      router.push("/");
    }

    console.log(update);
  }, [teams, teamindex]);
  return (
    <Frame>
      <div className="mt-8 items-center mx-auto flex-col flex relative">
        {enable && (
          <CreateTeam
            setupdate={setupdate}
            update={update}
            teamindex={teamindex}
            close={() => {
              setenable(false);
            }}
          />
        )}
        <button
          className="bg-orange-500 w-fit px-4 py-2 text-white rounded-lg mx-auto"
          onClick={() => {
            setupdate(false);
            setenable((perv) => !perv);
          }}
        >
          Create New Team
        </button>
        <div className="flex gap-4 flex-wrap mt-10 justify-center">
          {teams.map((e: any) => (
            <Teamcard
              key={e.name}
              name={e.name}
              playercount={e.players.length}
              region={e.region}
              country={e.country}
              setenable={setenable}
              setteamindex={setteamindex}
              setupdate={setupdate}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

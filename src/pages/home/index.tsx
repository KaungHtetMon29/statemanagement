import Playercards from "@/components/playercards/playercards";
import Frame from "@/layout/frame";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Playerslice, { Playersactions, getplayers } from "@/utils/redux/player";
import Teamlist from "@/components/teamlist/teamlist";
type data = {
  id: number;
  first_name: string;
  last_name: string;
  team: { name: string };
  position: string;
};
export default function Home() {
  const router = useRouter();
  // const [page, setpage] = useState(1);
  const [playerid, setplayerid] = useState(null);
  const [togglelist, settogglelist] = useState(false);
  const [playername, setplayername] = useState(null);
  const dispatch: any = useDispatch();
  const loginstatus = useSelector((state: any) => state.auth.login);
  const players = useSelector((state: any) => state.players.players);
  const page = useSelector((state: any) => state.players.page);

  useEffect(() => {
    if (!loginstatus) {
      router.push("/");
    } else {
      console.log(page);
      if (page === 1 && players.length < 10) {
        console.log(players.length);
        dispatch(getplayers(page, 10));
      }
    }
  }, [page]);
  return (
    <Frame>
      {togglelist && (
        <Teamlist settogglelist={settogglelist} playerid={playerid} />
      )}

      <div className={`flex-wrap gap-5 mt-12 flex justify-center re`}>
        {players.map((e: data) => (
          <Playercards
            setplayername={setplayername}
            key={e.id}
            pid={e.id}
            pfname={e.first_name}
            plname={e.last_name}
            toggle={togglelist}
            firstname={e.first_name}
            uniquekey={e.id}
            lastname={e.last_name}
            team={e.team.name !== undefined ? e.team.name : ""}
            position={e.position}
            togglelist={settogglelist}
            setplayerid={setplayerid}
          />
        ))}
      </div>
      <button
        onClick={() => {
          dispatch(getplayers(page, 10));
        }}
        className="bg-orange-500 w-fit px-4 py-2 text-white rounded-lg mx-auto"
      >
        load more
      </button>
    </Frame>
  );
}

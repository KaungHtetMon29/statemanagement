import { Authactions } from "@/utils/redux/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
function Navbar(props: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const loginstatus = useSelector((state: any) => state.auth.login);
  const name = useSelector((state: any) => state.auth.name);
  return (
    <>
      <div className="flex sticky top-0 xl:w-[1202px] mx-auto py-4 bg-orange-500 px-4 rounded-xl text-white gap-6 z-[999]">
        {loginstatus ? (
          <>
            <p className="grow flex">{name}</p>
            <Link href="/home">Players</Link>
            <Link href="/teams"> Teams</Link>
            <button onClick={() => logoutfunc(dispatch, router)}>Logout</button>
          </>
        ) : (
          <>Login here</>
        )}
      </div>
      {props.children}
    </>
  );
}
export default Navbar;

export const logoutfunc = (dispatch: any, router: any) => {
  dispatch(Authactions.logout());
  router.push("/");
};

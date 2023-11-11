import { Authactions } from "@/utils/redux/auth";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Loginform() {
  const [err, seterr] = useState(false);
  const dispatch = useDispatch();
  const getuser = useSelector((state: any) => state.auth.name);
  const geterrmsg = useSelector((state: any) => state.auth.errmsg);
  const [errmsg, seterrmsg] = useState("");
  const nameref = useRef<HTMLInputElement>(null);
  const pwref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  //   const login = () => {
  //     seterr(false);
  //     if (getuser.length === 0) {
  //       seterr(true);
  //       return seterrmsg("please signup first");
  //     }

  //     if (nameref.current && nameref.current.value.length === 0) {
  //       seterr(true);
  //       return seterrmsg("name input field should not be blank");
  //     }
  //     if (pwref.current && pwref.current.value.length === 0) {
  //       seterr(true);
  //       return seterrmsg("password input field should not be blank");
  //     }
  //   };
  return (
    <div className="w-80 flex flex-col gap-8 bg-slate-200 p-8 rounded-lg mx-auto mt-10">
      <div className="gap-2 flex flex-col ">
        <label>Enter Your Name</label>
        <input
          required
          placeholder="enter password"
          className=" p-2 rounded-lg"
          ref={nameref}
        />
      </div>
      <div className="gap-2 flex flex-col">
        <label>Enter Your Password</label>
        <input
          ref={pwref}
          placeholder="enter password"
          className=" p-2 rounded-lg"
          required
        />
      </div>
      {err && <p className="text-red-800">{errmsg}</p>}
      <div className="flex gap-2">
        <button
          className="bg-orange-500 py-2 px-4 rounded-lg w-fit text-white"
          onClick={() =>
            signup(dispatch, nameref, pwref, router, seterr, seterrmsg)
          }
        >
          Signup
        </button>
        <button
          className="bg-orange-500 py-2 px-4 rounded-lg w-fit text-white"
          onClick={() =>
            login(
              dispatch,
              geterrmsg,
              seterr,
              seterrmsg,
              nameref,
              pwref,
              getuser,
              router
            )
          }
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default Loginform;

export const login = (
  dispatch: any,
  geterrmsg: any,
  seterr: any,
  seterrmsg: any,
  nameref: any,
  pwref: any,
  getuser: any,
  router: any
) => {
  seterr(false);

  if (nameref.current && nameref.current.value.length === 0) {
    seterr(true);
    return seterrmsg("name input field should not be blank");
  }
  if (pwref.current && pwref.current.value.length === 0) {
    seterr(true);
    return seterrmsg("password input field should not be blank");
  }
  if (getuser.length === 0) {
    seterr(true);
    return seterrmsg("please signup first");
  }
  if (nameref.current && pwref.current) {
    dispatch(
      Authactions.login({
        name: nameref.current.value,
        pw: pwref.current.value,
      })
    );
  }

  if (geterrmsg.length !== 0) {
    seterr(true);
    seterrmsg(geterrmsg);
  } else if (geterrmsg.length === 0) {
    console.log("run");
    router.push("/home");
  }
};

export const signup = (
  dispatch: any,
  nameref: any,
  pwref: any,
  router: any,
  seterr: any,
  seterrmsg: any
) => {
  if (nameref.current && nameref.current.value.length === 0) {
    seterr(true);
    return seterrmsg("name input field should not be blank");
  }
  if (pwref.current && pwref.current.value.length === 0) {
    seterr(true);
    return seterrmsg("password input field should not be blank");
  }
  if (nameref.current && pwref.current) {
    dispatch(
      Authactions.signup({
        name: nameref.current.value,
        pw: pwref.current.value,
      })
    );
    router.push("/home");
  }
};

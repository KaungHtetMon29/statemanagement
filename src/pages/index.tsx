import Image from "next/image";
import Frame from "@/layout/frame";
import Loginform from "@/components/loginform/loginform";

export default function Home() {
  return (
    <Frame>
      <Loginform />
    </Frame>
  );
}

import Navbar from "@/components/nav/navbar";
import "@/styles/globals.css";
import Store from "@/utils/redux/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store}>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </Provider>
  );
}

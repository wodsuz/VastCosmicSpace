import "../styles/globals.css";
import { StatusProvider } from "../context/statusContext";
function MyApp({ Component, pageProps }) {
  return [
    <StatusProvider key={pageProps}>
      <Component {...pageProps} />;
    </StatusProvider>,
  ];
}

export default MyApp;

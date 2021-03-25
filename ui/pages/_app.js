import { SideNavigation } from "../components/SideNavigation";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="pageWrapper">
      <SideNavigation />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

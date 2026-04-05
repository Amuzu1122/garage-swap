import { Outlet,useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

export default function App() {
  const {pathname} = useLocation()

  const hidefooter = pathname.startsWith("/market")
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
        {!hidefooter && <Footer/>}
      </div>
    </>
  );
}

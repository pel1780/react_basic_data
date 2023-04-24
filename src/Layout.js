import { Outlet } from "react-router-dom";
import AllList from "./pages/AllList";
import Header from "./pages/Header";

const Layout = ({ gugun }) => {
    return (
        <div className="Wrap">
            <Header gugun={gugun} />
            <Outlet />
        </div>
    )
}

export default Layout;
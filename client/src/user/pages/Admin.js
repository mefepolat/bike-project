import Table from "../components/Table";
import { Navigate,useLocation } from "react-router";
import NavigationMenu from "../components/NavigationMenu";
import BikeMap from "../../shared/components/BikeMap";
import "./Admin.css";
const Admin = ({user}) => { 
    const location = useLocation();
    console.log(user);
    if(!user || user.user.admin === false) {
        return <Navigate to="/" />
    }
    return (
        <div className="admin-layout">
      <header className="admin-header">
      </header>
      <div className="admin-main">
        <div className="admin-map">
          <BikeMap />
        </div>
        <div className="admin-table">
          <Table />
        </div>
      
      </div>
    </div>
    )
};

export default Admin;
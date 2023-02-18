import Table from "../components/Table";
import { Navigate } from "react-router";

import BikeMap from "../../shared/components/BikeMap";
import "./Admin.css";
const Admin = ({ user }) => {
 
  if (!user || user.user.admin === false) {
    return <Navigate to="/" />;
  }
  return (
    <div className="admin-layout">
      <header className="admin-header"></header>
      <div className="admin-main">
        <div className="admin-map">
          <BikeMap />
        </div>
        <div className="admin-table">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Admin;

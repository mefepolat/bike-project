import Inventory from "../components/Inventory";
import InventoryTable from "../components/Table";
import Trips from "../components/Trips";
import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../shared/components/AuthContext";

const Admin = ({user}) => {
    
    console.log(user);
    if(!user || user.user.admin === false) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <h1>Admin Page</h1>
            <Inventory />
            <InventoryTable />
            <Trips />
        </div>
    )
};

export default Admin;
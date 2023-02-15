import Inventory from "../components/Inventory";
import InventoryTable from "../components/Table";
import Trips from "../components/Trips";
import { useContext } from "react";
import { AuthContext } from "../../shared/components/AuthContext";
import { Navigate,redirect } from "react-router";

const Admin = () => {
    const {user} = useContext(AuthContext);
    if(!user){
        redirect("/");
    }
    if(user.isAdmin === false) {
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
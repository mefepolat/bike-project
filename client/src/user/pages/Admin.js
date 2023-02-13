import Inventory from "../components/Inventory";
import DenseTable from "../components/Table";
import Trips from "../components/Trips";
import { useContext } from "react";
import { AuthContext } from "../../shared/components/AuthContext";
import { Navigate } from "react-router";

const Admin = () => {
    const {user} = useContext(AuthContext);
    if(user.isAdmin == false) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <h1>Admin Page</h1>
            <Inventory />
            <DenseTable />
            <Trips />
        </div>
    )
};

export default Admin;
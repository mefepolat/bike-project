import Inventory from "../components/Inventory";
import DenseTable from "../components/Table";
import Trips from "../components/Trips";


const Admin = () => {
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
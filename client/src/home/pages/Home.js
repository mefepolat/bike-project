
import Article from "../components/article"
// import CheckOutButton from "../components/CheckOutButton";
import DenseTable from "../components/Table";
import SelectStation from "../components/Form"

const HomePage = () => {
    return (
        <div>
            <h1>HomePage</h1>
            <Article />
            <DenseTable />
            <SelectStation />
        </div>
    )
};

export default HomePage;
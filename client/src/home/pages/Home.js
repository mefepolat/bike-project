

// import CheckOutButton from "../components/CheckOutButton";
import background from "../../images/bckgrnd.jpg"
import SelectStation from "../components/SelectStation"

const HomePage = () => {
    return (
        <div className="home_section" style={{backgroundImage: `url(${background})`}}>
            <h1>HomePage</h1>
            
            
            <SelectStation />
        </div>
    )
};

export default HomePage;
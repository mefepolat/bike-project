import { useContext, useState } from "react";
import { AuthContext } from "../../shared/components/AuthContext";
import { useNavigate } from "react-router";


const EndTrip = ({tripId, onEndTrip}) => {
    const {user} = useContext(AuthContext);
    const [endStation, setEndStation] = useState('');
    const navigate = useNavigate();
    function handleEndStationChange(event){
        setEndStation(event.target.value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const endDate = new Date().getUTCDate();
        try{
            const response = await fetch(`http://localhost:3000/api/endtrip/${tripId}`,{
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({endDate, endStation})
            })
            const data = await response.json();
            console.log(data);
            navigate("/");
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="end_station">Drop off station:</label>
                <select
                id="end_station"
                value={endStation}
                onChange={handleEndStationChange}
                >
                    <option value="">Select a station</option>
                    <option value="Saint-Leonard">Saint-Leonard</option>
                    <option value="Berri-UQAM">Berri-UQAM</option>
                    <option value="Longueuil">Longueuil</option>
                </select>
            </div>
            <button type="submit">End Trip</button>
            </form>
    )
}

export default EndTrip;
import { useState, useEffect } from "react";
import "./EndTrip.css";

const EndTrip = ({tripId, onEndTrip}) => {
   
    const [endStation, setEndStation] = useState('');
    const [selectedStation, setSelectedStation] = useState('');
 
    function handleEndStationChange(event){
        setSelectedStation(event.target.value);
    }



    useEffect(() => {
        const fetchStations = async () => {
          try {
            const response = await fetch("http://localhost:3000/api/stations");
            const data = await response.json();
            
            setEndStation(data);
            
          } catch (err) {
            console.error(err);
          }
        };
        fetchStations();
      }, []);

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        const endDate = new Date().toISOString();
        try{
            const response = await fetch(`http://localhost:3000/api/endtrip`,{
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({endDate, selectedStation, tripId})
            })
            const data = await response.json();
            
            onEndTrip();
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="end_station">Drop off station:</label>
                <select
                id="end_station"
                value={selectedStation}
                onChange={handleEndStationChange}
                >
                    <option value="">Select a station</option>
                    {endStation && endStation.map(station => {
                        return <option key={station._id} value={station._id}>{station.stationName}</option>
                    })}
                    
                </select>
            </div>
            <button className="end_button" type="submit">End Trip</button>
            </form>
            
            </div>
    )
}

export default EndTrip;
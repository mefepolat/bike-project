import {useState, useEffect} from "react";
import './BeginTrip.css';
import {useContext} from "react";
import {AuthContext} from "../../shared/components/AuthContext";

function BeginTrip({onBeginTrip}) {
  const [station, setStation] = useState('');
  const [bikeId, setBikeId] = useState('');
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState('');
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stations");
        const data = await response.json();
        setStations(data);
        console.log(data)
      } catch (err) {
        console.error(err);
      }
    };
    fetchStations();
  }, []);

  useEffect(() => {
    const fetchBikes = async () => {
      console.log(station)
      try {
        const response = await fetch(`http://localhost:3000/api/bikes?station=${station}`);
        const data = await response.json();
        setBikes(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (station) {
      fetchBikes();
    } else {
      setBikes([]);
    }
  }, [station]);

  const {user} = useContext(AuthContext);
  const handleStationChange = (event) => {
    setStation(event.target.value);
    
  };
  const handleBikeChange = (event) => {
    setSelectedBike(event.target.value);
   
    setBikeId(event.target.value);
    
  }
 
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    const startDate = new Date().toISOString();
    try{
      const response = await fetch("http://localhost:3000/api/newTrip", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({station,bikeId, startDate, user})
      });
      const data = await response.json();
      console.log(data)
      onBeginTrip(data.trip._id)
    } catch (err){
      console.error(err);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="station">Station:</label>
        <select
        id="station"
        value={station}
        onChange={handleStationChange}>
          <option value="">Select a station:</option>
          {stations.map((station) => {
            return <option key={station._id} value={station._id}>
              {station.stationName}
            </option>
          })}
        </select>
      </div>
      <div>
        <label htmlFor="bike">Available Bikes:</label>
        <select
        id="bike"
        value={selectedBike || ""}
        onChange={handleBikeChange}>
          {!bikes.length ? (
    <option value="" disabled>No bikes available.</option>
  ) : (
    <>
      <option value="">Select a bike</option>
      {bikes.map((bike) => (
        <option key={bike._id} value={bike._id}>
          {bike.bikeType}
        </option>
      ))}
    </>)}
        </select>
      </div>
      <button type="submit" disabled={!selectedBike}>Begin Trip</button>
    </form>
  );
}

export default BeginTrip;
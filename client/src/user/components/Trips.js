import { useState, useEffect } from "react";
import axios from "axios";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTrips() {
      try {
        const response = await axios.get("http://localhost:3000/api/trips",{
            headers: {
               authorization: ' xxxxxxxxxx' ,
               'Content-Type': 'application/json'
            }
         });
         console.log(response.data)
        setTrips(response.data);
      } catch (error) {
        setError(error);
      }
    }
    getTrips();
  }, []);


  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <ul>
      {trips.map(trip => (
        <li key={trip._id}>
          Start Station: {trip.start_station} - End station: {trip.end_station}
        </li>
      ))}
    </ul>
  );
};

export default Trips;



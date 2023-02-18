import { useState, useEffect } from "react";
import "./Table.css";
const Table = () => {
  const [stations, setStations] = useState([]);
  console.log(stations);
  useEffect(() => {
    const getStations = async () => {
      const response = await fetch("http://localhost:3000/api/stations", {
        method: "GET",
        headers: {
          "Content-Policy": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (response) {
        setStations(data);
      } else {
        return <h2>Currently there are no stations available.</h2>;
      }
    };

    getStations();
  }, []);

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Bike Type</th>
          {stations.map((station) => {
            return <th key={station._id}>{station.stationName}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Electric Bikes</td>
          {stations.map((station) => {
            let count = 0;
            station.availableBikes.map((bike) => {
              bike.bikeType === "Electric Bike" ? count++ : (count = count);
            });
            return <td key={`${station._id}-electric`}>{count}</td>;
          })}
        </tr>
        <tr>
          <td>Classic Bikes</td>
          {stations.map((station) => {
            let count = 0;
            station.availableBikes.map((bike) => {
              return bike.bikeType === "Classic Bike"
                ? count++
                : (count = count);
            });
            return <td key={`${station._id}-classic`}>{count}</td>;
          })}
        </tr>
        <tr>
          <td>Total Bikes</td>
          {stations.map((station) => {
            return (
              <td key={`${station.stationName}-total`}>
                {station.availableBikes.length}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;

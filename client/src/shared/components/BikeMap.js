import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl } from "react-map-gl";
import SuperCluster from "supercluster";
import { useEffect, useState } from "react";
import CustomMarker from "./CustomMarker";
import "./BikeMap.css";

const BikeMap = () => {
  const [viewport, setViewPort] = useState({});
  const cluster = new SuperCluster({
    radius: 75,
    maxZoom: 16,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);

  const handleViewportChange = (newViewport) => {
    setViewPort((prevViewport) => ({
      ...prevViewport,
      longitude: newViewport.longitude,
      latitude: newViewport.latitude,
      zoom: newViewport.zoom,
    }));
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setSelectedCluster(null);
  };

  const handleClusterClick = (cluster) => {
    setSelectedCluster(cluster);
    setSelectedMarker(null);
  };

  const [stations, setStations] = useState([]);
  const [isClusterLoaded, setIsClusterLoaded] = useState(false);
  useEffect(() => {
    const fetchStations = async () => {
      const response = await fetch("http://localhost:3000/api/stations", {
        method: "GET",
        headers: {
          "Content-Policy": "application/json",
        },
      });
      const stations = await response.json();

      setStations(stations);

      setIsClusterLoaded(true);
    };
    fetchStations();
  }, []);

  cluster.load(stations);
 
  const markers = isClusterLoaded
    ? cluster.getClusters([-180, -85, 180, 85], 5)
    : [];

  const accesToken = process.env.REACT_APP_MAPBOX_TOKEN;

  return (
    <Map
      initialViewState={{
        longitude: -73.561668,
        latitude: 45.5019,
        zoom: 12,
      }}
      style={{ width: 600, height: 300 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={accesToken}
      onViewportChange={handleViewportChange}
      dragPan={true}
      scrollZoom={true}
    >
      <NavigationControl showCompass showZoom position="top-right" />
      {isClusterLoaded &&
        markers.map((marker) => (
          <CustomMarker
            key={marker.id}
            properties={marker.properties}
            cluster={marker.properties.cluster}
            latitude={marker.geometry.coordinates[1]}
            longitude={marker.geometry.coordinates[0]}
            onClick={
              marker.properties.cluster
                ? () => handleClusterClick(marker)
                : () => handleMarkerClick(marker)
            }
            station={marker.properties.station}
          >
            {marker.properties.cluster ? (
              <div className="cluster-marker">
                <span>{marker.properties.point_count}</span>
              </div>
            ) : (
              <div className="single-marker">
                <span>{marker.properties.stationName}</span>
              </div>
            )}
          </CustomMarker>
        ))}
        {selectedCluster && (
            <div className="info-box">
                <p>Cluster center: {selectedCluster.properties.cluster_name}</p>
                <p>{selectedCluster.properties.point_count}</p>
            </div>
        )}
        {selectedMarker && (
            <div className="info-box">
                <p>{selectedMarker.properties.stationName}</p>
            </div>
        )}
    </Map>
  );
};

export default BikeMap;

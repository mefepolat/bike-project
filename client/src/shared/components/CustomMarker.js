import { useState } from "react";
import { Marker } from "react-map-gl";
import "./CustomMarker.css";

const CustomMarker = ({
  latitude,
  longitude,
  cluster,
  onClick,
  station,
  properties,
}) => {
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setShowInfoBox(true);
    setIsClicked(!isClicked);
    onClick();
  };

  const className = isClicked ? "white-background" : "";

  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div
        className={`marker ${className} ${
          cluster ? "cluster-marker" : "single-marker"
        }`}
        onClick={handleClick}
      >
        {cluster ? (
          <span>{properties.point_count}</span>
        ) : (
          <span>{station.properties.stationName}</span>
        )}
      </div>
      {showInfoBox && (
        <div className="info-box">
          <p>
            {cluster
              ? `${properties.point_count} stations`
              : station.stationName}
          </p>
          {cluster && <p>Cluster center: {properties.cluster_name}</p>}
        </div>
      )}
    </Marker>
  );
};

export default CustomMarker;

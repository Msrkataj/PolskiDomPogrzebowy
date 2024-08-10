import React, { useRef, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    height: "400px",
    width: "100%"
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

const FuneralHomeMap = ({ latitude, longitude, name }) => {
    const mapRef = useRef();
    const onLoad = map => {
        mapRef.current = map;
    };

    const markerPosition = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={markerPosition}
            zoom={15}
            onLoad={onLoad}
            options={options}
        >
            <Marker
                position={markerPosition}
                icon={{
                    url: "/assets/icons/marker.png",
                    scaledSize: new window.google.maps.Size(30, 40)
                }}
            />
        </GoogleMap>
    );
};

export default FuneralHomeMap;

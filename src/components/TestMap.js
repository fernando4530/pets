import React from "react";

import GoogleMapReact from "google-map-react";
import { Button } from "react-bootstrap";

const AnyReactComponent = ({ text }) => (
  <div>
    <Button>Soy Un Button</Button>
  </div>
);

function TestMap() {
  const defaultProps = {
    center: {
      lat: -32.912915,
      lng: -68.855614,
    },
    zoom: 11,
  };

  const getGoogleMapApi = (map, maps) => {
    console.log("apiIsLoaded");
    if (map) {
      map.setOptions({
        minZoom: 12,
      });
    }

    if (maps) {
      const myMarker = new maps.Marker({
        position: { lat: -32.912915, lng: -68.855614 },
        map,
        draggable: true,
        editable: true,
        title: "Hello World!",
      });

      var myCircle = new maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        editable: true,
        draggable: true,
        map,
        center: { lat: -32.912915, lng: -68.855614 },
        radius: 10000,
      });

      myCircle.addListener("drag", () => {
        console.log(JSON.stringify(myCircle.getCenter()));
      });

      myMarker.addListener("drag", () => {
        console.log(JSON.stringify(myMarker.getPosition()));
      });
    }
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCf15IY-ePezWQeCIhR9KuKWlMbtmA3bR4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => getGoogleMapApi(map, maps)}
      >
        <AnyReactComponent lat={-32.912915} lng={-68.855614} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}

export default TestMap;

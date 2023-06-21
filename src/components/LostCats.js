/* global google */
import React, { useState, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { Form, Button, Table, Card } from "react-bootstrap";

const defaultCenter = {
  lat: -32.8897,
  lng: -68.844629,
};

const LostCats = () => {
  const [foundCats, setFoundCats] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [circleCenter, setCircleCenter] = useState(defaultCenter);
  const [circleRadius, setCircleRadius] = useState(10000);
  const [catImage, setCatImage] = useState(null);
  const mapRef = useRef(null);
  const circleRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newCat = {
      name,
      phone,
      location: circleCenter,
      image: catImage,
    };
    console.log(newCat);

    setFoundCats([...foundCats, newCat]);

    setName("");
    setPhone("");
    setCatImage(null);

    setCircleCenter(defaultCenter);
    setCircleRadius(1000);
  };

  const handleCircleDrag = (circle) => {
    const center = circle.getCenter();
    setCircleCenter({ lat: center.lat(), lng: center.lng() });
  };

  const handleCircleRadiusChange = (circle) => {
    console.log(circle.getRadius());
    setCircleRadius(circle.getRadius());
  };

  const handleShowLocation = (location) => {
    setCircleCenter(location);
    setCircleRadius(10000);
    const map = mapRef.current;
    const circle = circleRef.current;
    if (map && circle) {
      map.panTo(location);
      circle.setCenter(location);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCatImage(file);
  };

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      google.maps.event.addDomListener(map, "click", () => {
        window.alert("Map was clicked!");
      });
    }
  }, []);

  const maprender = (map, maps) => {
    const circle = new maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      editable: true,
      draggable: true,
      map,
      center: circleCenter,
      radius: circleRadius,
    });

    circle.addListener("drag", () => {
      handleCircleDrag(circle);
      console.log(JSON.stringify(circle.getCenter()));
    });

    maps.event.addListener(circle, "radius_changed", () => {
      handleCircleRadiusChange(circle);
    });

    mapRef.current = map;
    circleRef.current = circle;
  };

  return (
    <div className="container">
      <Card className="mt-4">
        <Card.Header>
          <Card.Title className="text-center">Publicar gato perdido</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Nombre de la persona</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>Número de teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ingrese el teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formImage">
                  <Form.Label>Imagen del gato</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button variant="primary" type="submit">
                    Publicar Gato Encontrado
                  </Button>
                </div>
              </Form>
            </div>

            <div className="col-md-6">
              <div style={{ height: "500px", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyCf15IY-ePezWQeCIhR9KuKWlMbtmA3bR4",
                  }}
                  defaultCenter={defaultCenter}
                  defaultZoom={11}
                  yesIWantToUseGoogleMapApiInternals={true}
                  onGoogleApiLoaded={({ map, maps }) => maprender(map, maps)}
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <h3 className="mt-4">Gatos encontrados</h3>
      <Table striped bordered hover className="mt-2">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Imagen</th>
            <th>Ubicación</th>
          </tr>
        </thead>
        <tbody>
          {foundCats.map((cat, index) => (
            <tr key={index}>
              <td>{cat.name}</td>
              <td>{cat.phone}</td>
              <td>
                {cat.image && (
                  <img
                    src={URL.createObjectURL(cat.image)}
                    alt="Cat"
                    style={{ width: "100px" }}
                  />
                )}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleShowLocation(cat.location)}
                >
                  Ubicación
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LostCats;

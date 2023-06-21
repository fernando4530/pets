import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { fetchBreeds, fetchBreedImages } from "../services/ApiCalls";

const CatsBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [breedImages, setBreedImages] = useState([]);

  useEffect(() => {
    fetchBreeds()
      .then((breedsData) => {
        setBreeds(breedsData);
        console.log("Razas cargadas:", breedsData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    setSelectedBreed(event.target.value);
    console.log("raza seleccionada:", event.target.value);

    const selectedBreedId = breeds.find((breed) => breed.name === event.target.value)?.id;
    console.log("selectedBreedId:", selectedBreedId);

    fetchBreedImages(selectedBreedId)
      .then((imagesData) => {
        setBreedImages(imagesData);
        console.log("imagenes de razas cargadas:", imagesData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container className="d-flex flex-wrap mt-3 mb-3 justify-content-center main-container">
      <div className="p-3 w-50 text-center" style={{ minWidth: "300px" }}>
        <h3 className="lead">Elige tu raza favorita</h3>
        <Form.Select
          aria-label="Razas"
          onChange={handleChange}
          className="text-center"
        >
          <option>Selecciona una raza</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.name}>
              {breed.name}
            </option>
          ))}
        </Form.Select>
      </div>
      {selectedBreed && (
        <div className="p-3 w-100" style={{ minWidth: "300px" }}>
          <div className="mt-4 bg-primary p-4 rounded">
            <ListGroup>
              <ListGroup.Item
                key={breeds.find((breed) => breed.name === selectedBreed).id}
                className="list-group-item-action list-group border-3"
              >
                <h3 className="text-center text-darc">{selectedBreed}</h3>
              </ListGroup.Item>
            </ListGroup>
            {breedImages.length > 0 ? (
              <Card className="mt-4">
                <Card.Header>Imágenes de {selectedBreed}</Card.Header>
                <Card.Body>
                  <Carousel>
                    {breedImages.map((image) => (
                      <Carousel.Item key={image.id}>
                        <img
                          className="d-block w-100"
                          src={image.url}
                          alt={selectedBreed}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Card.Body>
              </Card>
            ) : (
              <h1>No hay imágenes que cargar</h1>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default CatsBreeds;

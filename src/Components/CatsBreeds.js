import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";

function CatsBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [breedImages, setBreedImages] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/breeds")
      .then((response) => setBreeds(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      axios
        .get(
          `https://api.thecatapi.com/v1/images/search?limit=100&breed_id=${
            breeds.find((breed) => breed.name === selectedBreed).id
          }`
        )
        .then((response) => setBreedImages(response.data))
        .catch((error) => console.log(error));
    } else {
      setBreedImages([]);
    }
  }, [selectedBreed, breeds]);

  const handleChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  return (
    <Container className="mt-3 mb-3">
      <h1 className="text-center mb-4">Razas de Gatos</h1>
      <Form.Select aria-label="Razas" onChange={handleChange}>
        <option>Selecciona una Raza</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.name}>
            {breed.name}
          </option>
        ))}
      </Form.Select>
      {selectedBreed && (
        <div className="mt-4">
          <ListGroup>
            <ListGroup.Item
              key={breeds.find((breed) => breed.name === selectedBreed).id}
              className="list-group-item-action
                        list-group
                        border-3
                        bg-primary"
            >
              <h3 className="text-center">{selectedBreed}</h3>
            </ListGroup.Item>
          </ListGroup>
          {breedImages.length > 0 ? (
            <Carousel className="mt-4">
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
          ) : (
            <h4 className="text-center mt-4">No se encontraron imágenes.</h4>
          )}
        </div>
      )}
    </Container>
  );
}

export default CatsBreeds;

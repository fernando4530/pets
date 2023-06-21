import React, { useEffect, useState } from "react";
import { fetchDogBreeds } from "../utils/ApiCalls";
import translateTemperament from "../utils/Traductions";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";

const MyDog = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [clickedBreed, setClickedBreed] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await fetchDogBreeds(); // Utiliza solo la función fetchDogBreeds desde ApiCall.js
        setBreeds(data);
        setLoadingImage(false);
        console.log("Breeds Response:", data);
      } catch (error) {
        console.error(error);
        setError(
          "Error al cargar las razas de perros. Por favor, intenta nuevamente más tarde."
        );
        setLoadingImage(false);
      }
    };

    fetchBreeds();
  }, []);
  const handleBreedHover = (breed) => {
    if (!clickedBreed) {
      setSelectedBreed(breed);
    }
  };

  const handleBreedClick = (breed) => {
    if (clickedBreed && clickedBreed.id === breed.id) {
      setClickedBreed(null);
    } else {
      setClickedBreed(breed);
      setSelectedBreed(breed);
    }
  };

  useEffect(() => {
    console.log("Clicked Breed:", clickedBreed);
    if (clickedBreed) {
      console.log("Clicked Breed ID:", clickedBreed.id);
    }
  }, [clickedBreed]);

  useEffect(() => {
    console.log("Loading:", loadingImage);
  }, [loadingImage]);

  useEffect(() => {
    console.log("Error:", error);
  }, [error]);

  return (
    <div className="text-center">
      <h1 className="mt-3 mb-5">¿Cuál es tu Perro?</h1>
      <Row>
        <Col sm={4}>
          <h2>Búsqueda Por Nombre de Raza</h2>
          <ListGroup>
            {breeds.map((breed) => (
              <ListGroup.Item
                key={breed.id}
                onMouseEnter={() => handleBreedHover(breed)}
                onMouseLeave={() => {
                  if (!clickedBreed) {
                    setSelectedBreed(null);
                  }
                }}
                onClick={() => handleBreedClick(breed)}
                active={clickedBreed && clickedBreed.id === breed.id}
              >
                {breed.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={4}>
          <h2>Búsqueda Por Foto</h2>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              position: "sticky",
              top: "20px",
              backgroundColor: "#007bff",
            }}
          >
            {loadingImage ? (
              <Card style={{ width: "18rem" }} className="mb-4">
                <Card.Body>
                  <Card.Title>¿Cuál es tu mascota?</Card.Title>
                  <Spinner animation="border" variant="light" />
                </Card.Body>
              </Card>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : selectedBreed || clickedBreed ? (
              <Card
                style={{ width: "18rem", marginTop: "20px" }}
                className="mb-4"
              >
                <Card.Title>
                  {(clickedBreed && clickedBreed.name) ||
                    (selectedBreed && selectedBreed.name)}
                </Card.Title>
                <Card.Img
                  variant="top"
                  src={
                    (clickedBreed &&
                      clickedBreed.image &&
                      clickedBreed.image.url) ||
                    (selectedBreed &&
                      selectedBreed.image &&
                      selectedBreed.image.url)
                  }
                  alt={
                    (clickedBreed && clickedBreed.name) ||
                    (selectedBreed && selectedBreed.name)
                  }
                />
                <span
                  className="card-number font-weight-bolder bg-warning"
                  style={{
                    position: "absolute",
                    top: "40px",
                    right: "5px",
                    backgroundColor: "white",
                    padding: "6px 12px",
                    borderRadius: "50%",
                  }}
                >
                  {(clickedBreed && clickedBreed.id) ||
                    (selectedBreed && selectedBreed.id)}
                </span>
                <Card.Body>
                  <h5 style={{ textAlign: "left" }}>Temperamento: </h5>
                  <Card.Text>
                    {(clickedBreed &&
                      translateTemperament(clickedBreed.temperament)) ||
                      (selectedBreed &&
                        translateTemperament(selectedBreed.temperament))}
                  </Card.Text>
                  <Button
                    className="btn btn-outline-primary"
                    onClick={() => console.log(selectedBreed)}
                    variant="link"
                    style={{
                      position: "absolute",
                      bottom: "90px",
                      right: "0px",
                      color: "black",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                  >
                    Más Info
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Card style={{ width: "18rem" }} className="mb-4">
                <Card.Body>
                  <Card.Title>¿Cuál es tu mascota?</Card.Title>
                  <p className="small text-muted">teclea una raza</p>
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MyDog;

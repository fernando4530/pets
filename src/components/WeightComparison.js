import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchBreeds, fetchBreedDetails } from '../services/ApiCalls';

function WeightComparison() {
  const [catBreeds, setCatBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedCatBreed1, setSelectedCatBreed1] = useState({});
  const [selectedCatBreed2, setSelectedCatBreed2] = useState({});
  const [selectedDogBreed1, setSelectedDogBreed1] = useState({});
  const [selectedDogBreed2, setSelectedDogBreed2] = useState({});
  const [catBreed1Weight, setCatBreed1Weight] = useState(0);
  const [catBreed2Weight, setCatBreed2Weight] = useState(0);
  const [dogBreed1Weight, setDogBreed1Weight] = useState(0);
  const [dogBreed2Weight, setDogBreed2Weight] = useState(0);
  const [heavierCatBreed, setHeavierCatBreed] = useState("");
  const [heavierDogBreed, setHeavierDogBreed] = useState("");

  useEffect(() => {
    const loadBreeds = async () => {
      const breeds = await fetchBreeds();
      setCatBreeds(breeds);
      console.log("Razas de gatos cargadas:", breeds);
    };

    axios
      .get("https://api.thedogapi.com/v1/breeds")
      .then((response) => {
        setDogBreeds(response.data);
        console.log("Razas de perros cargadas:", response.data);
      })
      .catch((error) => console.log(error));

      loadBreeds();
  }, []);

  const handleCatBreed1Change = (event) => {
    setSelectedCatBreed1(event.target.value);
    console.log("Raza de gato 1 seleccionada:", event.target.value);

    const selectedCatBreed1Id = catBreeds.find(
      (breed) => breed.name === event.target.value
    )?.id;

    fetchBreedDetails(selectedCatBreed1Id)
    .then((response) => {
      const weightRange = response.data.weight.metric.split(" - ");
      const averageWeight = calculateAverageWeight(weightRange);
      setCatBreed1Weight(averageWeight);
      setSelectedCatBreed1(response.data);
      console.log("Peso de la raza de gato 1:", averageWeight);
    })
    .catch((error) => console.log(error));
  };

  const handleCatBreed2Change = (event) => {
    setSelectedCatBreed2(event.target.value);
    console.log("Raza de gato 2 seleccionada:", event.target.value);

    const selectedCatBreed2Id = catBreeds.find(
      (breed) => breed.name === event.target.value
    )?.id;

    fetchBreedDetails(selectedCatBreed2Id)
      .then((response) => {
        const weightRange = response.data.weight.metric.split(" - ");
        const averageWeight = calculateAverageWeight(weightRange);
        setCatBreed2Weight(averageWeight);
        setSelectedCatBreed2(response.data);
        console.log("Peso de la raza de gato 2:", averageWeight);
      })
      .catch((error) => console.log(error));
  };

  const handleDogBreed1Change = (event) => {
    console.log("Raza de perro 1 seleccionada:", event.target.value);

    const selectedDogBreed1Id = dogBreeds.find(
      (breed) => breed.name === event.target.value
    )?.id;

    axios
      .get(`https://api.thedogapi.com/v1/breeds/${selectedDogBreed1Id}`)
      .then((response) => {
        const weightRange = response.data.weight.metric.split(" - ");
        const averageWeight = calculateAverageWeight(weightRange);
        setDogBreed1Weight(averageWeight);
        setSelectedDogBreed1(response.data);
        console.log("Peso de la raza de perro 1:", averageWeight);
      })
      .catch((error) => console.log(error));
  };

  const handleDogBreed2Change = (event) => {
    setSelectedDogBreed2(event.target.value);
    console.log("Raza de perro 2 seleccionada:", event.target.value);

    const selectedDogBreed2Id = dogBreeds.find(
      (breed) => breed.name === event.target.value
    )?.id;

    axios
      .get(`https://api.thedogapi.com/v1/breeds/${selectedDogBreed2Id}`)
      .then((response) => {
        const weightRange = response.data.weight.metric.split(" - ");
        const averageWeight = calculateAverageWeight(weightRange);
        setDogBreed2Weight(averageWeight);
        setSelectedDogBreed2(response.data);
        console.log("Peso de la raza de perro 2:", averageWeight);
      })
      .catch((error) => console.log(error));
  };

  const handleComparison = () => {
    if (catBreed1Weight && catBreed2Weight) {
      if (parseFloat(catBreed1Weight) > parseFloat(catBreed2Weight)) {
        setHeavierCatBreed(selectedCatBreed1);
      } else if (parseFloat(catBreed1Weight) < parseFloat(catBreed2Weight)) {
        setHeavierCatBreed(selectedCatBreed2);
      } else {
        setHeavierCatBreed("Las dos razas de gatos tienen el mismo peso");
      }
    }
  
    if (dogBreed1Weight && dogBreed2Weight) {
      if (parseFloat(dogBreed1Weight) > parseFloat(dogBreed2Weight)) {
        setHeavierDogBreed(selectedDogBreed1);
      } else if (parseFloat(dogBreed1Weight) < parseFloat(dogBreed2Weight)) {
        setHeavierDogBreed(selectedDogBreed2);
      } else {
        setHeavierDogBreed("Las dos razas de perros tienen el mismo peso");
      }
    }
  };

  const calculateAverageWeight = (weightRange) => {
    const minWeight = parseFloat(weightRange[0]);
    const maxWeight = parseFloat(weightRange[1]);
    
    if (isNaN(minWeight) && isNaN(maxWeight)) {
      // Si tanto el peso mínimo como el máximo no son números, se trata de un único peso
      return weightRange[0];
    } else {
      const averageWeight = (minWeight + maxWeight) / 2;
      return averageWeight.toFixed(2); // Redondear a 2 decimales
    }

  };

  const getSplit = (metric) => {
    return metric.split(" - ")
  }

  return (
    <div>
      <Container>
        <Card className="p-3 mt-3">
          <h3 className="text-center">Comparación de peso de razas de gatos</h3>
          <Row className="justify-content-center">
            <Col sm={6} md={4}>
              <Form.Select
                aria-label="Raza de gato 1"
                onChange={handleCatBreed1Change}
                className="mb-2"
              >
                <option>Selecciona una raza</option>
                {catBreeds.map((breed) => (
                  <option key={breed.id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={6} md={4}>
              <Form.Select
                aria-label="Raza de gato 2"
                onChange={handleCatBreed2Change}
                className="mb-2"
              >
                <option>Selecciona una raza</option>
                {catBreeds.map((breed) => (
                  <option key={breed.id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <div>
            {heavierCatBreed && typeof heavierCatBreed !== "string" && (
              <div>
                <p className="text-center">
                  La raza de gato más pesada es: {heavierCatBreed.name}
                </p>
                <p className="text-center">
                  Peso: {calculateAverageWeight(getSplit(heavierCatBreed.weight.metric))} Kg.
                </p>
              </div>
            )}
          </div>
          <h3 className="text-center">Comparación de peso de razas de perros</h3>
          <Row className="justify-content-center">
            <Col sm={6} md={4}>
              <Form.Select
                aria-label="Raza de perro 1"
                onChange={handleDogBreed1Change}
                className="mb-2"
              >
                <option>Selecciona una raza</option>
                {dogBreeds.map((breed) => (
                  <option key={breed.id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={6} md={4}>
              <Form.Select
                aria-label="Raza de perro 2"
                onChange={handleDogBreed2Change}
                className="mb-2"
              >
                <option>Selecciona una raza</option>
                {dogBreeds.map((breed) => (
                  <option key={breed.id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <div>
            {heavierDogBreed && typeof heavierDogBreed !== "string" && (
              <div>
                <p className="text-center">
                  La raza de perro más pesada es: {heavierDogBreed.name}
                </p>
                <p className="text-center">
                  Peso: {calculateAverageWeight(getSplit(heavierDogBreed.weight.metric))} Kg.
                </p>
              </div>
            )}
          </div>
          <div className="text-center">
            <Button variant="primary" onClick={handleComparison}>
              Comparar Peso
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default WeightComparison;
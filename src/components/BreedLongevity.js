import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dropdown,
  DropdownButton,
  ListGroup,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const BreedLongevity = () => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [selectedDogAge, setSelectedDogAge] = useState("");
  const [selectedCatAge, setSelectedCatAge] = useState("");
  const [filteredDogBreeds, setFilteredDogBreeds] = useState([]);
  const [filteredCatBreeds, setFilteredCatBreeds] = useState([]);
  const [dogAgeAverage, setDogAgeAverage] = useState(0);
  const [catAgeAverage, setCatAgeAverage] = useState(0);

  const calculateDogAgeAverage = (age) => {
    const filteredDogs = Object.values(dogBreeds).filter(
      (breed) => breed.life_span === age
    );
    const totalDogs = filteredDogs.length;
    console.log(totalDogs);
    let totalAge = 0;

    filteredDogs.forEach((dog) => {
      const lifeSpan = dog.life_span.split(" ");
      const minAge = parseInt(lifeSpan[0]);
      const maxAge = parseInt(lifeSpan[2]);
      const average = (minAge + maxAge) / 2;
      console.log(average);
      totalAge += average;
    });

    const averageAge = totalAge / totalDogs;
    console.log(averageAge);
    setDogAgeAverage(averageAge.toFixed(1));
    console.log(
      "Promedio de esperanza de vida de perros:",
      averageAge.toFixed(1),
      "años"
    );
  };

  const calculateCatAgeAverage = (age) => {
    const filteredCats = Object.values(catBreeds).filter(
      (breed) => breed.life_span === age
    );
    const totalCats = filteredCats.length;
    let totalAge = 0;

    filteredCats.forEach((cat) => {
      const lifeSpan = cat.life_span.split(" ");
      const minAge = parseInt(lifeSpan[0]);
      const maxAge = parseInt(lifeSpan[2]);
      const average = (minAge + maxAge) / 2;
      totalAge += average;
    });

    const averageAge = totalAge / totalCats;
    setCatAgeAverage(averageAge.toFixed(1));
    console.log(
      "Promedio de esperanza de vida de gatos:",
      averageAge.toFixed(1),
      "años"
    );
  };

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const response = await axios.get("https://api.thedogapi.com/v1/breeds");
        setDogBreeds(response.data);
        console.log("Razas de perros buscadas:", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCatBreeds = async () => {
      try {
        const response = await axios.get("https://api.thecatapi.com/v1/breeds");
        setCatBreeds(response.data);
        console.log("Razas de gatos buscadas:", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogBreeds();
    fetchCatBreeds();
  }, []);

  const handleDogAgeSelect = (age) => {
    setSelectedDogAge(age);
    console.log("Edad (Perro) seleccionada:", age);
    calculateDogAgeAverage(age);
  };

  const handleCatAgeSelect = (age) => {
    setSelectedCatAge(age);
    console.log("Edad (Gato) seleccionada:", age);
    calculateCatAgeAverage(age);
  };

  useEffect(() => {
    if (selectedDogAge) {
      const filteredDogs = Object.values(dogBreeds).filter(
        (breed) => breed.life_span === selectedDogAge
      );
      setFilteredDogBreeds(filteredDogs);
      console.log("Razas de perros filtradas:", filteredDogs);
      calculateDogAgeAverage(selectedDogAge);
    } else {
      setFilteredDogBreeds({});
      setDogAgeAverage(0);
    }
  }, [selectedDogAge, dogBreeds]);

  useEffect(() => {
    if (selectedCatAge) {
      const filteredCats = Object.values(catBreeds).filter(
        (breed) => breed.life_span === selectedCatAge
      );
      setFilteredCatBreeds(filteredCats);
      console.log("Razas de gatos filtradas:", filteredCats);
      calculateCatAgeAverage(selectedCatAge);
    } else {
      setFilteredCatBreeds({});
      setCatAgeAverage(0);
    }
  }, [selectedCatAge, catBreeds]);

  const renderDogTooltip = (breed) => (
    <Tooltip id={`dog-${breed.id}`}>
      Esperanza de vida promedio: {dogAgeAverage} años
    </Tooltip>
  );

  const renderCatTooltip = (breed) => (
    <Tooltip id={`cat-${breed.id}`}>
      Esperanza de vida promedio: {catAgeAverage} años
    </Tooltip>
  );

  return (
    <div className="text-center container">
      <h1 className="mb-4" style={{ fontFamily: "Verdana, sans-serif" }}>
        Longevidad
      </h1>
      <h6
        className="border border-2 p-3 mb-4 mx-auto bg-primary text-white"
        style={{ maxWidth: "500px" }}
      >
        En esta página se hace referencia a la esperanza de vida promedio de
        estos animales. Cabe mencionar que la longevidad de un perro o gato
        puede variar dependiendo de su raza, tamaño, cuidados, genética y otros
        factores. Algunas razas pueden vivir más tiempo, mientras que otras
        tienen una esperanza de vida más corta.
      </h6>

      <Row>
        <Col>
          <DropdownButton
            id="dogAgeDropdown"
            title={`Edades: Perros de ${selectedDogAge}`}
            className="mr-3"
          >
            {Object.values(dogBreeds)
              .map((breed) => breed.life_span)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((age) => (
                <Dropdown.Item
                  key={age}
                  onClick={() => handleDogAgeSelect(age)}
                >
                  {age}
                </Dropdown.Item>
              ))}
          </DropdownButton>
          {Object.keys(filteredDogBreeds).length > 0 && (
            <div>
              <h6 className="mt-3">
                Razas de perros con longevidad de {selectedDogAge}:
              </h6>
              <ListGroup>
                {Object.values(filteredDogBreeds).map((breed) => (
                  <OverlayTrigger
                    key={breed.id}
                    placement="bottom"
                    overlay={renderDogTooltip(breed)}
                  >
                    <ListGroup.Item>{breed.name}</ListGroup.Item>
                  </OverlayTrigger>
                ))}
              </ListGroup>
            </div>
          )}
        </Col>
        <Col>
          <DropdownButton
            id="catAgeDropdown"
            title={`Edades: Gatos de ${selectedCatAge}`}
            className="ml-3"
          >
            {Object.values(catBreeds)
              .map((breed) => breed.life_span)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((age) => (
                <Dropdown.Item
                  key={age}
                  onClick={() => handleCatAgeSelect(age)}
                >
                  {age}
                </Dropdown.Item>
              ))}
          </DropdownButton>
          {Object.keys(filteredCatBreeds).length > 0 && (
            <div>
              <h6 className="mt-3">
                Razas de gatos con longevidad de {selectedCatAge}
              </h6>
              <ListGroup>
                {Object.values(filteredCatBreeds).map((breed) => (
                  <OverlayTrigger
                    key={breed.id}
                    placement="bottom"
                    overlay={renderCatTooltip(breed)}
                  >
                    <ListGroup.Item>{breed.name}</ListGroup.Item>
                  </OverlayTrigger>
                ))}
              </ListGroup>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BreedLongevity;

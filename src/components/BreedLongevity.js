import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, DropdownButton, ListGroup, Row, Col } from "react-bootstrap";

const BreedLongevity = () => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [selectedDogAge, setSelectedDogAge] = useState("");
  const [selectedCatAge, setSelectedCatAge] = useState("");
  const [filteredDogBreeds, setFilteredDogBreeds] = useState([]);
  const [filteredCatBreeds, setFilteredCatBreeds] = useState([]);

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const response = await axios.get("https://api.thedogapi.com/v1/breeds");
        setDogBreeds(response.data);
        console.log("Razas de(Dogs)buscadas:", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCatBreeds = async () => {
      try {
        const response = await axios.get("https://api.thecatapi.com/v1/breeds");
        setCatBreeds(response.data);
        console.log("Razas de(Cats)buscadas:", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogBreeds();
    fetchCatBreeds();
  }, []);

  const handleDogAgeSelect = (age) => {
    setSelectedDogAge(age);
    console.log("Edad(Dog)seleccionada:", age);
  };

  const handleCatAgeSelect = (age) => {
    setSelectedCatAge(age);
    console.log("Edad(Cat)seleccionada:", age);
  };

  useEffect(() => {
    if (selectedDogAge) {
      const filteredDogs = dogBreeds.filter(
        (breed) => breed.life_span === selectedDogAge
      );
      setFilteredDogBreeds(filteredDogs);
      console.log("Razas(Dogs)filtradas:", filteredDogs);
    } else {
      setFilteredDogBreeds([]);
    }
  }, [selectedDogAge, dogBreeds]);

  useEffect(() => {
    if (selectedCatAge) {
      const filteredCats = catBreeds.filter(
        (breed) => breed.life_span === selectedCatAge
      );
      setFilteredCatBreeds(filteredCats);
      console.log("Razas(cat)filtradas:", filteredCats);
    } else {
      setFilteredCatBreeds([]);
    }
  }, [selectedCatAge, catBreeds]);

  return (
    <div className="text-center">
      <h1 style={{ fontFamily: "Verdana, sans-serif" }}>Longevidad</h1>
      <h6 className="border border-2 p-3 mx-4 bg-primary">
        "En esta página se hace referencia a la esperanza de vida promedio de
        estos animales. Cabe mencionar que la longevidad de un perro o gato
        puede variar dependiendo de su raza, tamaño, cuidados, genética y otros
        factores. Algunas razas pueden vivir más tiempo, mientras que otras
        tienen una esperanza de vida más corta."
      </h6>
      <Row>
        <Col>
          <DropdownButton
            id="dogAgeDropdown"
            title={`Edad: Perros de ${selectedDogAge}`}
            className="mr-3"
          >
            {dogBreeds
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
          {filteredDogBreeds.length > 0 && (
            <div>
              <h6>Razas de perros con longevidad de {selectedDogAge}:</h6>
              <ListGroup className="mx-4">
                {filteredDogBreeds.map((breed) => (
                  <ListGroup.Item key={breed.id}>{breed.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </Col>
        <Col>
          <DropdownButton
            id="catAgeDropdown"
            title={`Edad: Gatos de ${selectedCatAge}`}
          >
            {catBreeds
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
          {filteredCatBreeds.length > 0 && (
            <div>
              <h6>Razas de gatos con longevidad de {selectedCatAge}:</h6>
              <ListGroup className="mx-4">
                {filteredCatBreeds.map((breed) => (
                  <ListGroup.Item key={breed.id}>{breed.name}</ListGroup.Item>
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

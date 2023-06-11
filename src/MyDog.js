import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, ListGroup, Card, Spinner, Alert, Button, Accordion } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';

const MyDog = () => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickedBreed, setClickedBreed] = useState(null);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds');
        setDogBreeds(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error al cargar las razas de perros. Por favor, intenta nuevamente más tarde.');
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [selectedBreed, clickedBreed]);

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

  return (
    <div>
      <h1>Página de Perros</h1>
      <Row>
        <Col sm={4}>
          <h2>Razas de Perros</h2>
          <ListGroup>
            {dogBreeds.map((breed) => (
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
          <div style={{ position: 'sticky', top: '20px' }}>
            {loading ? (
              <Card style={{ width: '18rem' }} className="mb-4">
                <Card.Body>
                  <Card.Title>Cual es tu mascota?</Card.Title>
                  <Spinner animation="border" variant="primary" />
                </Card.Body>
              </Card>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (selectedBreed || clickedBreed) ? (
              <Card style={{ width: '18rem' }} className="mb-4">
                <Card.Img
                  variant="top"
                  src={(clickedBreed && clickedBreed.image.url) || (selectedBreed && selectedBreed.image.url)}
                  alt={(clickedBreed && clickedBreed.name) || (selectedBreed && selectedBreed.name)}
                />
                <Card.Body>
                  <Card.Title>{(clickedBreed && clickedBreed.name) || (selectedBreed && selectedBreed.name)}</Card.Title>
                  <Button onClick={() => setShowMenu(!showMenu)}>Info</Button>
                </Card.Body>
              </Card>
            ) : (
              <Card style={{ width: '300px' }} className="mb-4">
                <Card.Body>
                  <Card.Title>Cual es tu mascota?</Card.Title>
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>
        <Col sm={4}>
          {showMenu && (selectedBreed || clickedBreed) && (
            <div style={{ position: 'sticky', top: '20px' }}>
              <Card style={{ width: '18rem' }} className="mb-4">
                <Card.Body>
                  <Card.Title>Información adicional</Card.Title>
                  <ul>
                    <li>Peso: {(clickedBreed && clickedBreed.weight.metric) || (selectedBreed && selectedBreed.weight.metric)}</li>
                    <li>Altura: {(clickedBreed && clickedBreed.height.metric) || (selectedBreed && selectedBreed.height.metric)}</li>
                    <li>Esperanza de vida: {(clickedBreed && clickedBreed.life_span) || (selectedBreed && selectedBreed.life_span)}</li>
                  </ul>
                </Card.Body>
              </Card>
              {selectedBreed && (
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>País de origen</Card.Title>
                    <div style={{ height: '200px', width: '100%' }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyAySJrvPZPt-1NRmcgHfyCXeQQ2ycxtF20' }}
                        defaultCenter={{ lat: selectedBreed.origin.latitude, lng: selectedBreed.origin.longitude }}
                        defaultZoom={5}
                      >
                        <div
                          lat={selectedBreed.origin.latitude}
                          lng={selectedBreed.origin.longitude}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      </GoogleMapReact>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MyDog;

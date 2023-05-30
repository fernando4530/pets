import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';

const CatsInfo = () => {
  const [catData, setCatData] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breedDetails, setBreedDetails] = useState(null);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        console.log(response);
        setCatData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleBreedChange = async (event) => {
    const breedId = event.target.value;
    setSelectedBreed(breedId);

    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/breeds/${breedId}`);
      console.log(response.data);
      if (response.data) {
        setBreedDetails(response.data);
        setError(false);
        const imageResponse = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        console.log(imageResponse.data[0].url);
        if (imageResponse.data && imageResponse.data.length > 0) {
          setImageUrl(imageResponse.data[0].url);
        } else {
          setImageUrl('');
        }
      } else {
        setBreedDetails(null);
        setError(true);
        setImageUrl('');
      }
    } catch (error) {
      console.log(error);
      setBreedDetails(null);
      setError(true);
      setImageUrl('');
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const renderContent = () => {
    if (error) {
      return <p>Error al obtener los detalles de la raza. Inténtalo nuevamente.</p>;
    } else if (breedDetails) {
      return (
        <Card>
          <Card.Header>{breedDetails.name}</Card.Header>
          <Card.Body>
            <Row className="justify-content-center">
              <Col xs={12} md={6}>
                {imageUrl && (
                  <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <img
                      src={imageUrl}
                      alt={breedDetails.name}
                      style={{ width: '100%', height: 'auto', display: imageLoaded ? 'block' : 'none' }}
                      onLoad={handleImageLoad}
                    />
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <Tab.Container id="info-tabs" defaultActiveKey="description">
                  <Nav variant="tabs" justify="center">
                    <Nav.Item>
                      <Nav.Link eventKey="description">Descripción</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="temperament">Temperamento</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="origin">Origen</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="description">
                      {breedDetails.description ? breedDetails.description : 'Información no disponible'}
                    </Tab.Pane>
                    <Tab.Pane eventKey="temperament">
                      {breedDetails.temperament ? breedDetails.temperament : 'Información no disponible'}
                    </Tab.Pane>
                    <Tab.Pane eventKey="origin">
                      {breedDetails.origin ? breedDetails.origin : 'Información no disponible'}
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    }
    return null;
  };

  return (
    <Container className="mt-3">
      <h2 className="text-center">Info general de razas de Gatos</h2>

      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <label>Selecciona una raza:</label>
          <select className="form-select" value={selectedBreed} onChange={handleBreedChange}>
            <option value="">Selecciona una raza</option>
            {catData.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default CatsInfo;

import React, { useState, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { fetchDogBreeds } from "../utils/ApiCalls";

function SearchDogs() {
  // Configuración inicial del mapa
  const defaultProps = {
    center: {
      lat: -32.912915,
      lng: -68.855614,
    },
    zoom: 11,
  };
  // Estado para almacenar las razas de perros
  const [breeds, setBreeds] = useState([]);

  // para almacenar la raza seleccionada
  const [selectedBreed, setSelectedBreed] = useState("");

  // para controlar la visibilidad de las razas de perros
  const [showBreeds, setShowBreeds] = useState(false);

  // para almacenar la ubicación seleccionada
  const [selectedLocation, setSelectedLocation] = useState(null);

  // para almacenar las publicaciones
  const [publications, setPublications] = useState([]);

  // Referencia al objeto del mapa
  const mapRef = useRef(null);

  // Referencia al objeto del marcador
  const markerRef = useRef(null);

  useEffect(() => {
    // Definición de la función fetchData como una función asíncrona
    const fetchData = async () => {
      // Llama a la función fetchDogBreeds para obtener las razas de perros
      const data = await fetchDogBreeds();
      // Verifica si se obtuvieron datos válidos
      if (data) {
        // Actualiza el estado "breeds" con los datos obtenidos
        setBreeds(data);
        // Establece el estado "showBreeds" en true para mostrar las razas de perros
        setShowBreeds(true);
        console.log("Razas de perros:", data);
      }
    };

    // Llama a la función fetchData al cargar el componente
    fetchData();
  }, [fetchDogBreeds]);

  const handleBreedSelect = (event) => {
    // Obtiene el valor seleccionado del elemento select de razas de perros
    const selectedBreed = event.target.value;

    // Establece la raza seleccionada en el estado selectedBreed
    setSelectedBreed(selectedBreed);
  };
  // manejo de publicación
  const handlePublish = () => {
    // Verifica si se a seleccionado una raza y una ubicación
    if (selectedBreed && selectedLocation) {
      // Crea un objeto de publicación con la raza y la ubicación seleccionadas
      const publication = {
        breed: selectedBreed,
        location: selectedLocation,
      };

      // Agrega la nueva publicación al estado de publicaciones
      setPublications([...publications, publication]);

      // Limpia los valores seleccionados
      setSelectedBreed("");
      setSelectedLocation(null);
      console.log("Nueva publicación:", publication);
    }
  };
  //parametro que contiene la informacion del evento click
  const handleSelectPublication = (mapsMouseEvent) => {
    // Obtiene las coordenadas de la posición seleccionada
    const clickedPosition = {
      lat: mapsMouseEvent.latLng.lat(),
      lng: mapsMouseEvent.latLng.lng(),
    };

    if (markerRef.current && mapRef.current) {
      // Mueve el marcador a la posición seleccionada
      markerRef.current.setPosition(clickedPosition);

      // Establece la ubicación seleccionada en el estado
      setSelectedLocation(clickedPosition);
      console.log("Ubicación seleccionada:", clickedPosition);
    }
  };

  const handleGoToLocation = (event) => {
    // Parsea la ubicación seleccionada desde el valor del evento
    const selectedLocation = event.target.value;

    // Verifica si se ha seleccionado una ubicación válida
    if (selectedLocation !== "") {
      // Realiza el JSON.parse solo si el valor no está vacío
      const parsedLocation = JSON.parse(selectedLocation);

      // Mueve el marcador a la ubicación seleccionada
      markerRef.current.setPosition(parsedLocation);

      // Centra el mapa en la ubicación seleccionada
      mapRef.current.panTo(parsedLocation);

      // Muestra información sobre la ubicación seleccionada
      console.log("Ir a la ubicación:", parsedLocation);
    }
  };
  const maprender = (map, maps) => {
    // Evento que se ejecuta cuando se carga la API de Google Maps
    mapRef.current = map; // Guardar referencia al objeto del mapa
    // Crear un marcador en la posición inicial y hacerlo arrastrable
    markerRef.current = new maps.Marker({
      position: { lat: -32.912915, lng: -68.855614 },
      map,
      draggable: true,
      title: "ENCONTRADO EN ",
    });

    // Evento que se ejecuta al arrastrar el marcador
    markerRef.current.addListener("drag", () => {
      console.log(
        "Posición del marcador:",
        JSON.stringify(markerRef.current.getPosition())
      );
    });

    // Evento que se ejecuta al hacer clic en el mapa
    map.addListener("click", (mapsMouseEvent) => {
      handleSelectPublication(mapsMouseEvent);
    });
  };

  return (
    <div
      style={{ height: "calc(100vh - 60px)", width: "100%" }}
      className="text-center"
    >
      <div
        style={{ position: "absolute", top: "60px", left: "30px", zIndex: 1 }}
      >
        <div className="bg-primary rounded p-2">
          <h2 style={{ fontStyle: "italic" }}>¿Perro Perdido?</h2>
        </div>
        <h5 style={{ textDecoration: "underline" }}>Publicados</h5>
        <select
          style={{ width: "400px" }}
          onChange={handleGoToLocation}
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option value="" className="btn btn-outline-primary">
            Seleccione una publicación
          </option>
          {/* Mapea las publicaciones y crea opciones en el select */}
          {publications.map((publication, index) => (
            <option key={index} value={JSON.stringify(publication.location)}>
              Raza: {publication.breed}, Ubicación:{" "}
              {JSON.stringify(publication.location)}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "60px",
          zIndex: 1,
        }}
      >
        <div className="bg-primary rounded p-2">
          <h2 style={{ fontStyle: "italic" }}>¿Perro Encontrado?</h2>
        </div>
        <h5 style={{ textDecoration: "underline" }}>Publicar</h5>
        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            value={selectedBreed}
            onChange={handleBreedSelect}
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
          >
            <option value="" className="btn btn-outline-primary">
              Seleccione una raza
            </option>
            {/* Mapea las razas de perros y crea opciones en el select */}
            {breeds.map((breed) => (
              <option
                key={breed.id}
                value={breed.name}
                className="btn btn-outline-primary"
              >
                {breed.name}
              </option>
            ))}
          </select>

          <button onClick={handlePublish} className="btn btn-outline-primary">
            Publicar
          </button>
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCf15IY-ePezWQeCIhR9KuKWlMbtmA3bR4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => maprender(map, maps)}
      />
    </div>
  );
}

export default SearchDogs;

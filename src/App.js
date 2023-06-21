import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Routes, Route, NavLink } from "react-router-dom";
import CatsBreeds from "./components/CatsBreeds";
import DogsBreeds from "./components/DogsBreeds";
import BreedLongevity from "./components/BreedLongevity";
import WeightComparison from "./components/WeightComparison";
import CatsInfo from "./components/CatsInfo";
import MyDog from "./components/MyDog";
import SearchDogs from "./components/SearchDogs";

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <NavDropdown title="GATOS" id="basic-nav-dropdown">
              <NavDropdown.Item href="/catsbreeds">Razas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="PERROS" id="basic-nav-dropdown">
              <NavDropdown.Item href="/dogsbreeds">Razas</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/breedlongevity">
              LONGEVIDAD
            </Nav.Link>
            <a
              className="nav-link active"
              aria-current="page"
              href="/comparisionweight"
            >
              Comparar Peso
            </a>
            <Nav.Link as={NavLink} to="/catsinfo">
              Info Gatuna
            </Nav.Link>
            <Nav.Link as={NavLink} to="/mydog">
              Mi Perro
            </Nav.Link>
            <Nav.Link as={NavLink} to="/searchdogs">
            Búsqueda y Publicación 
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/catsbreeds" element={<CatsBreeds />} />
        <Route path="/dogsbreeds" element={<DogsBreeds />} />
        <Route path="/breedlongevity" element={<BreedLongevity />} />
        <Route path="/comparisionweight" element={<WeightComparison />} />
        <Route path="/catsinfo" element={<CatsInfo />} />
        <Route path="/mydog" element={<MyDog />} />
        <Route path="/searchdogs" element={<SearchDogs />} />
      </Routes>
    </div>
  );
}

export default App;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Routes, Route } from "react-router-dom";
import CatsBreeds from "./Components/CatsBreeds";

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
              <NavDropdown.Item href="/breeds">Razas</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/catsbreeds" element={<CatsBreeds />} />
      </Routes>
    </div>
  );
}

export default App;

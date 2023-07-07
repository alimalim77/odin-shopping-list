import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Navbar } from "./components/NavBar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Todo from "./pages/Todo";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;

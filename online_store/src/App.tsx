import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Store } from "./Store"
import { Nav } from "./components/Nav"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {

  return (
    <ShoppingCartProvider>
      <Nav/>
      <Container>
        <Store />
      </Container>
    </ShoppingCartProvider>
  )
}

export default App

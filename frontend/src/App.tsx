import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/pedidos' element={<Orders />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

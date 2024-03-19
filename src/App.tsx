import { useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";
import Home from "@components/Home/Home";

export default function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider className="app" navigate={navigate}>
      <Navbar id="navbar" />
      <Home id="content" />
      <Footer id="footer" />
    </NextUIProvider>
  );
}

import { Outlet, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";

export default function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider className="app" navigate={navigate}>
      <Navbar id="navbar" />
      {/* contents of the root route */}
      <Outlet />
      <Footer id="footer" />
    </NextUIProvider>
  );
}

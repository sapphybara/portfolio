import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";
import { useNavigate, useRouteError } from "react-router-dom";
import { Link, NextUIProvider } from "@nextui-org/react";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <NextUIProvider id="error-page" navigate={useNavigate()}>
      <Navbar />
      <div className="error-message">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {(error as { statusText?: string }).statusText ||
              (error as Error).message}
          </i>
        </p>
        <p>
          Please click <Link href="/">here</Link> to return to the home page.
        </p>
      </div>
      <Footer />
    </NextUIProvider>
  );
}

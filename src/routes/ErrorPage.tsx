import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";
import { useRouteError } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
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
          Please click <a href="/">here</a> to return to the home page.
        </p>
      </div>
      <Footer />
    </div>
  );
}

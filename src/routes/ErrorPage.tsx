import Navbar from "@components/Navbar/Navbar";
import MainContent from "@components/MainContent/MainContent";
import Footer from "@components/Footer/Footer";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Navbar />
      <MainContent>
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
      </MainContent>
      <Footer />
    </div>
  );
}

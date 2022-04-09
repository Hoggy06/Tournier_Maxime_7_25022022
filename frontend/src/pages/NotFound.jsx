//Importations
import { Fragment } from "react";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Columns, Message } from "react-bulma-components";
export default function PageNotFound() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  //Corps de la page 404
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Error 404</title>
        </Helmet>
      </HelmetProvider>
      <Nav userConnected={userConnected} />
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 8, offset: 2 }}
        desktop={{ size: 6, offset: 3 }}
      >
        <Message color="danger">
          <Message.Header>
            <span>Erreur</span>
          </Message.Header>
          <Message.Body>Page non trouvée</Message.Body>
        </Message>
      </Columns.Column>
      <Footer />
    </Fragment>
  );
}

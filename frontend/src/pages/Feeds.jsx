//Importations
import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Posts from "../components/Post/Feeds";
import { Columns, Message } from "react-bulma-components";
//Corps de la pge Feeds
export default function Feeds() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Feeds</title>
        </Helmet>
      </HelmetProvider>
      <Nav userConnected={userConnected} />
      {userConnected ? (
        <Fragment>
          <Columns.Column
            mobile={{ size: 12 }}
            tablet={{ size: 8, offset: 2 }}
            desktop={{ size: 6, offset: 3 }}
          >
            <Posts userConnected={userConnected} token={token} />
          </Columns.Column>
        </Fragment>
      ) : (
        <Columns.Column
          mobile={{ size: 12 }}
          tablet={{ size: 8, offset: 2 }}
          desktop={{ size: 6, offset: 3 }}
        >
          <Message color="danger">
            <Message.Header>
              <span>Erreur</span>
            </Message.Header>
            <Message.Body>
              Vous devez être connecter pour accéder à ce contenu
            </Message.Body>
          </Message>
        </Columns.Column>
      )}
      <Footer />
    </Fragment>
  );
}

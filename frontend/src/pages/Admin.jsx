//Importations
import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Columns, Message } from "react-bulma-components";
import Admin from "../components/Admin/Admin";

export default function AdminPage() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  //Corps de la page Admin
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Feeds</title>
        </Helmet>
      </HelmetProvider>
      <Nav userConnected={userConnected} />
      {userConnected && userConnected.isAdmin === true ? (
        <Fragment>
          <Columns.Column
            mobile={{ size: 12 }}
            tablet={{ size: 8, offset: 2 }}
            desktop={{ size: 6, offset: 3 }}
          >
            <Admin token={token} />
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
            <Message.Body>Accès non autorisé</Message.Body>
          </Message>
        </Columns.Column>
      )}
      <Footer />
    </Fragment>
  );
}

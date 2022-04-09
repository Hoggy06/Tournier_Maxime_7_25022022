//Importations
import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Columns } from "react-bulma-components";
import User from "../components/Profil/User.jsx";
export default function Profil() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  //Corps de la page Profil
  const { id } = useParams();
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Profil #{id}</title>
        </Helmet>
      </HelmetProvider>
      <Nav userConnected={userConnected} />
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 8, offset: 2 }}
        desktop={{ size: 6, offset: 3 }}
      >
        <User userConnected={userConnected} token={token} />
      </Columns.Column>

      <Footer />
    </Fragment>
  );
}

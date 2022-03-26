import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Columns } from "react-bulma-components";
import User from "../components/Profil/User.jsx";
export default function Publication() {
  const { id } = useParams();
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Profil #{id}</title>
        </Helmet>
      </HelmetProvider>
      <Nav />
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 12 }}
        desktop={{ size: 4, offset: 4 }}
      >
        <User />
      </Columns.Column>

      <Footer />
    </Fragment>
  );
}

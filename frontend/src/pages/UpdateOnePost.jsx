//Importations
import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import UpdatePost from "../components/Post/UpdatePost";
import { useParams } from "react-router-dom";
import { Columns } from "react-bulma-components";
export default function OnePost() {
  //Corps de la page de l'édition des posts
  const { id } = useParams();
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Edition du Post #{id}</title>
        </Helmet>
      </HelmetProvider>
      <Nav />
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 8, offset: 2 }}
        desktop={{ size: 6, offset: 3 }}
      >
        <UpdatePost />
      </Columns.Column>

      <Footer />
    </Fragment>
  );
}

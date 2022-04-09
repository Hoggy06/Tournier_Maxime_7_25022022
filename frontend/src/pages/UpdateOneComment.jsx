//Importations
import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import UpdateComment from "../components/Comments/UpdateComment";
import { useParams } from "react-router-dom";
import { Columns } from "react-bulma-components";

export default function OneComment() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  //Corps de la page de l'édition des commentaires
  const { id, idPost } = useParams();
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>
            Edition du Commentaire #{id} du Post #{idPost}
          </title>
        </Helmet>
      </HelmetProvider>
      <Nav userConnected={userConnected} />
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 8, offset: 2 }}
        desktop={{ size: 6, offset: 3 }}
      >
        <UpdateComment userConnected={userConnected} token={token} />
      </Columns.Column>

      <Footer />
    </Fragment>
  );
}

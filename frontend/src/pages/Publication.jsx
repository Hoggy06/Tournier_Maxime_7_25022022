import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import OnePost from "../components/Post/OnePost";
import Comments from "../components/Comments/Comments";
import { useParams } from "react-router-dom";
import { Columns } from "react-bulma-components";
export default function Publication() {
  const { id } = useParams();
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Post #{id}</title>
        </Helmet>
      </HelmetProvider>
      <Nav />
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 8, offset: 2 }}
        desktop={{ size: 6, offset: 3 }}
      >
        <OnePost />
        <Comments />
      </Columns.Column>

      <Footer />
    </Fragment>
  );
}

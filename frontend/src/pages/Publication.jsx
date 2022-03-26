import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import OnePost from "../components/Post/OnePost";
import Comments from "../components/Comments/Comments";
import CreateComment from "../components/Comments/CreateComment";
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
        tablet={{ size: 12 }}
        desktop={{ size: 4, offset: 4 }}
      >
        <OnePost />
        <CreateComment />
        <Comments />
      </Columns.Column>

      <Footer />
    </Fragment>
  );
}

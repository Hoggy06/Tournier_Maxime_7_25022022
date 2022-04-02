import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import TabsFunction from "../components/Tabs/TabsFunction";
import { Columns, Image } from "react-bulma-components";
import Logo from "../assets/images/icon-above-font.svg";

export default function Home() {
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>
      <Nav />
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 8, offset: 2 }}
        desktop={{ size: 4, offset: 4 }}
      >
        <Image size={"16by9"} src={Logo} alt="Groupomania" />
        <TabsFunction />
      </Columns.Column>
      <Footer />
    </Fragment>
  );
}

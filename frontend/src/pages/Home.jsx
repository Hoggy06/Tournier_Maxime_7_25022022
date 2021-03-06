//Importations
import "../styles/App.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import TabsFunction from "../components/Tabs/TabsFunction";
import { Columns, Image } from "react-bulma-components";
import Logo from "../assets/images/icon-above-font.svg";
//Corps de la page Home
export default function Home() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>
      <Nav userConnected={userConnected} />
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 8, offset: 2 }}
        desktop={{ size: 4, offset: 4 }}
      >
        <Image size={"3by1"} src={Logo} alt="Groupomania" />
        <TabsFunction />
      </Columns.Column>
      <Footer />
    </Fragment>
  );
}

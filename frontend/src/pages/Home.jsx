import "../styles/App.css";
import Nav from "../components/Base/Nav";
import { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import TabsFunction from "../components/Tabs/TabsFunction";

export default function Home() {
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>
      <Nav />
      <main className="column is-full-mobile is-half-tablet is-4-desktop is-offset-4-desktop is-offset-3-tablet">
        <TabsFunction />
      </main>
    </Fragment>
  );
}

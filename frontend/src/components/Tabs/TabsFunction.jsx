import { Fragment, useState } from "react";
import { Tabs } from "react-bulma-components";
import LoginForm from "../Auth/LoginForm";
import SignUpForm from "../Auth/SignUpForm";
export default function TabsFunction() {
  const data = [
    { id: "1", tabTitle: "Connexion", tabContent: <LoginForm /> },
    { id: "2", tabTitle: "Inscription", tabContent: <SignUpForm /> },
  ];

  const Tab = () => {
    const [visibleTab, setVisibleTab] = useState(data[0].id);

    const listTitles = data.map((item, index) =>
      visibleTab === item.id ? (
        <Tabs.Tab key={index} onClick={() => setVisibleTab(item.id)} active>
          {item.tabTitle}
        </Tabs.Tab>
      ) : (
        <Tabs.Tab key={index} onClick={() => setVisibleTab(item.id)}>
          {item.tabTitle}
        </Tabs.Tab>
      )
    );

    const listContent = data.map((item, index) => (
      <div
        key={index}
        style={visibleTab === item.id ? {} : { display: "none" }}
      >
        {item.tabContent}
      </div>
    ));

    return (
      <Fragment>
        <Tabs align="center" className="is-boxed">
          {listTitles}
        </Tabs>
        <Fragment>{listContent}</Fragment>
      </Fragment>
    );
  };
  return <Tab />;
}

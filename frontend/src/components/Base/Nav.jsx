import { Fragment, useState } from "react";
import { Button, Navbar } from "react-bulma-components";
import Logo from "../../assets/images/icon-left-font-monochrome-white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const [burger, setBurger] = useState(false);

  const logout = () => {
    localStorage.clear();
  };

  const toggleClass = () => {
    setBurger(!burger);
  };

  return (
    <Fragment>
      <Navbar fixed="top" color="dark">
        <Navbar.Brand>
          {userConnected ? (
            <Navbar.Item href="/feeds">
              <img src={Logo} alt="Logo Groupomania" />
            </Navbar.Item>
          ) : (
            <Navbar.Item href="/">
              <img src={Logo} alt="Logo Groupomania" />
            </Navbar.Item>
          )}
          <Navbar.Burger
            onClick={toggleClass}
            className={burger ? `is-active` : null}
          />
        </Navbar.Brand>
        {userConnected ? (
          <Navbar.Menu className={burger ? `is-active` : null}>
            <Navbar.Container align="right">
              <Navbar.Item href="#" hoverable>
                <Navbar.Link>
                  <FontAwesomeIcon icon={faUser} />
                </Navbar.Link>
                <Navbar.Dropdown>
                  <Navbar.Item href={`/user/${userConnected.userId}`}>
                    Mon profil
                  </Navbar.Item>
                  <Navbar.Divider />
                  <Navbar.Item href="/feeds">Fil d'actualité</Navbar.Item>
                  {userConnected.isAdmin === true ? (
                    <Fragment>
                      <Navbar.Divider />
                      <Navbar.Item href={`/adminPanel/`}>Admin</Navbar.Item>
                    </Fragment>
                  ) : null}
                </Navbar.Dropdown>
              </Navbar.Item>
              <Navbar.Item href="/" onClick={logout}>
                <Button outlined color="danger">
                  Se déconnecter
                </Button>
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        ) : (
          <Navbar.Menu className={burger ? `is-active` : null}>
            <Navbar.Container align="right">
              <Navbar.Item href="/">
                <Button outlined color="link">
                  Se connecter
                </Button>
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        )}
      </Navbar>
    </Fragment>
  );
}

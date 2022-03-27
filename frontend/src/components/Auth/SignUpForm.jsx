import { useState } from "react";

import { Form, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
export default function SignUpForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const regexFirstnameAndLastname = /^[a-zA-Z\s-]{3,35}$/;
  const regexEmail = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/;
  const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const onFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };
  const onLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { firstname, lastname, email, password };
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`http://localhost:3307/api/auth/signup`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          setSuccess(res.message);
        } else {
          setError(res.error);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form.Field>
        <Form.Control>
          <Form.Label>
            <FontAwesomeIcon icon={faUser} />
            Nom
          </Form.Label>
          <Form.Input
            className="input"
            type="text"
            placeholder="Votre nom"
            value={lastname}
            onChange={onLastnameChange}
            name="lastname"
            required
          />
          {regexFirstnameAndLastname.test(lastname) === false ? (
            <Form.Help
              style={{
                display: lastname ? null : "none",
              }}
              align="center"
              textSize="6"
              color="danger"
            >
              Merci de vérifier votre nom, 3 caractères minimum requis avec des
              lettres uniquement
            </Form.Help>
          ) : (
            <Form.Help align="center" textSize="6" color="success">
              <FontAwesomeIcon icon={faCircleCheck} />
            </Form.Help>
          )}
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Form.Label>
            <FontAwesomeIcon icon={faUser} />
            Prénom
          </Form.Label>
          <Form.Input
            className="input"
            type="text"
            placeholder="Votre prénom"
            value={firstname}
            onChange={onFirstnameChange}
            name="firstname"
            required
          />
          {regexFirstnameAndLastname.test(firstname) === false ? (
            <Form.Help
              style={{
                display: firstname ? null : "none",
              }}
              align="center"
              textSize="6"
              color="danger"
            >
              Merci de vérifier votre prénom, 3 caractères minimum requis avec
              des lettres uniquement
            </Form.Help>
          ) : (
            <Form.Help align="center" textSize="6" color="success">
              <FontAwesomeIcon icon={faCircleCheck} />
            </Form.Help>
          )}
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Form.Label>
            <FontAwesomeIcon icon={faEnvelope} />
            Email
          </Form.Label>
          <Form.Input
            className="input"
            type="text"
            placeholder="Votre adresse mail"
            value={email}
            onChange={onEmailChange}
            name="email"
            required
          />
          {regexEmail.test(email) === false ? (
            <Form.Help
              style={{
                display: email ? null : "none",
              }}
              align="center"
              textSize="6"
              color="danger"
            >
              Email invalide
            </Form.Help>
          ) : (
            <Form.Help align="center" textSize="6" color="success">
              <FontAwesomeIcon icon={faCircleCheck} />
            </Form.Help>
          )}
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Form.Label>
            <FontAwesomeIcon icon={faLock} />
            Mot de passe
          </Form.Label>
          <Form.Input
            className="input"
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={onPasswordChange}
            name="password"
            required
          />
          {regexPassword.test(password) === false ? (
            <Form.Help
              style={{
                display: lastname ? null : "none",
              }}
              align="center"
              textSize="6"
              color="danger"
            >
              Le mot de passe doit contenir au moins : 8 caractères minimum, une
              majuscule, une minuscule, un chiffre, et aucun espace
            </Form.Help>
          ) : (
            <Form.Help align="center" textSize="6" color="success">
              <FontAwesomeIcon icon={faCircleCheck} />
            </Form.Help>
          )}
        </Form.Control>
      </Form.Field>
      <Form.Field kind="group" align="center">
        <Form.Control>
          <Button type="submit" color="link">
            Envoyer
          </Button>
        </Form.Control>
      </Form.Field>
      <Form.Help align="center" textSize="6" color="success">
        {success ? success : error}
      </Form.Help>
    </form>
  );
}

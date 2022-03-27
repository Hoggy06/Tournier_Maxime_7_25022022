import { Form, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const errorMessage = () => {
    return (
      <div
        style={{
          display: error ? null : "none",
        }}
      >
        <Form.Help align="center" textSize="6" color="danger">
          {error}
        </Form.Help>
      </div>
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`http://localhost:3307/api/auth/login`, options)
      .then((response) => response.json())
      .then((res) => {
        localStorage.setItem("userConnected", JSON.stringify(res));
        if (res.error) {
          setError(res.error);
        } else {
          navigate("/feeds");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <form onSubmit={handleSubmit}>
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
        </Form.Control>
      </Form.Field>
      <Form.Field kind="group" align="center">
        <Form.Control>
          <Button color="link">Envoyer</Button>
        </Form.Control>
      </Form.Field>
      {errorMessage()}
    </form>
  );
}

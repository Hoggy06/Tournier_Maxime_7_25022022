import { Media, Form, Button, Message } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faUser,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useState } from "react";
export default function UpdateAccount({ token, port, setData, id }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const regexFirstnameAndLastname = /^[a-zA-Z\s-]{3,35}$/;
  const [image, setImage] = useState("");
  const onImageChange = (e) => setImage(e.target.files[0]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteMessage, setDeleteMessage] = useState(false);

  //Call to action suppression du message d'alerte
  const deleteAlertMessage = () => {
    setDeleteMessage(!deleteMessage);
  };
  //Modification des states
  const onFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };
  const onLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  //Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    //Verifications des champs
    if (firstname !== "") {
      formData.append("firstname", firstname);
    }
    if (lastname !== "") {
      formData.append("lastname", lastname);
    }
    if (image !== "") {
      formData.append("image", image);
    }
    if (image === "" && firstname === "" && lastname === "") {
      return setError("Veuillez renseigner au moins un champs");
    }
    //Modifcation du profil
    const options = {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    };

    fetch(`http://localhost:${port}/api/users/edit/${id}`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(res.message);
        }
        fetch(`http://localhost:${port}/api/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setDeleteMessage(!deleteMessage);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    setFirstname("");
    setLastname("");
    setImage("");
  };
  return (
    <Fragment>
      {success && deleteMessage ? (
        <Message color="success">
          <Message.Header>
            <span>Succès</span>
            <Button onClick={deleteAlertMessage} remove />
          </Message.Header>
          <Message.Body>{success}</Message.Body>
        </Message>
      ) : null}
      {error && deleteMessage ? (
        <Message color="danger">
          <Message.Header>
            <span>Erreur</span>
            <Button onClick={deleteAlertMessage} remove />
          </Message.Header>
          <Message.Body>{error}</Message.Body>
        </Message>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Media renderAs="article">
          <Media.Item align="center">
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
                    Merci de vérifier votre nom, 3 caractères minimum requis
                    avec des lettres uniquement
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
                    Merci de vérifier votre prénom, 3 caractères minimum requis
                    avec des lettres uniquement
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
                <Form.InputFile
                  size="small"
                  color="link"
                  type="file"
                  onChange={onImageChange}
                  name="image"
                  filename={image.name}
                  icon={<FontAwesomeIcon icon={faUpload} />}
                  label="Changer votre photo"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button
                  color="link"
                  disabled={!firstname && !lastname && !image}
                >
                  Mettre à jour
                </Button>
              </Form.Control>
            </Form.Field>
          </Media.Item>
        </Media>
      </form>
    </Fragment>
  );
}

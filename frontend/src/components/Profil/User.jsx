import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  Media,
  Image,
  Box,
  Content,
  Tag,
  Form,
  Button,
} from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faEnvelope,
  faUser,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Comments() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const regexFirstnameAndLastname = /^[a-zA-Z\s-]{3,35}$/;
  const regexEmail = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/;
  const [image, setImage] = useState("");
  const onImageChange = (e) => setImage(e.target.files[0]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const onFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };
  const onLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    data.append("image", image);
    const options = {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: data,
    };

    fetch(`http://localhost:3307/api/users/edit/${id}`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(res.message);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://localhost:3307/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [id, token, data]);

  return (
    <Fragment>
      <Box>
        <Media>
          <Media.Item renderAs="article" align="left">
            {data.user && <Image size={64} alt="64x64" src={data.user.image} />}
          </Media.Item>
          <Media.Item>
            <Content>
              <p>
                {data.user && (
                  <b>
                    {data.user.firstname} {data.user.lastname}{" "}
                  </b>
                )}
              </p>
              <p>
                {data.user && data.user.isAdmin === true ? (
                  <Tag renderAs="span" rounded color="danger">
                    Compte administrateur
                  </Tag>
                ) : (
                  <Tag renderAs="span" rounded color="link">
                    Membre
                  </Tag>
                )}
              </p>
              <p>
                Inscrit depuis le{" "}
                {data.user && moment(data.user.created).format("DD/MM/YYYY")}
              </p>
            </Content>
          </Media.Item>
        </Media>
      </Box>
      {data.user && userConnected.userId === data.user.id ? (
        <Box>
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
                        Merci de vérifier votre prénom, 3 caractères minimum
                        requis avec des lettres uniquement
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
                    <Form.InputFile
                      color="link"
                      type="file"
                      onChange={onImageChange}
                      name="image"
                      filename={image.name}
                      icon={<FontAwesomeIcon icon={faUpload} />}
                      label="Choisir un fichier"
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Button color="link" disabled={!userConnected}>
                      Mettre à jour
                    </Button>
                  </Form.Control>
                </Form.Field>
              </Media.Item>
            </Media>
            <Form.Help align="center" textSize="6" color="success">
              {success ? success : error}
            </Form.Help>
          </form>
        </Box>
      ) : null}
    </Fragment>
  );
}

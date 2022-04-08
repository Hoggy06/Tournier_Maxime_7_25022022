//Importations
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
  Level,
  Heading,
  Message,
} from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faUser,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { port } from "../../port";
import DeleteAccount from "./DeleteAccount";
export default function Comments() {
  //Localstorage + states
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [data, setData] = useState({});
  const { id } = useParams();
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

  //Récupération des data du membre
  useEffect(() => {
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
      })
      .catch((error) => console.log(error));
  }, [id, token, data, userConnected]);
  //Affichage des infos du membre
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
              <Level breakpoint="mobile">
                <Level.Item>
                  <Heading size={5} subtitle>
                    {data.user && data.user.Posts.length} Posts
                  </Heading>
                </Level.Item>
                <Level.Item>
                  <Heading size={5} subtitle>
                    {data.user && data.user.Comments.length} Commentaires
                  </Heading>
                </Level.Item>
              </Level>
            </Content>
          </Media.Item>
        </Media>
      </Box>
      {/**Gestion des erreurs */}
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
      {/**Formulaire d'édition */}
      {data.user && userConnected.userId === data.user.id ? (
        <Box>
          <Heading size={6}>Edition du profil</Heading>
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
          <DeleteAccount token={token} port={port} setData={setData} id={id} />
        </Box>
      ) : null}
    </Fragment>
  );
}

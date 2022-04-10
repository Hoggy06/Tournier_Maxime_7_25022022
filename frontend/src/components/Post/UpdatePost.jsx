//Importations
import { useState, Fragment, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Button,
  Media,
  Box,
  Content,
  Image,
  Heading,
  Message,
} from "react-bulma-components";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { port } from "../../port";
import DeleteImage from "./DeleteImage";

export default function UpdatePost({ userConnected, token, id }) {
  //States + localstorage

  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  const onImageChange = (e) => setImage(e.target.files[0]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [deleteMessage, setDeleteMessage] = useState(false);

  const deleteAlertMessage = () => {
    setDeleteMessage(!deleteMessage);
  };
  //Récupération du post

  useEffect(() => {
    fetch(`http://localhost:${port}/api/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        if (res.error) {
          setError(res.error);
        }
      })
      .catch((error) => console.log(error));
  }, [id, token, userConnected, navigate]);

  //Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    //Vérification des champs
    if (message !== "") {
      formData.append("message", message);
    }
    if (image !== "") {
      formData.append("image", image);
    }
    const options = {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    };
    //Modification du post
    fetch(`http://localhost:${port}/api/posts/${id}`, options)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        navigate(`/editPost/${id}`);
        setDeleteMessage(!deleteMessage);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(res.message);
        }
      })
      .catch((error) => console.log(error));
  };

  //Affichage du post à éditer

  return (
    <Fragment>
      {userConnected.userId === data.userId ? (
        <Fragment>
          {success && deleteMessage ? (
            <Message color="success">
              <Message.Header>
                <span>Succès</span>
                <Button onClick={deleteAlertMessage} remove />
              </Message.Header>
              <Message.Body>
                {success}
                <p>
                  Vous pouvez consulter votre publication
                  <Link to={`/post/${id}`}>
                    <b> ici</b>
                  </Link>
                </p>
              </Message.Body>
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
          ) : null}{" "}
          <Box>
            <Heading size={6}>Edition du post</Heading>
            <Media>
              <Media.Item renderAs="article" align="left">
                {data.User && (
                  <Image size={64} alt="64x64" src={data.User.image} />
                )}
              </Media.Item>
              <Media.Item>
                <Content className="pJustify">
                  {data.User && <b>{data.User.firstname}</b>}{" "}
                  <small>
                    - {moment(data.created).startOf("YYYYMMDD").fromNow()}
                  </small>
                  <br />
                  {data.message}
                  <br />
                  {data.image ? (
                    <img src={data.image} alt={`${data.image}`} />
                  ) : null}
                </Content>
              </Media.Item>
            </Media>
          </Box>
          <Box>
            {/**Formulaire pour l'édition */}
            <form onSubmit={handleSubmit}>
              <Media renderAs="article">
                <Media.Item align="center">
                  <Form.Field>
                    <Form.Control>
                      <Form.Textarea
                        className="textarea"
                        size="medium"
                        type="text"
                        placeholder={`Que voulez vous dire ?`}
                        defaultValue={data.message}
                        onChange={onMessageChange}
                        name="message"
                        required
                        disabled={!userConnected}
                      />
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
                        label="Modifier l'image"
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Control>
                      <Button
                        color="link"
                        disabled={!userConnected || !message}
                      >
                        Editer
                      </Button>
                    </Form.Control>
                  </Form.Field>
                </Media.Item>
              </Media>
            </form>
            <DeleteImage
              token={token}
              port={port}
              setData={setData}
              id={id}
              navigate={navigate}
              setError={setError}
              setSuccess={setSuccess}
              image={image}
              data={data}
              setDeleteMessage={setDeleteMessage}
              deleteMessage={deleteMessage}
            />
          </Box>{" "}
        </Fragment>
      ) : (
        navigate("/403")
      )}
    </Fragment>
  );
}

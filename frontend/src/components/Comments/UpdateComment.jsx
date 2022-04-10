//Importations
import { Fragment, useEffect, useState } from "react";
import {
  Form,
  Button,
  Media,
  Box,
  Image,
  Content,
  Heading,
  Message,
} from "react-bulma-components";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { port } from "../../port";
import { HashLink } from "react-router-hash-link";

export default function UpdateComment({ userConnected, token, id, idPost }) {
  //States + localstorage
  const [message, setMessage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [deleteMessage, setDeleteMessage] = useState(false);

  const deleteAlertMessage = () => {
    setDeleteMessage(!deleteMessage);
  };
  //Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { message };
    const options = {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:${port}/api/posts/${idPost}/comment/${id}`, options)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        navigate(`/editComment/${id}/post/${idPost}`);
        setDeleteMessage(!deleteMessage);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(res.message);
        }
      })
      .catch((error) => console.log(error));
  };
  //Récupération du commentaire à éditer
  useEffect(() => {
    fetch(`http://localhost:${port}/api/posts/${idPost}/comment/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((res) => setData(res))
      .catch((error) => console.log(error));
  }, [idPost, id, token, userConnected]);
  //Affichage du commentaire + formulaire
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
                  <HashLink to={`/post/${idPost}#${id}`}>
                    <b> ici</b>
                  </HashLink>
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
          ) : null}
          <Box>
            <Heading size={6}>Edition du commentaire</Heading>
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
                </Content>
              </Media.Item>
            </Media>
          </Box>
          <Box>
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
            <Form.Help align="center" textSize="6" color="danger">
              {error}
            </Form.Help>
          </Box>
        </Fragment>
      ) : (
        navigate(`/403`)
      )}
    </Fragment>
  );
}

import { Fragment, useEffect, useState } from "react";
import {
  Form,
  Button,
  Media,
  Box,
  Image,
  Content,
  Message,
  Heading,
} from "react-bulma-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { port } from "../../port";

export default function UpdateComment() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [message, setMessage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  const [error, setError] = useState("");
  const { id, idPost } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { message };
    const options = {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`http://localhost:${port}/api/posts/${idPost}/comment/${id}`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          navigate(`/post/${idPost}`);
        }
      })
      .catch((error) => console.log(error));
  };
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
  }, [idPost, id, token]);
  return (
    <Fragment>
      {userConnected.userId === data.userId ? (
        <Fragment>
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
        <Message color="danger">
          <Message.Header>
            <span>Erreur</span>
          </Message.Header>
          <Message.Body>Accès non autorisé</Message.Body>
        </Message>
      )}
    </Fragment>
  );
}

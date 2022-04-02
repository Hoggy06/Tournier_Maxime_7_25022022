import { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Form,
  Button,
  Media,
  Box,
  Image,
  Content,
} from "react-bulma-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { port } from "../../port";

export default function Comments() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [message, setMessage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [deleteComment, setdeleteComment] = useState(false);
  moment.locale("fr");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { message };
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`http://localhost:${port}/api/posts/${id}/comment`, options)
      .then((response) => response.json())
      .then(() => {
        fetch(`http://localhost:${port}/api/posts/${id}/comments`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    setMessage("");
  };

  useEffect(() => {
    fetch(`http://localhost:${port}/api/posts/${id}/comments`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [id, token]);

  return (
    <Fragment>
      <Box>
        <form onSubmit={handleSubmit}>
          <Media renderAs="article">
            <Media.Item align="center">
              <Form.Field>
                <Form.Control>
                  <Form.Textarea
                    className="textarea"
                    placeholder="Ajouter un commentaire..."
                    value={message}
                    onChange={onMessageChange}
                    name="message"
                    required
                    disabled={!userConnected}
                  ></Form.Textarea>
                  <Form.Field>
                    <Form.Control>
                      <Button color="link" disabled={!userConnected}>
                        Commenter
                      </Button>
                    </Form.Control>
                  </Form.Field>
                </Form.Control>
              </Form.Field>
            </Media.Item>
          </Media>
        </form>
      </Box>
      {data.map((i, index) => {
        const handleSubmit = (e) => {
          e.preventDefault();
          const options = {
            method: "DELETE",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          };
          fetch(`http://localhost:${port}/api/posts/comment/${i.id}`, options)
            .then((response) => response.json())
            .then(() => {
              fetch(`http://localhost:${port}/api/posts/${id}/comments`, {
                method: "GET",
                headers: {
                  Authorization: token,
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
          setdeleteComment(!deleteComment);
        };
        return (
          <Box key={index}>
            <Media>
              <Media.Item renderAs="article" align="left">
                {i.User && (
                  <Link to={`/user/${i.userId}`}>
                    <Image size={64} alt="64x64" src={i.User.image} />
                  </Link>
                )}
              </Media.Item>
              <Media.Item>
                <Content>
                  <p className="pJustify">
                    {i.User && <b>{i.User.firstname}</b>}{" "}
                    <small>
                      - {moment(i.created).startOf("YYYYMMDD").fromNow()}
                    </small>
                    <br />
                    {i.message}
                  </p>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      {userConnected.userId === i.userId ? (
                        <Link
                          className="level-item"
                          to={`/editComment/${i.id}/post/${id}`}
                        >
                          <span
                            data-tooltip="Editer"
                            className="icon is-small level-item has-tooltip-bottom"
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </span>
                        </Link>
                      ) : null}
                    </div>
                  </nav>
                </Content>
              </Media.Item>
              <Media.Item renderAs="article" align="right">
                {userConnected.userId === i.userId ||
                userConnected.isAdmin === true ? (
                  <span
                    data-tooltip="Supprimer"
                    className="icon is-small level-item has-tooltip-bottom"
                  >
                    <Button onClick={handleSubmit} className="delete"></Button>
                  </span>
                ) : null}
              </Media.Item>
            </Media>
          </Box>
        );
      })}
    </Fragment>
  );
}

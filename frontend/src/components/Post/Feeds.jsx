import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Media,
  Box,
  Image,
  Content,
} from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faComment, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../utils/moment";
import { useNavigate } from "react-router-dom";
import { port } from "../../port";
export default function Posts() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  const onImageChange = (e) => setImage(e.target.files[0]);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [deletePost, setDeletePost] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (message !== "") {
      data.append("message", message);
    }
    if (image !== "") {
      data.append("image", image);
    }

    const options = {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    };

    fetch(`http://localhost:${port}/api/posts/`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        }
        fetch(`http://localhost:${port}/api/posts`, {
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
    setImage("");
  };

  useEffect(() => {
    fetch(`http://localhost:${port}/api/posts`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [token]);

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
                    size="small"
                    type="text"
                    placeholder={`Que voulez vous dire ?`}
                    value={message}
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
                    label="Ajouter une image"
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Button color="link" disabled={!userConnected || !message}>
                    Poster
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
      {data.map((i, index) => {
        const handleDelete = (e) => {
          e.preventDefault();
          const options = {
            method: "DELETE",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          };
          fetch(`http://localhost:${port}/api/posts/${i.id}`, options)
            .then((response) => response.json())
            .then((res) => {
              if (res.message) {
                navigate("/feeds");
              }
              fetch(`http://localhost:${port}/api/posts`, {
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
          setDeletePost(!deletePost);
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
                <Content className="pJustify">
                  {i.User && <b>{i.User.firstname}</b>}{" "}
                  <small>
                    - {moment(i.created).startOf("YYYYMMDD").fromNow()}
                  </small>
                  <br />
                  {i.message}
                  <br />
                  {i.image ? <Image src={i.image} alt={`${i.image}`} /> : null}
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <Link className="level-item" to={`/post/${i.id}`}>
                        <span
                          data-tooltip="Commenter"
                          className="icon is-small level-item has-tooltip-bottom"
                        >
                          <FontAwesomeIcon icon={faComment} />
                        </span>
                      </Link>
                      {/*<LikePost idPost={i.id} idLike={i.Likes.id} />*/}
                      {userConnected.userId === i.userId ? (
                        <Link className="level-item" to={`/editPost/${i.id}`}>
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
                    <Button onClick={handleDelete} className="delete"></Button>
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

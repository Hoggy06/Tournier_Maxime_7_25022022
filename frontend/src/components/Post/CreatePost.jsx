import { Form, Button, Media } from "react-bulma-components";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CreatePost({ token, port, setData }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  const onImageChange = (e) => setImage(e.target.files[0]);
  const [error, setError] = useState("");
  //Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    //Vérification des champs
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
    //Création d'un post
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
  return (
    <Fragment>
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
                <Button color="link" disabled={!message}>
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
    </Fragment>
  );
}

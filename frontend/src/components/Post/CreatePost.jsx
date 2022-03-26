import { useState } from "react";
import { Form, Button, Media, Box } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
export default function CreatePost() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  const onImageChange = (e) => setImage(e.target.files[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("message", message);
    data.append("image", image);
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    };

    fetch(`http://localhost:3307/api/posts/`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
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
                  label="Choisir un fichier"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button color="link" disabled={!userConnected}>
                  Envoyer
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
  );
}

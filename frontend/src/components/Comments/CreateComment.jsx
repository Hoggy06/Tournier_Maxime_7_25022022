import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Media, Box } from "react-bulma-components";

export default function CreateComment() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [message, setMessage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  const { id } = useParams();

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

    fetch(`http://localhost:3307/api/posts/${id}/comment`, options)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

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
    </Fragment>
  );
}

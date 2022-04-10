import { useState } from "react";
import { Media, Form, Button } from "react-bulma-components";
export default function CreateComment({ token, port, setData, id }) {
  const [message, setMessage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  //Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { message };
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
          .then((data) => {
            setData(data);
          })

          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    setMessage("");
  };
  return (
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
              ></Form.Textarea>
              <Form.Field>
                <Form.Control>
                  <Button color="link" disabled={!message}>
                    Commenter
                  </Button>
                </Form.Control>
              </Form.Field>
            </Form.Control>
          </Form.Field>
        </Media.Item>
      </Media>
    </form>
  );
}

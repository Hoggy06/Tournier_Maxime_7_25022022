import { useState, useEffect } from "react";
import { Button } from "react-bulma-components";

export default function DeleteComment(props) {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [deleteComment, setdeleteComment] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:3307/api/posts/comment/${props.idComment}`, options)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setdeleteComment(!deleteComment);
  };
  useEffect(() => {
    fetch(`http://localhost:3307/api/posts/comment/${props.idComment}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, [token, deleteComment, props.idComment]);

  return <Button onClick={handleSubmit} className="delete"></Button>;
}

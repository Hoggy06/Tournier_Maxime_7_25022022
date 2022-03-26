import { useEffect, useState } from "react";
import { Button } from "react-bulma-components";
import { useNavigate } from "react-router-dom";

export default function DeletePost(props) {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [deletePost, setDeletePost] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:3307/api/posts/${props.idPost}`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          navigate("/feeds");
        }
      })
      .catch((error) => console.log(error));
    setDeletePost(!deletePost);
  };
  useEffect(() => {
    fetch(`http://localhost:3307/api/posts/`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((res) => setDeletePost(res))
      .catch((error) => console.log(error));
  }, [token, deletePost]);
  return <Button onClick={handleSubmit} className="delete"></Button>;
}

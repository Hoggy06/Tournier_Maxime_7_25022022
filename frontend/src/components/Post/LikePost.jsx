import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { port } from "../../port";

export default function LikePost(props) {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [likePost, setLikePost] = useState(false);
  const [likes, setLikes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { likePost };
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`http://localhost:${port}/api/posts/${props.idPost}/like`, options)
      .then((response) => response.json())
      .then(() => setLikePost(!likePost))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetch(`http://localhost:${port}/api/posts/${props.idPost}/like/`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((res) => setLikes(res))
      .catch((error) => console.log(error));
  }, [token, likePost, props.idPost]);
  return (
    <Fragment>
      {likePost ? (
        <Link
          onClick={handleSubmit}
          className="level-item has-text-danger"
          to={`#!`}
        >
          <span
            data-tooltip="Ne plus Liker"
            className="icon is-small level-item has-tooltip-bottom"
          >
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>{likes.length}</span>
        </Link>
      ) : (
        <Link onClick={handleSubmit} className="level-item" to={`#!`}>
          <span
            data-tooltip="Liker"
            className="icon is-small level-item has-tooltip-bottom"
          >
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>{likes.length}</span>
        </Link>
      )}
    </Fragment>
  );
}

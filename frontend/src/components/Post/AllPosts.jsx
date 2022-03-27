import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Media, Image, Box, Content } from "react-bulma-components";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";
export default function AllPosts() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3307/api/posts`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [token, data]);
  const render = data.map((i, index) => {
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
                  - Le {moment(i.created).format("DD/MM/YYYY à HH:mm")}
                </small>
                <br />
                {i.message}
                <br />
                {i.image ? <Image src={i.image} alt={`${i.image}`} /> : null}
              </p>
              <nav className="level is-mobile">
                <div className="level-left">
                  <Link className="level-item" to={`/post/${i.id}`}>
                    <span
                      data-tooltip="Commenter"
                      className="icon is-small level-item has-tooltip-bottom"
                    >
                      <FontAwesomeIcon icon={faReply} />
                    </span>
                  </Link>
                  <LikePost idPost={i.id} idLike={i.Likes.id} />
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
              <DeletePost idPost={i.id} />
            ) : null}
          </Media.Item>
        </Media>
      </Box>
    );
  });
  return render;
}

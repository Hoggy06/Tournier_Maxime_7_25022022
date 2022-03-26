import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faHeart, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Media, Image, Box, Content } from "react-bulma-components";
import DeletePost from "./DeletePost";
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
            {i.User && <Image size={64} alt="64x64" src={i.User.image} />}
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
                {i.image ? <img src={i.image} alt={`${i.image}`} /> : ""}
              </p>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item" href={`/post/${i.id}`}>
                    <span
                      data-tooltip="Commenter"
                      className="icon is-small level-item has-tooltip-bottom"
                    >
                      <FontAwesomeIcon icon={faReply} />
                    </span>
                  </a>
                  <a className="level-item" href="#!">
                    <span
                      data-tooltip="Liker"
                      className="icon is-small level-item has-tooltip-bottom"
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </span>
                  </a>
                  {userConnected.userId === i.userId ? (
                    <a className="level-item" href={`/editPost/${i.id}`}>
                      <span
                        data-tooltip="Editer"
                        className="icon is-small level-item has-tooltip-bottom"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    </a>
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

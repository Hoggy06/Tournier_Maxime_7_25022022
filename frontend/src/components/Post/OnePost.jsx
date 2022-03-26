import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPen } from "@fortawesome/free-solid-svg-icons";
import { Media, Image, Box, Content } from "react-bulma-components";
import moment from "moment";
import DeletePost from "./DeletePost";
export default function OnePost() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3307/api/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [id, token, data]);

  return (
    <Box>
      <Media>
        <Media.Item renderAs="article" align="left">
          {data.User && <Image size={64} alt="64x64" src={data.User.image} />}
        </Media.Item>
        <Media.Item>
          <Content>
            <p className="pJustify">
              {data.User && <b>{data.User.firstname}</b>}{" "}
              <small>
                - Le {moment(data.created).format("DD/MM/YYYY à HH:mm")}
              </small>
              <br />
              {data.message}
              <br />
              {data.image ? <img src={data.image} alt={`${data.image}`} /> : ""}
            </p>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item" href="#!">
                  <span
                    data-tooltip="Liker"
                    className="icon is-small level-item has-tooltip-bottom"
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                </a>
                {userConnected.userId === data.userId ? (
                  <a className="level-item" href={`/editPost/${data.id}`}>
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
          {userConnected.userId === data.userId ||
          userConnected.isAdmin === true ? (
            <DeletePost idPost={data.id} />
          ) : null}
        </Media.Item>
      </Media>
    </Box>
  );
}

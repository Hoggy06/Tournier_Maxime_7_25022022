import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import DeleteComment from "./DeleteComment";
import { Media, Image, Box, Content } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function Comments() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3307/api/posts/${id}/comments`, {
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
                  {userConnected.userId === i.userId ? (
                    <a
                      className="level-item"
                      href={`/editComment/${i.id}/post/${id}`}
                    >
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
              <DeleteComment idComment={i.id} />
            ) : null}
          </Media.Item>
        </Media>
      </Box>
    );
  });
  return render;
}

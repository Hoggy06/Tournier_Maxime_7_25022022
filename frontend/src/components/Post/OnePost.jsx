//Importations
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Media, Image, Box, Content } from "react-bulma-components";
import moment from "moment";
import { port } from "../../port";

export default function OnePost({ userConnected, token }) {
  const [data, setData] = useState({});

  const { id } = useParams();
  //Récupération d'un post
  useEffect(() => {
    fetch(`http://localhost:${port}/api/posts/${id}`, {
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
  }, [id, token]); //eslint-disable-line
  //Affichage d'un post
  return (
    <Box>
      <Media>
        <Media.Item renderAs="article" align="left">
          {data.User && (
            <Link to={`/user/${data.userId}`}>
              <Image size={64} alt="64x64" src={data.User.image} />
            </Link>
          )}
        </Media.Item>
        <Media.Item>
          <Content className="pJustify">
            {data.User && <b>{data.User.firstname}</b>}{" "}
            <small>
              - {moment(data.created).startOf("YYYYMMDD").fromNow()}
            </small>
            <br />
            <p className="pWhiteSpaces">{data.message}</p>
            <br />
            {data.image ? (
              <Image src={data.image} alt={`${data.image}`} />
            ) : null}
            <nav className="level is-mobile">
              <div className="level-left">
                {userConnected.userId === data.userId ? (
                  <span
                    data-tooltip="Editer"
                    className="icon is-small level-item has-tooltip-bottom"
                  >
                    <Link className="level-item" to={`/editPost/${data.id}`}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </span>
                ) : null}
              </div>
            </nav>
          </Content>
        </Media.Item>
      </Media>
    </Box>
  );
}

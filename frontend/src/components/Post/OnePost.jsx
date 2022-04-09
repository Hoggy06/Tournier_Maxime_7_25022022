//Importations
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Media, Image, Box, Content } from "react-bulma-components";
import moment from "moment";
import { port } from "../../port";
//import LikePost from "./LikePost";
export default function OnePost({ userConnected, token }) {
  const [data, setData] = useState({});
  //const [deletePost, setDeletePost] = useState(false);
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
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [id, token]);
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
            {data.message}
            <br />
            {data.image ? (
              <Image src={data.image} alt={`${data.image}`} />
            ) : null}
            <nav className="level is-mobile">
              <div className="level-left">
                {/*<LikePost idPost={data.id} />*/}
                {userConnected.userId === data.userId ? (
                  <Link className="level-item" to={`/editPost/${data.id}`}>
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
      </Media>
    </Box>
  );
}

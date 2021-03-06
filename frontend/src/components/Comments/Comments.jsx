//Importations
import { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Media, Box, Image, Content } from "react-bulma-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { port } from "../../port";
import DeleteComment from "./DeleteComment";
import CreateComment from "./CreateComment";
export default function Comments({ userConnected, token }) {
  //States + localstorage
  const { id } = useParams();
  const [data, setData] = useState([]);
  moment.locale("fr");

  //Récupération des commentaires
  useEffect(() => {
    fetch(`http://localhost:${port}/api/posts/${id}/comments`, {
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
  //Affichage du formulaire
  return (
    <Fragment>
      <Box>
        <CreateComment
          token={token}
          port={port}
          setData={setData}
          userConnected={userConnected}
          id={id}
        />
      </Box>
      {/**Suppression des commentaires */}
      {data.map((i, index) => {
        //Affichage des commentaires
        return (
          <Box key={index} id={`${i.id}`}>
            <Media>
              <Media.Item renderAs="article" align="left">
                {i.User && (
                  <Link to={`/user/${i.userId}`}>
                    <Image size={64} alt="64x64" src={i.User.image} />
                  </Link>
                )}
              </Media.Item>
              <Media.Item>
                <Content className="pJustify">
                  {i.User && <b>{i.User.firstname}</b>}{" "}
                  <small>
                    - {moment(i.created).startOf("YYYYMMDD").fromNow()}
                  </small>
                  <br />
                  <p className="pWhiteSpaces">{i.message}</p>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      {userConnected.userId === i.userId ? (
                        <Link
                          className="level-item"
                          to={`/editComment/${i.id}/post/${id}`}
                        >
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
                  <DeleteComment
                    token={token}
                    port={port}
                    setData={setData}
                    deleteCommentId={i}
                    id={id}
                  />
                ) : null}
              </Media.Item>
            </Media>
          </Box>
        );
      })}
    </Fragment>
  );
}

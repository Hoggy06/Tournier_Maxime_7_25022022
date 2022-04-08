//Importations
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Media, Box, Image, Content } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../utils/moment";
import { port } from "../../port";
import DeletePost from "./DeletePost";
import CreatePost from "./CreatePost";
export default function Posts() {
  //States + localstorage
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [data, setData] = useState([]);
  //Récupération des posts
  useEffect(() => {
    fetch(`http://localhost:${port}/api/posts`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [token]);
  //Affichage des posts
  return (
    <Fragment>
      <Box>
        <CreatePost
          token={token}
          port={port}
          setData={setData}
          userConnected={userConnected}
        />
      </Box>
      {/**Suppression d'un post */}
      {data.map((i, index) => {
        //Affichage des posts
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
                <Content className="pJustify">
                  {i.User && <b>{i.User.firstname}</b>}{" "}
                  <small>
                    - {moment(i.created).startOf("YYYYMMDD").fromNow()}
                  </small>
                  <br />
                  {i.message}
                  <br />
                  {i.image ? <Image src={i.image} alt={`${i.image}`} /> : null}
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <Link className="level-item" to={`/post/${i.id}`}>
                        <span
                          data-tooltip="Commenter"
                          className="icon is-small level-item has-tooltip-bottom"
                        >
                          <FontAwesomeIcon icon={faComment} />
                        </span>
                      </Link>
                      {/*<LikePost idPost={i.id} idLike={i.Likes.id} />*/}
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
                  <DeletePost
                    token={token}
                    port={port}
                    setData={setData}
                    deletePostId={i}
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

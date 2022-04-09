//Importations
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  Media,
  Image,
  Box,
  Content,
  Tag,
  Level,
  Heading,
} from "react-bulma-components";
import UpdateAccount from "./UpdateAccount";
import { port } from "../../port";
import DeleteAccount from "./DeleteAccount";
export default function User({ userConnected, token }) {
  //Localstorage + states

  const [data, setData] = useState({});
  const { id } = useParams();

  //Récupération des data du membre
  useEffect(() => {
    fetch(`http://localhost:${port}/api/users/${id}`, {
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
  }, [id, token, userConnected]);
  //Affichage des infos du membre
  return (
    <Fragment>
      <Box>
        <Media>
          <Media.Item renderAs="article" align="left">
            {data.user && <Image size={64} alt="64x64" src={data.user.image} />}
          </Media.Item>
          <Media.Item>
            <Content>
              <p>
                {data.user && (
                  <b>
                    {data.user.firstname} {data.user.lastname}{" "}
                  </b>
                )}
              </p>
              <p>
                {data.user && data.user.isAdmin === true ? (
                  <Tag renderAs="span" rounded color="danger">
                    Compte administrateur
                  </Tag>
                ) : (
                  <Tag renderAs="span" rounded color="link">
                    Membre
                  </Tag>
                )}
              </p>
              <p>
                Inscrit depuis le{" "}
                {data.user && moment(data.user.created).format("DD/MM/YYYY")}
              </p>
              <Level breakpoint="mobile">
                <Level.Item>
                  <Heading size={5} subtitle>
                    {data.user && data.user.Posts.length} Posts
                  </Heading>
                </Level.Item>
                <Level.Item>
                  <Heading size={5} subtitle>
                    {data.user && data.user.Comments.length} Commentaires
                  </Heading>
                </Level.Item>
              </Level>
            </Content>
          </Media.Item>
        </Media>
      </Box>
      {/**Formulaire d'édition */}
      {data.user && userConnected.userId === data.user.id ? (
        <Box>
          <Heading size={6}>Edition du profil</Heading>
          <UpdateAccount token={token} port={port} setData={setData} id={id} />
          <DeleteAccount token={token} port={port} setData={setData} id={id} />
        </Box>
      ) : null}
    </Fragment>
  );
}

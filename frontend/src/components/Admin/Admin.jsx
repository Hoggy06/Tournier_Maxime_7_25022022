//Importations
import { Fragment, useEffect, useState } from "react";
import { Table, Box, Tag } from "react-bulma-components";
import moment from "moment";
import { port } from "../../port";
import { Link } from "react-router-dom";
import Modal from "./ModalDeleteAdmin";
import IsAdmin from "./IsAdmin";
export default function Admin() {
  //Localstorage + states
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [data, setData] = useState({});

  //Récupérations des users
  useEffect(() => {
    fetch(`http://localhost:${port}/api/admin/users/`, {
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
  //Tableau récapitulatif des infos des membres
  return (
    <Fragment>
      <Box>
        <Table.Container>
          <Table size="fullwidth" striped hoverable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Administrateur</th>
                <th>Inscription</th>
                <th>Privilèges</th>
                <th>Suppression</th>
              </tr>
            </thead>

            {data.users?.map((i, index) => {
              return (
                <Fragment key={index}>
                  <tbody>
                    <tr>
                      <td>
                        <Link to={`/user/${i.id}`}>{i.id}</Link>
                      </td>
                      <td>
                        <Link to={`/user/${i.id}`}>{i.lastname}</Link>
                      </td>
                      <td>
                        <Link to={`/user/${i.id}`}>{i.firstname}</Link>
                      </td>
                      <td>
                        {i.isAdmin === true ? (
                          <Tag renderAs="span" color="success">
                            Oui
                          </Tag>
                        ) : (
                          <Tag renderAs="span" color="danger">
                            Non
                          </Tag>
                        )}
                      </td>
                      <td>{moment(i.created).format("DD/MM/YYYY")}</td>
                      <td>
                        <IsAdmin
                          adminRights={i}
                          port={port}
                          token={token}
                          setData={setData}
                        />
                      </td>
                      <td>
                        <Fragment>
                          {/**Confirmation de la suppression */}
                          <Modal
                            modal={i}
                            port={port}
                            token={token}
                            setData={setData}
                          />
                        </Fragment>
                      </td>
                    </tr>
                  </tbody>
                </Fragment>
              );
            })}
          </Table>
        </Table.Container>
      </Box>
    </Fragment>
  );
}

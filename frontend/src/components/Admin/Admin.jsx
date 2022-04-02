import { Fragment, useEffect, useState } from "react";
import { Table, Box, Tag, Button } from "react-bulma-components";
import moment from "moment";
import { port } from "../../port";

export default function Admin() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [data, setData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

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
              const handleSubmit = (e) => {
                e.preventDefault();
                const data = { isAdmin };
                const options = {
                  method: "POST",
                  headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                };
                fetch(
                  `http://localhost:${port}/api/admin/users/${i.id}/setAdmin`,
                  options
                )
                  .then((response) => response.json())
                  .then(() => {
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
                    setIsAdmin(!isAdmin);
                  })
                  .catch((error) => console.log(error));
              };
              const handleDelete = (e) => {
                e.preventDefault();
                const options = {
                  method: "DELETE",
                  headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                  },
                };
                fetch(
                  `http://localhost:${port}/api/admin/users/${i.id}`,
                  options
                )
                  .then((response) => response.json())
                  .then(() => {
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
                  })
                  .catch((error) => console.log(error));
              };
              return (
                <Fragment key={index}>
                  <tbody>
                    <tr>
                      <td>{i.id}</td>
                      <td>{i.lastname}</td>
                      <td>{i.firstname}</td>
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
                        <Fragment>
                          {i.isAdmin === false ? (
                            <Button
                              onClick={handleSubmit}
                              color="link"
                              outlined
                              size="small"
                            >
                              Ajouter
                            </Button>
                          ) : (
                            <Button
                              onClick={handleSubmit}
                              color="link"
                              outlined
                              size="small"
                            >
                              Retirer
                            </Button>
                          )}
                        </Fragment>
                      </td>
                      <td>
                        <Fragment>
                          <Button
                            onClick={handleDelete}
                            color="danger"
                            outlined
                            size="small"
                          >
                            Supprimer
                          </Button>
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

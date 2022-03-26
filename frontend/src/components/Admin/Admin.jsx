import { Fragment, useEffect, useState } from "react";
import { Table, Box, Tag } from "react-bulma-components";
import moment from "moment";
import SetAdmin from "./SetAdmin";

export default function Admin() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3307/api/admin/users/`, {
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

  return (
    <Fragment>
      <Box>
        <Table size="fullwidth" striped hoverable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Administrateur</th>
              <th>Inscription</th>
              <th>Action</th>
            </tr>
          </thead>

          {data.users?.map((i, index) => {
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
                      <SetAdmin id={i.id} />
                    </td>
                  </tr>
                </tbody>
              </Fragment>
            );
          })}
        </Table>
      </Box>
    </Fragment>
  );
}

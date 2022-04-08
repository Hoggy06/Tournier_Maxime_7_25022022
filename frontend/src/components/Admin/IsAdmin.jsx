import { Fragment, useState } from "react";
import { Button } from "react-bulma-components";
export default function IsAdmin({ adminRights, token, port, setData }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { isAdmin };
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(
      `http://localhost:${port}/api/admin/users/${adminRights.id}/setAdmin`,
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
          .then((data) => {
            setData(data);
            setIsAdmin(!isAdmin);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  return (
    <Fragment>
      {adminRights.isAdmin === false ? (
        <Button onClick={handleSubmit} color="link" outlined size="small">
          Ajouter
        </Button>
      ) : (
        <Button onClick={handleSubmit} color="link" outlined size="small">
          Retirer
        </Button>
      )}
    </Fragment>
  );
}

import { Fragment, useState } from "react";
import { Button } from "react-bulma-components";

export default function SetAdmin(props) {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [isAdmin, setIsAdmin] = useState(false);

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
    fetch(`http://localhost:3307/api/admin/users/${props.id}/setAdmin`, options)
      .then((response) => response.json())
      .then(() => setIsAdmin(!isAdmin))
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <Fragment>
        {isAdmin === false ? (
          <Button onClick={handleSubmit} color="link" outlined size="small">
            Ajouter
          </Button>
        ) : (
          <Button onClick={handleSubmit} color="link" outlined size="small">
            Retirer
          </Button>
        )}
      </Fragment>
    </Fragment>
  );
}

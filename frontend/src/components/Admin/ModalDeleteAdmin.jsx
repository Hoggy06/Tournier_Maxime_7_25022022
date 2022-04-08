import { useState } from "react";
import { Button } from "react-bulma-components";
export default function Modal({ modal, token, setData, port }) {
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  //Call to action suppression du membre
  const deleteAction = () => {
    setIsDeleteUser(!isDeleteUser);
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
    fetch(`http://localhost:${port}/api/admin/users/${modal.id}`, options)
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
            setIsDeleteUser(!isDeleteUser);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Button.Group align="center">
      <Button onClick={deleteAction} color="danger" outlined size="small">
        Supprimer
      </Button>
      {isDeleteUser ? (
        <div className={isDeleteUser ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">
                  Suppression du compte #{modal.id}
                </p>
              </header>
              <section className="modal-card-body">
                <p>
                  Cette action est irréversible. La suppression du membre{" "}
                  <b>
                    {modal.lastname} {modal.firstname}
                  </b>{" "}
                  entrainera la perte définitive des données. Êtes-vous sûr de
                  vouloir continuer ?
                </p>
              </section>
              <footer className="modal-card-foot">
                <button onClick={handleDelete} className="button is-danger">
                  Supprimer
                </button>
                <button onClick={deleteAction} className="button">
                  Annuler
                </button>
              </footer>
            </div>
          </div>
        </div>
      ) : null}
    </Button.Group>
  );
}

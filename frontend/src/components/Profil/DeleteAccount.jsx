import { Button } from "react-bulma-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function DeleteAccount({ token, port, setData, id }) {
  const navigate = useNavigate();
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  //Call to action suppression du membre
  const deleteAction = () => {
    setIsDeleteUser(!isDeleteUser);
  };
  //Soumission pour la suppressionss
  const handleDelete = (e) => {
    e.preventDefault();
    const options = {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:${port}/api/users/${id}`, options)
      .then((response) => response.json())
      .then(() => {
        fetch(`http://localhost:${port}/api/users/`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            localStorage.clear();
            navigate("/");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  return (
    <Button.Group align="center">
      <Button onClick={deleteAction} color="danger" outlined>
        Supprimer mon compte
      </Button>
      {!isDeleteUser ? null : (
        <div className={isDeleteUser ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Suppression du compte #{id}</p>
              </header>
              <section className="modal-card-body">
                <p>
                  Cette action est irréversible. La suppression de votre compte
                  entrainera la perte définitive de vos données. Êtes-vous sûr
                  de vouloir continuer ?
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
      )}
    </Button.Group>
  );
}

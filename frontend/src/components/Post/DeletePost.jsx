import { Button } from "react-bulma-components";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
export default function DeletePost({ deletePostId, token, port, setData }) {
  const [deletePost, setDeletePost] = useState(false);
  const navigate = useNavigate();
  const deleteAction = () => {
    setDeletePost(!deletePost);
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
    fetch(`http://localhost:${port}/api/posts/${deletePostId.id}`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          navigate("/feeds");
        }
        fetch(`http://localhost:${port}/api/posts`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setDeletePost(!deletePost);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  return (
    <Fragment>
      <span
        data-tooltip="Supprimer"
        className="icon is-small level-item has-tooltip-bottom"
      >
        <Button onClick={deleteAction} className="delete"></Button>
      </span>
      {deletePost ? (
        <div className={deletePost ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">
                  Suppression du post #{deletePostId.id}
                </p>
              </header>
              <section className="modal-card-body">
                <p>
                  Cette action est irréversible. La suppression de ce post{" "}
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
    </Fragment>
  );
}

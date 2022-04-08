import { Fragment, useState } from "react";
import { Button } from "react-bulma-components";
export default function DeleteComment({
  deleteCommentId,
  token,
  port,
  setData,
  id,
}) {
  const [deleteComment, setdeleteComment] = useState(false);
  const deleteAction = () => {
    setdeleteComment(!deleteComment);
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
      `http://localhost:${port}/api/posts/comment/${deleteCommentId.id}`,
      options
    )
      .then((response) => response.json())
      .then(() => {
        fetch(`http://localhost:${port}/api/posts/${id}/comments`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setdeleteComment(!deleteComment);
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
      {deleteComment ? (
        <div className={deleteComment ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">
                  Suppression du commentaire #{deleteCommentId.id}
                </p>
              </header>
              <section className="modal-card-body">
                <p>
                  Cette action est irréversible. La suppression de ce
                  commentaire entrainera la perte définitive des données.
                  Êtes-vous sûr de vouloir continuer ?
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

import { Fragment } from "react";
import { Button } from "react-bulma-components";

export default function DeleteImage({
  token,
  port,
  setData,
  id,
  navigate,
  setError,
  setSuccess,
  image,
  data,
  setDeleteMessage,
  deleteMessage,
}) {
  const deleteImage = () => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
      body: image,
    };
    fetch(`http://localhost:${port}/api/posts/${id}/img`, options)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setDeleteMessage(!deleteMessage);
        navigate(`/editPost/${id}`);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(res.message);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Fragment>
      {data.image || image ? (
        <Button outlined color="danger" onClick={deleteImage}>
          Supprimer Image
        </Button>
      ) : null}
    </Fragment>
  );
}

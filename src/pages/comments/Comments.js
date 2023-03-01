import React, { useState } from "react";
import { Container, DropdownButton, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import CommentsEdit from "./CommentsEdit";
import styles from "../../styles/Comments.module.css";

const Comments = (props) => {
  const { owner, updated_at, content, id, setComments } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <>
      <hr />
      <Container>
        <div className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <span className="float-right">
            {is_owner && !showEditForm && (
              <InputGroup>
                <DropdownButton
                  variant="outline-secondary"
                  id="input-group-dropdown-1"
                  title=""
                >
                  <DropdownItem onClick={() => setShowEditForm(true)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={handleDelete}>Delete</DropdownItem>
                </DropdownButton>
              </InputGroup>
            )}
          </span>
          {showEditForm ? (
            <CommentsEdit
              id={id}
              content={content}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p className="pt-2">{content}</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default Comments;

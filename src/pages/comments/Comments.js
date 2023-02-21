import React, { useState } from "react";
import { Container, DropdownButton, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useCurrentUser } from "../../context/CurrentUserContext";
import CommentsEdit from "./CommentsEdit";

const Comments = (props) => {
  const {
    owner,
    updated_at,
    content,
    id,
    setPostData,
    setComments,
    created_at,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <>
      <hr />
      <Container>
        <div className="align-self-center ml-2">
          <span>{owner}</span>
          <span>{updated_at}</span>
          {showEditForm ? (
            <CommentsEdit
              id={id}
              content={content}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
        {is_owner && !showEditForm && (
          <InputGroup className="flex-row-reverse">
            <DropdownButton
              variant="outline-secondary"
              id="input-group-dropdown-1"
              className="flex-row-reverse"
              title=""
            >
              <DropdownItem onClick={() => setShowEditForm(true)}>
                Edit
              </DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownButton>
          </InputGroup>
        )}
      </Container>
    </>
  );
};

export default Comments;

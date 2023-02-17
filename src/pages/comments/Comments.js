import React, { useState } from "react";
import { useCurrentUser } from "../../context/CurrentUserContext";
import CommentsCreate from "./CommentsCreate";

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

  return (
    <>
      <hr />
      <div className="align-self-center ml-2">
        <p>{props.owner}</p>
        <p>{props.content}</p>
        <p>{props.created_at}</p>
      </div>
      {/* form */}
    </>
  );
};

export default Comments;

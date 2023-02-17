import React, { useState } from "react";
import { useCurrentUser } from "../../context/CurrentUserContext";
import CommentsCreate from "./CommentsCreate";

const Comments = (props) => {
  const [owner, created_at, content, id] = props;
  const currentUser = useCurrentUser();

  return (
    <>
      <hr />
      <div className="align-self-center ml-2">
        <span>owner</span>
        <span>updated_at</span>
        <p>content</p>
      </div>
      {/* form */}
    </>
  );
};

export default Comments;

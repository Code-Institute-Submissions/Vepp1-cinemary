import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Comments.module.css";

function CommentsEdit(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.patch(`/comments/${id}`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
          className={styles.Form}
        />
      </Form.Group>
      <div className="text-right">
        <button
          onClick={() => setShowEditForm(false)}
          type="button"
          className={`${styles.Button} btn d-block ml-auto`}
        >
          cancel
        </button>
        <button
          disabled={!content.trim()}
          type="submit"
          className={`${styles.Button} btn d-block ml-auto`}
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentsEdit;

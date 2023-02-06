import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState({ results: [] });
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/");
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [pathname]);

  return (
    <>
      {posts.results?.map((post) => (
        <Card className={styles.Post}>
          <a href="/" className={styles.Anchor}>
            <figure>
              <Card.Img variant="top" src={post.image} alt="Post Image" />
            </figure>

            <Card.Body>
              <Card.Title className={styles.Title}>{post.title}</Card.Title>
              <Card.Text className="mt-2">Genrer: {post.genrer}</Card.Text>
              <span className={styles.Align}>
                <p>{post.created_at}</p>
                <p className={styles.Owner}>
                  <em>Created by:</em> <strong>{post.owner}</strong>
                </p>
              </span>
            </Card.Body>
          </a>
        </Card>
      ))}
    </>
  );
};

export default PostList;

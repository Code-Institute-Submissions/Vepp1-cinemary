import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import DropDownMenu from "../../components/DropDownMenu";
import styles from "../../styles/PostList.module.css";
import Asset from "../../components/Asset";
import { Container } from "react-bootstrap";

const PostList = ({ message }) => {
  const [posts, setPosts] = useState({ results: [] });
  const { pathname } = useLocation();
  const [hasLoad, setHasLoad] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/");
        setPosts(data);
        setHasLoad(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [pathname]);

  return (
    <>
      {hasLoad ? (
        <>
          {posts.results?.map((post) => (
            <Card className={styles.Post}>
              <a href="/" className={styles.Anchor}>
                <figure>
                  <Card.Img variant="top" src={post.image} alt="Post Image" />
                </figure>
              </a>

              <Card.Body>
                <span className={styles.DropDown}>
                  <DropDownMenu />
                </span>
                <Card.Title className={styles.Title}>{post.title} </Card.Title>
                <Card.Text className="mt-2">Genrer: {post.genrer}</Card.Text>
                <span className={styles.Align}>
                  <p>{post.created_at}</p>
                  <p className={styles.Owner}>
                    <em>Created by:</em> <strong>{post.owner}</strong>
                  </p>
                </span>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </>
  );
};

export default PostList;

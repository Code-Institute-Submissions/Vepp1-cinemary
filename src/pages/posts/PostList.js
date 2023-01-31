import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { useLocation } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults'
import styles from '../../styles/PostList.module.css'

const PostList = () => {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get('/posts/');
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [pathname]);

  return (
    <>
    {posts.results?.map((post) => (
      <Card className={styles.Post}>
        <Card.Img variant="top" src={post.image} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text className='mt-2'>
              Genrer: {post.genrer}
          </Card.Text>
          <p className={styles.P}>Created by {post.owner}. 23/01/2023</p>
        </Card.Body>
      </Card>))}
        </> 
  )
}

export default PostList
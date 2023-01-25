import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/PostList.module.css'

const PostList = () => {
  return (
    <>
        <Card className={styles.Post}>
            <Card.Img variant="top" src='' />
            <Card.Body>
                <Card.Title>Movie Title</Card.Title>
                <Card.Text>
                Movie Description
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>

        </> 
  )
}

export default PostList
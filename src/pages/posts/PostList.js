import React from 'react'
import Card from 'react-bootstrap/Card'
import styles from '../../styles/PostList.module.css'

const PostList = () => {
  return (
    <>
        <Card className={styles.Post}>
            <Card.Img variant="top" src='https://i.ebayimg.com/images/g/~gUAAOSwIOthElD4/s-l1600.jpg' />
            <Card.Body>
                <Card.Title>Harry Potter</Card.Title>
                <Card.Text className='mt-2'>
                Genrer: Fiction
                </Card.Text>
                <p className={styles.P}>Created by Vinicius. 23/01/2023</p>
            </Card.Body>
        </Card>

        </> 
  )
}

export default PostList
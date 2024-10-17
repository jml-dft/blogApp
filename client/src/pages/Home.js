import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:4000/posts');
                if (!response.ok) {
                    throw new Error('failed to fetch posts');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setPosts(data);
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error:', error);
            } finally {
                setLoading(false); // Stop loading after the fetch attempt
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <Container className="text-center my-5">
                <h4>Loading posts...</h4> {/* Loading message */}
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center my-5">
                <h4>Sorry, {error}.</h4>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <Row className="d-flex flex-wrap">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map(post => (
                        <Col key={post._id} md={4} className="mb-4">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.summary}</Card.Text>
                                    <Card.Text>
                                        <small>By: {post.author?.username || 'Unknown'}</small>
                                    </Card.Text>
                                    <Link to={`/post/${post._id}`}>
                                        <Button variant="primary">Read More</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">
                        <h4>No posts available</h4> {/* Fallback message */}
                        <p>Check back later for more content!</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Home;

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext'; // Assuming you have a UserContext to manage authentication

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Access the authenticated user
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch(`http://localhost:4000/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Send token for authenticated request
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch post');
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = () => {
    navigate(`/posts/edit/${id}`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:4000/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Send token for authenticated request
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Post deleted successfully',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <Container>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {user && user.isAdmin && (
        <>
          <Button variant="primary" onClick={handleEdit}>Edit</Button>
          <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleDelete}>Delete</Button>
        </>
      )}
    </Container>
  );
};

export default PostDetail;

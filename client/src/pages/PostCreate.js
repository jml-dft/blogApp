import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PostCreate() {
  const navigate = useNavigate();

  // Input states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // New state for file upload
  const [loading, setLoading] = useState(false); // New loading state

  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    const token = localStorage.getItem('token'); // Retrieve the Bearer token
    console.log("JWT Token:", token); // Log the token for debugging
    const formData = new FormData();

    // Append form data
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', file); // Append the file

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Token is missing. Please log in again.',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Set the Authorization header with Bearer token
        },
        body: formData, // Send as FormData instead of JSON
      });

      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.text(); // Get response as text for debugging
        console.error('Server Error:', errorData);
        throw new Error('Server error, please check the console for more details.');
      }

      const data = await response.json();

      if (data.message === "Post created successfully") {
        // Reset form states
        setTitle('');
        setContent('');
        setFile(null);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Post created successfully',
        }).then(() => {
          // Navigate to the posts page or homepage
          navigate('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Post creation failed.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Something went wrong.',
      });
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <Container fluid className="banner-section">
      <Container>
        <h1 className="my-5 text-center">Create Post</h1>
        <Form onSubmit={createPost} encType="multipart/form-data">
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Post Title"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter Post Content"
              required
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>File (optional):</Form.Label>
            <Form.Control
              type="file"
              onChange={e => setFile(e.target.files[0])} // Handle file upload
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-5" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

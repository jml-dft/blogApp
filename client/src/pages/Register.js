import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      Swal.fire({
        title: 'Registration Successful!',
        text: 'Your account has been created. You can now log in.',
        icon: 'success',
        confirmButtonText: 'Proceed to Login',
      }).then(() => {
        navigate('/login'); // Redirect to login page
      });
    } else {
      Swal.fire({
        title: 'Registration Failed',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
      <Container fluid>
        <Container className="my-4">
          <h1 className="mb-4 text-center">Register</h1>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicUsername" className="my-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Container>
      </Container>
    );
  };

export default Register;

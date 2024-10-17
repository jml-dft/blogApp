import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2
import UserContext from '../context/UserContext';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { access, ...userData } = await response.json(); // Destructure the token
        localStorage.setItem('token', access); // Store token in localStorage
        setUser(userData); // Set user data in context
        Swal.fire({
          title: 'Login Successful!',
          text: 'Welcome back!',
          icon: 'success',
          confirmButtonText: 'Continue',
        }).then(() => {
          navigate('/'); // Redirect to home page after success
        });
      } else {
        Swal.fire({
          title: 'Login Failed',
          text: 'Please check your credentials and try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'An error occurred',
        text: 'Please try again later.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <Container fluid>
      <Container className="my-4">
        <h1 className="mb-4 text-center">Login</h1>
        <Form onSubmit={handleLogin}>
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
            Login
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default Login;

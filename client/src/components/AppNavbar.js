import React, { useContext } from 'react'; 
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

const AppNavbar = () => {
    const { user } = useContext(UserContext);


    return (
        <Navbar bg="light" expand="lg" className="mx-3">
            <Navbar.Brand as={Link} to="/">bloggerist</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {!user ? (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            <Nav.Link as={Link} to="/post/create">Create Post</Nav.Link>
                            {user.role === 'admin' && (
                                <Nav.Link as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>
                            )}
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;

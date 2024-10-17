import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import PostCreate from './pages/PostCreate';
import './css/App.css';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const token = localStorage.getItem('token'); // Fetch token from localStorage

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.auth !== 'Failed') {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: false,
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details.'); // Update error state
      } finally {
        setLoading(false); // End loading state
      }
    };

    if (token) {
      fetchUserDetails();
    } else {
      setLoading(false); // End loading state if no token
    }
  }, [token]);

  return (
    <UserProvider value={{ user, setUser }}>
      <Router>
        <AppNavbar />
        {loading ? (
          <div>Loading...</div> // Simple loading state
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/post/create" element={<PostCreate />} />
            {error && <div className="error">{error}</div>} {/* Display error if present */}
          </Routes>
        )}
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;

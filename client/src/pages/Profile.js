import React, { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext'; // Keep this import if using

const Profile = () => {
  const { user } = useContext(UserContext); // Use UserContext
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:4000/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <Container>
      <h2>Profile</h2>
      <p>Username: {user.username}</p> {/* Use username from context */}
      <p>Email: {profile.email}</p>
      <p>Admin Status: {profile.isAdmin ? 'Admin' : 'User'}</p>
    </Container>
  );
};

export default Profile;

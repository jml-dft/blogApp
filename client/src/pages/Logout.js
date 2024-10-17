import { useContext, useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';

export default function Logout() {
    const { unsetUser } = useContext(UserContext);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const showLogoutConfirmation = async () => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You will be logged out!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                unsetUser(); // Call to unset user
                setIsLoggedOut(true); // Update logged out state
                Swal.fire(
                    'Logged out!',
                    'You have been logged out.',
                    'success'
                ).then(() => {
                    navigate('/login'); // Navigate to login after alert
                });
            } else {
                navigate(-1); // Go back if cancelled
            }
        };

        // Only show confirmation if not already logged out
        if (!isLoggedOut) {
            showLogoutConfirmation();
        }
    }, [unsetUser, navigate, isLoggedOut]); // Dependencies

    if (isLoggedOut) {
        return <Navigate to='/login' replace />; // Using replace to avoid back navigation
    }

    // Render nothing while waiting for confirmation
    return null;
}

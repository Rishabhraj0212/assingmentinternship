import React, { useEffect, useState } from 'react';
import EditProfileForm from './EditProfileForm';
import './ProfileDisplay.css'; 

const ProfileDisplay = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const storedFormData = JSON.parse(localStorage.getItem('formData'));
            setUserProfile(storedFormData);
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const handleEditProfile = () => {
        setEditing(true);
    };

    const handleDeleteProfile = () => {
        localStorage.removeItem('formData');
        setUserProfile(null); 
    };

    const handleSaveProfile = (editedProfile) => {
        setUserProfile(editedProfile);
        setEditing(false);
        localStorage.setItem('formData', JSON.stringify(editedProfile));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="profile-display">
            <div className="card">
                <header>
                    <h1>User Profile</h1>
                </header>
                <div className="profile-details">
                    {userProfile && (
                        <>
                            <img
                                src={userProfile && userProfile.profilePicture ? URL.createObjectURL(new Blob([userProfile.profilePicture], { type: 'image/jpeg' })) : `https://via.placeholder.com/150?text=${userProfile ? userProfile.name : ''}`}
                                alt={userProfile ? userProfile.name : 'Placeholder Image'}
                                onError={(e) => { e.target.src = `https://via.placeholder.com/150?text=${userProfile ? userProfile.name : ''}`; }}
                            />
                            <div>
                                <p>Name: {userProfile.name}</p>
                                <p>Mobile Number: {userProfile.number}</p>
                                <p>Date of Birth: {userProfile.dob}</p>
                                <p>Email: {userProfile.email}</p>
                            </div>
                        </>
                    )}
                </div>
                <footer>
                    <div className="button-group">
                        <button onClick={handleEditProfile}>Edit Profile</button>
                        <div className="button-gap"></div> 
                        <button onClick={handleDeleteProfile}>Delete Profile</button>
                    </div>
                </footer>
            </div>
            {editing && <EditProfileForm userProfile={userProfile} onSave={handleSaveProfile} />}
        </div>
    );
};

export default ProfileDisplay;

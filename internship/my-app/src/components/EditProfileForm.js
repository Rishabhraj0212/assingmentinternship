
import React, { useState } from 'react';
import SignupForm from './SignupForm'; 

const EditProfileForm = ({ userProfile, onSave }) => {
    const [editedProfile, setEditedProfile] = useState(userProfile);

    const handleSave = () => {
        onSave(editedProfile);
    };

    return (
        <div className="edit-profile-form">
            <h2>Edit Profile</h2>
            <SignupForm formData={editedProfile} setFormData={setEditedProfile} onSave={handleSave} />
        </div>
    );
};

export default EditProfileForm;

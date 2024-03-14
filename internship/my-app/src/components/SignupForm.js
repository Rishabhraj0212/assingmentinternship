import React, { useState } from 'react';
import './SignupForm.css';
const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        dob: '',
        email: '',
        password: '',
        profilePicture: null 
    });
    const [formErrors, setFormErrors] = useState({
        name: '',
        number: '',
        dob: '',
        email: '',
        password: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        console.log(newValue); 
        setFormData({ ...formData, [name]: newValue });
        validateField(name, newValue);
    };
    const validateField = (name, value) => {
        let errorMessage = '';
        switch (name) {
            case 'name':
                errorMessage = value.trim() ? '' : 'Name is required';
                break;
            case 'number':
                errorMessage = /^\d{10}$/.test(value) ? '' : 'Invalid mobile number';
                break;
            case 'dob':
                errorMessage = value ? '' : 'Date of birth is required';
                break;
            case 'email':
                errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
                break;
            case 'password':
                errorMessage = value.length >= 8 ? '' : 'Password must be at least 8 characters long';
                break;
            default:
                break;
        }
        setFormErrors({ ...formErrors, [name]: errorMessage });
        const isFormValid = Object.values(formErrors).every(error => error === '');
        setIsFormValid(isFormValid);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem('formData', JSON.stringify(formData));

        window.location.href = '/profiles';
    };
    return (
        <div className="card">
            <h2 className="title">Signup Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                {formErrors.name && <span className="error">{formErrors.name}</span>}
                <label htmlFor="number">Mobile Number:</label>
                <input type="tel" id="number" name="number" value={formData.number} onChange={handleChange} required />
                {formErrors.number && <span className="error">{formErrors.number}</span>}
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                {formErrors.dob && <span className="error">{formErrors.dob}</span>}
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                {formErrors.password && <span className="error">{formErrors.password}</span>}
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input type="file" id="profilePicture" name="profilePicture" onChange={handleChange} />
                {formData.profilePicture && (
                    <img src={URL.createObjectURL(formData.profilePicture)} alt="Profile" />
                )}
                <button type="submit" disabled={!isFormValid}>Submit</button>
            </form>
        </div>
    );
};
export default SignupForm;

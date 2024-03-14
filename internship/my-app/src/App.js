// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import ProfileDisplay from './components/ProfileDisplay';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupForm />} />
                <Route path="/profiles" element={<ProfileDisplay />} />
                {/* Define additional routes here */}
            </Routes>
        </Router>
    );
};

export default App;

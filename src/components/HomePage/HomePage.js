import React from 'react';
import NavBar from '../NavBar/NavBar';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page-container">
            <div className="content-container">
                <NavBar />
                <div className="main-content">
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a centered container with a shadow.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

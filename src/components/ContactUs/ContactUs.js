import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        additionalInfo: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.firstName) {
            isValid = false;
            formErrors.firstName = "First name is required";
        }

        if (!formData.lastName) {
            isValid = false;
            formErrors.lastName = "Last name is required";
        }

        if (!formData.email) {
            isValid = false;
            formErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            formErrors.email = "Email address is invalid";
        }

        if (!formData.phone) {
            isValid = false;
            formErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            isValid = false;
            formErrors.phone = "Phone number is invalid. It should be 10 digits.";
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form data:', formData);
            // You can send the form data to a server or handle it as needed
            alert("Form submitted successfully!");
        }
    };

    return (
        <div className="contact-us-container">
            <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Connect with the Team</h2>
                <p>We're so excited to hear from you! Please fill out the form below and we'll get back to you as soon as possible.</p>
                <label>
                    First Name
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </label>
                <label>
                    Email Address
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </label>
                <label>
                    Phone Number
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </label>
                <label>
                    Is there anything else we should know that will help us assist you?
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                    ></textarea>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;

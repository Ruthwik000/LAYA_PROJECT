import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import './ConsultationModal.css';

const ConsultationModal = () => {
    const { isModalOpen, closeModal } = useModal();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        requirement: '',
        message: ''
    });

    if (!isModalOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Form Submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            closeModal();
            setFormData({
                name: '',
                phone: '',
                email: '',
                city: '',
                requirement: '',
                message: ''
            });
        }, 3000);
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>&times;</button>

                {!submitted ? (
                    <div className="modal-inner">
                        <div className="modal-header">
                            <h2>Book Your Free Consultation</h2>
                            <p>Our experts will connect with you to suggest the best aluminium design solutions.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="consultation-form">
                            <div className="form-group">
                                <input
                                    type="text" name="name" placeholder="Full Name"
                                    required value={formData.name} onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="tel" name="phone" placeholder="Phone Number"
                                        required value={formData.phone} onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email" name="email" placeholder="Email Address"
                                        required value={formData.email} onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <select name="city" required value={formData.city} onChange={handleChange}>
                                        <option value="">Select City</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Warangal">Warangal</option>
                                        <option value="Visakhapatnam">Visakhapatnam</option>
                                        <option value="Vijayawada">Vijayawada</option>
                                        <option value="Other">Other (Telangana/AP)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select name="requirement" required value={formData.requirement} onChange={handleChange}>
                                        <option value="">Requirement</option>
                                        <option value="Wardrobe">Wardrobe Designs</option>
                                        <option value="Kitchen">Kitchen Designs</option>
                                        <option value="Living Room">Living Room</option>
                                        <option value="Space Saving">Space Saving</option>
                                        <option value="Full Home">Full Home Interiors</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message" placeholder="Message (Optional)"
                                    rows="3" value={formData.message} onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn-premium">Submit Requirement</button>
                        </form>
                    </div>
                ) : (
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h2>Thank You!</h2>
                        <p>Our team will contact you shortly to schedule your free consultation.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationModal;

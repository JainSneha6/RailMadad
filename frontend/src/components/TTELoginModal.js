// src/components/TTELoginModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TTELoginModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/admin/tte_login', {
                name
            });

            if (response.data.status === "success") {
                const { trainNo } = response.data;
                // Redirect to the train-specific complaints page
                navigate(`/grievances/train/${trainNo}`);
                onClose();
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55 modal-enter" style={{ zIndex: '1000' }}>
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl transition-transform transform scale-95 modal-enter">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">TTE LOGIN</h2>
                    <button onClick={onClose} className="text-orange-500 text-lg font-bold">X</button>
                </div>
                <form className="mt-4" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full p-2 border border-gray-300 rounded text-black"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-center">
                            {errorMessage}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-2 rounded mt-2 hover:bg-gray-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TTELoginModal;

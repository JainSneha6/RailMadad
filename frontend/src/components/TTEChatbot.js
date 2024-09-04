import React, { useState, useEffect, useRef } from 'react';

const TTEChatbot = ({ grievance, onClose, onResolve }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState('initial');
    const [resolved, setResolved] = useState(false);
    const [isOpen, setIsOpen] = useState(true); // Manage open/close state
    const isInitialQuestionSent = useRef(false); // Track if initial question is sent

    useEffect(() => {
        if (isOpen && !isInitialQuestionSent.current) {
            // Send the initial question when the chatbot is opened
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Is the complaint resolved successfully?Yes or No?', sender: 'bot' },

            ]);
            isInitialQuestionSent.current = true; // Mark initial question as sent
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        // Add the user message once and clear input
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, sender: 'user' }
        ]);

        const userInput = input.trim().toLowerCase();
        setInput('');

        if (step === 'initial') {
            if (userInput === 'yes') {
                setResolved(true);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Thank you. The complaint has been marked as resolved.', sender: 'bot' },
                ]);
                setTimeout(() => {
                    onResolve(grievance.id);
                }, 2000);
            } else if (userInput === 'no') {
                setStep('nextStep');
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'What step needs to be taken?', sender: 'bot' },
                ]);
            } else {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Please answer with "yes" or "no".', sender: 'bot' },
                ]);
            }
        } else if (step === 'nextStep') {
            try {
                console.log(grievance.id)
                const response = await fetch(`http://localhost:5000/complaint_routing/send`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        grievancePNR: grievance.pnr,
                        stepDescription: input,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                // Assuming result contains a 'station_master' field
                const stationMasterMessage = `The complaint will be routed to the station master: ${result.station_master}.`;

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: stationMasterMessage, sender: 'bot' },
                ]);

            } catch (error) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'There was an error processing your request.', sender: 'bot' },
                ]);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        isOpen && (
            <div className="fixed bottom-4 right-4 w-80 max-h-[80vh] bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden z-50">
                <div className="p-3 border-b border-gray-300 bg-gray-100 flex justify-between items-center">
                    <span className="text-lg font-semibold">Chat with Admin Bot</span>
                    <button
                        onClick={() => { setIsOpen(false); onClose(); }}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col h-full">
                    <div className="flex-1 p-3 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded ${message.sender === 'user' ? 'bg-red-100 text-right' : 'bg-gray-100 text-left'}`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="p-2 border-t border-gray-300 flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 border border-gray-300 rounded-l px-2 py-1"
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-maroon text-white px-4 py-1 rounded-r"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default TTEChatbot;

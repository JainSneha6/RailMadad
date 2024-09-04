import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'This is a bot response.', sender: 'bot' },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 p-3 bg-red-600 text-white text-2xl font-bold hover:bg-red-700 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none z-50"
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 max-h-[80vh] bg-white border border-red-300 shadow-lg rounded-lg overflow-hidden z-50">
          <div className="p-3 border-b border-red-300 bg-red-100 flex justify-between items-center">
            <span className="text-lg font-semibold text-red-700">Chat with Admin Bot</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-xs ${message.sender === 'user' ? 'bg-red-100 text-red-800 self-end' : 'bg-gray-100 text-gray-800 self-start'}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-red-300 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-red-300 rounded-l-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-red-600 text-white px-4 py-1 rounded-r-lg hover:bg-red-700 transition-transform transform hover:scale-105"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

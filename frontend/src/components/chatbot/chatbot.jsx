import React, { useState, useContext } from 'react';
import './Chatbot.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext'; // get base URL from context

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { url } = useContext(StoreContext);  // getting your backend URL

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Show user message
        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await axios.post(`${url}/api/chat`, { message: input });
            const botMessage = { sender: 'bot', text: response.data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error(error);
        }

        setInput('');
    };

    return (
        <div className="chatbot-container">
            {open && (
                <div className="chatbot-box">
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
            <button
                className="chatbot-toggle"
                onClick={() => {
                    if (!open) {
                        // Chat is opening, send greeting
                        setMessages([
                            {
                                sender: 'bot',
                                text: "Hey! How can I help you today? 🍕🚚\n\nYou can ask me about:\n📋 Menu\n🚚 Your Order Status\n📞 Contact Support"
                            }
                        ]);
                    }
                    setOpen(!open);
                }}
            >
                {open ? "Close Chat" : "Open Chat"}
            </button>

        </div>
    );
};

export default Chatbot;

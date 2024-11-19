import React, { useState, useEffect, useRef } from 'react';
import { doc, setDoc, updateDoc, getDoc, addDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import chatData from '../../data/chatData.json';
import Image from "next/image";
import dynamic from "next/dynamic";

const Chat = ({ minimized, setMinimized }) => {
    const [messages, setMessages] = useState([{ text: 'Witaj, w czym mogę pomóc:', sender: 'bot' }]);
    const [options, setOptions] = useState(chatData.questions.map(q => ({ text: q.question, options: q.options })));
    const [isConnecting, setIsConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [chatId, setChatId] = useState(null);
    const [previousOptions, setPreviousOptions] = useState([]);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chatClosed, setChatClosed] = useState(false);
    const [closedWho, setClosedWho] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const initializeChat = async () => {
            const storedChatId = localStorage.getItem('chatId');

            if (storedChatId) {
                setChatId(storedChatId);

                const unsubscribe = onSnapshot(doc(db, 'chat', storedChatId), (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setMessages(data.messages || []);

                        if (data.active) {
                            setConnected(true);
                        }

                        if (data.closed) {
                            setChatClosed(true);
                            setConnected(false);
                            setIsConnecting(false);
                            if (data.closedWho) {
                                setClosedWho(data.closedWho);
                            }
                        }
                    } else {
                        // Jeśli czat nie istnieje, usuwamy chatId z localStorage
                        localStorage.removeItem('chatId');
                        setChatId(null);
                    }
                });

                return () => unsubscribe();
            }
        };

        initializeChat();
    }, []);

    useEffect(() => {
        // Automatyczne przewijanie do najnowszej wiadomości
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        // Aktualizacja formData w Firestore, jeśli istnieje chatId i formData
        if (chatId) {
            const formData = JSON.parse(localStorage.getItem('formData'));
            if (formData && formData.funeralHomeName) {
                updateChatWithFormData(chatId, formData);
            }
        }
    }, [chatId]);

    const handleSendMessage = async (text) => {
        const clientMessage = { text: text, sender: 'client', timestamp: new Date() };
        setMessages(prevMessages => [...prevMessages, clientMessage]);

        if (connected && chatId) {
            await sendMessageToFirestore(clientMessage);
        }
    };

    const sendMessageToFirestore = async (message) => {
        if (!connected || !chatId) return;
        const chatRef = doc(db, 'chat', chatId);
        await updateDoc(chatRef, {
            messages: [...messages, message]
        });
    };

    const handleOptionClick = (option) => {
        if (option.options) {
            setPreviousOptions([...previousOptions, options]);

            const userMessage = { text: option.text, sender: 'client', timestamp: new Date() };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            setLoading(true);

            setTimeout(() => {
                setLoading(false);

                const botMessage = { text: "Wybierz:", sender: 'bot', timestamp: new Date() };
                setMessages(prevMessages => [...prevMessages, botMessage]);
                setOptions(option.options);
            }, 1000);
        } else if (option.answer) {
            const userMessage = { text: option.text, sender: 'client', timestamp: new Date() };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            setLoading(true);

            setTimeout(() => {
                setLoading(false);

                const botMessage = { text: option.answer, sender: 'bot', timestamp: new Date() };
                setMessages(prevMessages => [...prevMessages, botMessage]);

                setOptions([]);
            }, 1500);
        }
    };

    const formatTime = (timestamp) => {
        let date;
        if (timestamp instanceof Date) {
            date = timestamp;
        } else if (timestamp?.toDate) {
            date = timestamp.toDate();
        } else {
            return '';
        }

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleConsultantClick = async () => {
        setIsConnecting(true);

        try {
            const formData = JSON.parse(localStorage.getItem('formData'));

            // Tworzenie nowego czatu w Firestore
            const chatRef = await addDoc(collection(db, 'chat'), {
                timestamp: new Date(),
                active: false,
                unread: true,
                messages: messages,
                formData: formData || {}
            });
            const newChatId = chatRef.id;
            localStorage.setItem('chatId', newChatId);
            setChatId(newChatId);

            // Listener na zmiany w czacie
            const unsubscribe = onSnapshot(doc(db, 'chat', newChatId), (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();

                    setMessages(data.messages || []);

                    if (data.active && !connected) {
                        setConnected(true);
                        setIsConnecting(false);
                    }

                    if (data.closed) {
                        setChatClosed(true);
                        setConnected(false);
                        setIsConnecting(false);
                        if (data.closedWho) {
                            setClosedWho(data.closedWho);
                        }
                    }
                }
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Błąd podczas łączenia z konsultantem:", error);
            setIsConnecting(false);
        }
    };

    const updateChatWithFormData = async (chatId, formData) => {
        try {
            const chatRef = doc(db, 'chat', chatId);
            await updateDoc(chatRef, {
                formData: formData
            });
            console.log('Dane z formularza zostały zapisane do czatu.');
        } catch (error) {
            console.error("Błąd podczas aktualizowania czatu z danymi formularza:", error);
        }
    };

    const handleBackClick = () => {
        if (previousOptions.length > 0) {
            const lastOptions = previousOptions[previousOptions.length - 1];
            setPreviousOptions(previousOptions.slice(0, -1));
            setOptions(lastOptions);
        }
    };

    const handleCloseChat = async () => {
        if (!chatId) return;

        const chatRef = doc(db, 'chat', chatId);
        await updateDoc(chatRef, { active: false, closed: true, closedWho: 'Klient' }); // Dodajemy closedWho

        setConnected(false);
        setIsConnecting(false);
        setChatClosed(true);
        setClosedWho('Klient');
    };

    const handleReturnToChatbot = () => {
        // Resetowanie stanu czatu do domyślnego (chatbot)
        setChatClosed(false);
        setConnected(false);
        setIsConnecting(false);
        setMessages([{ text: 'Witaj, w czym mogę pomóc:', sender: 'bot' }]);
        setOptions(chatData.questions.map(q => ({ text: q.question, options: q.options })));
        setPreviousOptions([]);
        localStorage.removeItem('chatId');
        setChatId(null);
        setClosedWho('');
    };

    const handleCloseChat2 = () => {
        setMinimized(true);
    };

    const handleIconClick = () => {
        setMinimized(false);
        setHasNewMessage(false);
    };

    return (
        <>
            {!minimized ? (
                <div className={`chat-container ${isConnecting ? 'connecting' : ''}`}>
                    <div className="chat-header">
                        <p>PolskiDomPogrzebowy.pl</p>
                        <div className="header-actions-chat">
                            {!isConnecting && !connected && !chatClosed && (
                                <button className="connect-button" onClick={handleConsultantClick}>Połącz z doradcą</button>
                            )}
                            {connected && (
                                <button className="back-button-chat" onClick={handleCloseChat}>Zakończ <br /> konwersację</button>
                            )}
                        </div>
                        <button className="close-button-chat" onClick={handleCloseChat2}>X</button>
                    </div>
                    <div className="chat-messages">
                        {!chatClosed ? (
                            <>
                                {!isConnecting && messages.map((msg, index) => (
                                    <div key={index} className={`chat-message ${msg.sender}`}>
                                        {msg.sender !== 'client' && (
                                            <div className="sender-info">
                                                {msg.sender === 'admin' ? 'Doradca' : 'Bot'}
                                                <Image
                                                    src="/assets/icons/consultant.png"
                                                    alt="Profile"
                                                    className="profile-icon"
                                                    width={100}
                                                    height={100}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                        <div className="message-bubble">
                                            {msg.text}
                                            <div className="message-time">{formatTime(msg.timestamp)}</div>
                                        </div>
                                    </div>
                                ))}

                                {loading && (
                                    <div className="chat-message bot">
                                        <div className="message-bubble">
                                            Pisze...
                                        </div>
                                    </div>
                                )}

                                {!isConnecting && !connected && !loading && options.length > 0 && (
                                    <div className="chat-options">
                                        {options.map((option, index) => (
                                            <div key={index} className="chat-message user">
                                                <div className="option-bubble" onClick={() => handleOptionClick(option)}>
                                                    {option.text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {previousOptions.length > 0 && !isConnecting && !loading && (
                                    <div className="chat-message user">
                                        <div className="back-button-chat-main" onClick={handleBackClick}>Cofnij</div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="chat-closed-message">
                                <p>Konwersacja została zakończona{closedWho ? ` przez ${closedWho}` : ''}.</p>
                                <button onClick={handleReturnToChatbot}>Powrót do chatbota</button>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    {isConnecting && (
                        <div className="connecting-message">
                            Łączenie z doradcą...
                            <div className="loading-spinner"></div>
                        </div>
                    )}
                    {connected && !chatClosed && (
                        <div className="chat-footer">
                            <input
                                type="text"
                                placeholder="Napisz wiadomość..."
                                onKeyDown={async (e) => {
                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                        await handleSendMessage(e.target.value.trim());
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <p>Państwa dane są przetwarzane przez PolskiDomPogrzebowy.pl z najwyższą dbałością o poufność i bezpieczeństwo - jeżeli nie wyrażają Państwo zgody proszę się rozłączyć</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="chat-icon-wrapper" onClick={handleIconClick}>
                    <Image
                        src="/assets/icons/consultant.png"
                        alt="Consultant Icon"
                        className="chat-icon"
                        width={100}
                        height={100}
                        style={{ objectFit: 'cover' }}
                    />
                    {hasNewMessage && <div className="notification">!</div>}
                </div>
            )}
        </>
    );
};

export default dynamic(() => Promise.resolve(Chat), { ssr: false });

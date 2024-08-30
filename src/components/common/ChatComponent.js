import React, { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, getDoc, addDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import chatData from '../../data/chatData.json';
import Image from "next/image";
import dynamic from "next/dynamic";

const Chat = ({ minimized, setMinimized }) => {
    const [messages, setMessages] = useState([{ text: 'Witaj, w czym mogę pomóc:', sender: 'bot' }]);
    const [options, setOptions] = useState([]);
    const [isConnecting, setIsConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [chatId, setChatId] = useState(null);
    const [previousOptions, setPreviousOptions] = useState([]);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedChatId = localStorage.getItem('chatId');
        const formData = JSON.parse(localStorage.getItem('formData')); // Pobranie danych z formData

        if (storedChatId) {
            setChatId(storedChatId);
            loadChat(storedChatId);

            // Jeśli istnieją dane w formData, zapisz je do bazy danych
            if (formData && formData.funeralHomeName) {
                updateChatWithFormData(storedChatId, formData);
            }
        } else {
            createNewChat(formData); // Tworzenie nowego czatu z danymi z formData
        }
    }, []);


    const loadChat = async (id) => {
        const chatRef = doc(db, 'chat', id);
        const docSnap = await getDoc(chatRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            setMessages(data.messages || [{ text: 'Witaj, w czym mogę pomóc:', sender: 'bot' }]);
            setOptions(chatData.questions.map(q => ({ text: q.question, options: q.options })));
        }
    };

    useEffect(() => {
        const initializeChat = async () => {
            const storedChatId = localStorage.getItem('chatId');

            if (storedChatId) {
                setChatId(storedChatId);
                setIsConnecting(true);

                const unsubscribe = onSnapshot(doc(db, 'chat', storedChatId), (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setMessages(data.messages || []);  // Pobierz wiadomości z Firestore

                        // Dodaj powitalną wiadomość, jeśli `messages` jest puste
                        if (!data.messages || data.messages.length === 0) {
                            setMessages([{ text: 'Witaj, w czym mogę pomóc:', sender: 'bot' }]);
                        }

                        setOptions(chatData.questions.map(q => ({ text: q.question, options: q.options })));
                        if (data.active) {
                            setConnected(true);
                        }
                    } else {
                        createNewChat();
                    }
                    setIsConnecting(false);
                });

                return () => unsubscribe();
            } else {
                createNewChat();
            }
        };

        initializeChat();
    }, []);



    const createNewChat = async (formData = null) => {
        try {
            const chatRef = await addDoc(collection(db, 'chat'), {
                timestamp: new Date(),
                active: false,
                messages: [],
                formData: formData || {} // Inicjalizacja formData, jeśli istnieje
            });
            const newChatId = chatRef.id;
            localStorage.setItem('chatId', newChatId);
            setChatId(newChatId);
        } catch (error) {
            console.error("Błąd podczas tworzenia nowego czatu:", error);
        }
    };


    const sendMessageToFirestore = async (message) => {
        if (!connected) return;
        const chatRef = doc(db, 'chat', chatId);
        await updateDoc(chatRef, {
            messages: [...messages, message]
        });
    };

    const handleSendMessage = async (text) => {
        const clientMessage = { text: text, sender: 'client', timestamp: new Date() };
        setMessages(prevMessages => [...prevMessages, clientMessage]);
        await sendMessageToFirestore(clientMessage);
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
            if (!chatId) {
                createNewChat();
            } else {
                const chatRef = doc(db, 'chat', chatId);
                const docSnap = await getDoc(chatRef);

                if (!docSnap.exists()) {
                    await setDoc(chatRef, {
                        timestamp: new Date(),
                        active: false,
                        messages: []
                    });
                }

                const unsubscribe = onSnapshot(doc(db, 'chat', chatId), (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.active && !connected) {
                            setConnected(true);
                            setIsConnecting(false);
                        }

                        if (minimized) {
                            setHasNewMessage(true);
                        }

                        setMessages(data.messages || []);
                    }
                });

                return () => unsubscribe();
            }
        } catch (error) {
            console.error("Błąd podczas łączenia z konsultantem:", error);
            setIsConnecting(false);
        }
    };
    const updateChatWithFormData = async (chatId, formData) => {
        try {
            const chatRef = doc(db, 'chat', chatId);
            await updateDoc(chatRef, {
                formData: formData // Dodanie lub aktualizacja formData w dokumencie czatu
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
        await updateDoc(chatRef, { active: false });

        setConnected(false);
        setIsConnecting(false);
        setMessages([{ text: 'Witaj, w czym mogę pomóc:', sender: 'bot' }]);
        setOptions(chatData.questions.map(q => ({ text: q.question, options: q.options })));
        localStorage.removeItem('chatId');
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
                            {!isConnecting && !connected && (
                                <button className="connect-button" onClick={handleConsultantClick}>Połącz z
                                    doradcą</button>
                            )}
                            {connected && (
                                <button className="back-button-chat" onClick={handleCloseChat}>Zakończ <br/>
                                    konwersację</button>
                            )}
                        </div>
                        <button className="close-button-chat" onClick={handleCloseChat2}>✖</button>

                    </div>
                    <div className="chat-messages">
                        {!isConnecting && messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                {msg.sender !== 'client' && (
                                    <div className="sender-info">
                                        {msg.sender === 'admin' ? 'Admin' : 'Bot'}
                                        <Image
                                            src="/assets/icons/consultant.png"
                                            alt="Profile"
                                            className="profile-icon"
                                            width={100}
                                            height={300}
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
                        {!isConnecting && !connected && !loading && options.length > 0 && ( // Sprawdzenie, czy bot skończył pisać przed wyświetleniem pytań
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

                        {previousOptions.length > 0 && !isConnecting && !loading && ( // Przycisk "Cofnij" jest teraz osobno
                            <div className="chat-message user">
                                <div className="back-button-chat-main" onClick={handleBackClick}>Cofnij</div>
                            </div>
                        )}
                    </div>
                    {isConnecting && (
                        <div className="connecting-message">
                            Łączenie z doradcą...
                            <div className="loading-spinner"></div>
                        </div>
                    )}
                    {connected && (
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
                            <p>Państwa dane są przetwarzane przez PolskiDomPogrzebowy.pl z najwyższą dbałością o
                                poufność i bezpieczeństwo - jeżeli nie wyrażają Państwo zgody proszę się rozłączyć</p>
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
export default dynamic (() => Promise.resolve(Chat), {ssr: false})


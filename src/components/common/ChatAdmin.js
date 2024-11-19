import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../../../firebase';
import { collection, doc, getDoc, updateDoc, onSnapshot, query, orderBy, deleteDoc, limit } from 'firebase/firestore';

const AdminChats = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const inactivityTimer = useRef(null);
    const messagesContainerRef = useRef(null);
    const previousMessagesLength = useRef(0);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

    useEffect(() => {
        const unsubscribe = fetchChats();
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let unsubscribe;
        if (selectedChat && selectedChat.id) {
            const chatRef = doc(db, 'chat', selectedChat.id);

            unsubscribe = onSnapshot(chatRef, (docSnap) => {
                if (docSnap.exists()) {
                    const updatedChat = docSnap.data();
                    const newMessages = updatedChat.messages || [];

                    setMessages(newMessages);
                    setSelectedChat(prevChat => ({ ...prevChat, ...updatedChat }));

                    // Sprawdź, czy pojawiła się nowa wiadomość
                    if (newMessages.length > previousMessagesLength.current) {
                        const latestMessage = newMessages[newMessages.length - 1];
                        if (latestMessage.sender === 'client') {
                            // Jeśli użytkownik jest blisko dołu, przewiń do najnowszej wiadomości
                            if (isAtBottom()) {
                                setShouldScrollToBottom(true);
                            }
                        } else if (latestMessage.sender === 'admin') {
                            // Jeśli wysłaliśmy wiadomość, przewiń do dołu
                            setShouldScrollToBottom(true);
                        }
                    }

                    previousMessagesLength.current = newMessages.length;
                } else {
                    // Dokument został usunięty
                    setSelectedChat(null);
                    setMessages([]);
                    clearTimeout(inactivityTimer.current); // Wyczyść timer nieaktywności
                }
            });
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [selectedChat]);

    useEffect(() => {
        if (messagesContainerRef.current && shouldScrollToBottom) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            setShouldScrollToBottom(false);
        }
    }, [messages, shouldScrollToBottom]);

    const isAtBottom = () => {
        if (!messagesContainerRef.current) return false;
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
        return scrollHeight - scrollTop <= clientHeight + 50; // 50px marginesu
    };

    const fetchChats = () => {
        setLoading(true);

        const q = query(collection(db, 'chat'), orderBy('timestamp', 'desc'), limit(50));

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const chatsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Usuwanie pustych, zamkniętych czatów
            const deletePromises = chatsData.map(async (chat) => {
                if (chat.closed && (!chat.messages || chat.messages.length === 0)) {
                    const chatRef = doc(db, 'chat', chat.id);
                    await deleteDoc(chatRef);
                }
            });

            await Promise.all(deletePromises);

            // Oznaczanie czatów z nowymi wiadomościami jako nieprzeczytane
            chatsData.forEach((chat) => {
                if (chat.messages && chat.messages.length > 0) {
                    const latestMessage = chat.messages[chat.messages.length - 1];
                    if (
                        latestMessage.sender === 'client' &&
                        (!chat.lastChecked || latestMessage.timestamp.toMillis() > chat.lastChecked.toMillis())
                    ) {
                        // Jeśli najnowsza wiadomość od klienta jest nowsza niż lastChecked, ustaw unread na true
                        updateDoc(doc(db, 'chat', chat.id), { unread: true });
                    }
                }
            });

            setChats(chatsData.filter(chat => !chat.closed || (chat.messages && chat.messages.length > 0)));

            setLoading(false);
        });

        return unsubscribe;
    };

    const handleChatSelect = async (chat) => {
        setSelectedChat(chat);

        // Aktualizuj unread i lastChecked
        await updateDoc(doc(db, 'chat', chat.id), { unread: false, lastChecked: new Date() });

        if (!chat.active && !chat.closed) {
            await updateDoc(doc(db, 'chat', chat.id), { active: true });

            // Dodaj wiadomość "połączono z doradcą"
            const chatRef = doc(db, 'chat', chat.id);
            const chatSnap = await getDoc(chatRef);
            if (chatSnap.exists()) {
                const chatData = chatSnap.data();
                const newMessage = { text: 'połączono z doradcą', sender: 'admin', timestamp: new Date() };
                const updatedMessages = [...(chatData.messages || []), newMessage];
                await updateDoc(chatRef, {
                    messages: updatedMessages,
                });
            }
        }

        resetInactivityTimer();  // Resetujemy timer bezczynności po wybraniu czatu
    };

    const handleSendMessage = async (text) => {
        if (!selectedChat) return;

        const adminMessage = { text, sender: 'admin', timestamp: new Date() };
        const chatRef = doc(db, 'chat', selectedChat.id);

        await updateDoc(chatRef, {
            messages: [...messages, adminMessage],
            active: true,
            lastChecked: new Date(),
        });

        setShouldScrollToBottom(true);

        resetInactivityTimer();  // Resetujemy timer bezczynności po wysłaniu wiadomości
    };


    const handleCloseChat = async () => {
        if (!selectedChat || !selectedChat.id) return;  // Sprawdzenie, czy jest wybrany czat

        const chatRef = doc(db, 'chat', selectedChat.id);

        clearTimeout(inactivityTimer.current);  // Zatrzymanie timera bezczynności

        try {
            const chatSnap = await getDoc(chatRef);
            if (chatSnap.exists()) {
                await updateDoc(chatRef, { active: false, closed: true, closedWho: 'Doradca' });
                console.log('Czat został pomyślnie zamknięty.');
            } else {
                console.warn('Dokument czatu nie istnieje.');
            }
        } catch (error) {
            console.error('Błąd podczas zamykania czatu:', error);
        }

        setSelectedChat(null);
        setMessages([]);
    };

    const handleDeleteChat = async () => {
        if (!selectedChat) return;

        const chatRef = doc(db, 'chat', selectedChat.id);
        await deleteDoc(chatRef);

        setSelectedChat(null);
        setMessages([]);

        setChats(prevChats => prevChats.filter(chat => chat.id !== selectedChat.id));
    };

    const formatDate = (timestamp) => {
        if (timestamp && typeof timestamp.toDate === 'function') {
            return timestamp.toDate().toLocaleString();
        } else if (timestamp instanceof Date) {
            return timestamp.toLocaleString();
        }
        return 'Brak daty';
    };

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(handleCloseChat, 10 * 60 * 1000);  // 10 minut bezczynności
    };


    return (
        <div className="admin-chats-container">
            <div className="chat-list">
                <h2>Aktywne czaty</h2>
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className={`chat-list-item ${selectedChat?.id === chat.id ? 'selected' : ''}`}
                        onClick={() => handleChatSelect(chat)}
                    >
                        {chat.unread && selectedChat?.id !== chat.id && <span className="unread-indicator">❗</span>}
                        <span className="chat-title">
                            {chat.formData?.funeralHomeName ? `Wybrany dom: ${chat.formData.funeralHomeName}` : 'Czat bez tytułu'}
                        </span>
                        <span className="chat-timestamp">{formatDate(chat.timestamp)}</span>
                    </li>
                ))}
                {chats.length === 0 && !loading && <p>Brak czatów do wyświetlenia.</p>}
            </div>
            <div className="chat-details">
                {selectedChat ? (
                    <>
                        <div className="chat-header">
                            <h3>Wybrany dom: {selectedChat.formData?.funeralHomeName || 'Anonim'}</h3>
                            {!selectedChat.closed && (
                                <button className="close-chat-button" onClick={handleCloseChat}>
                                    Zakończ czat
                                </button>
                            )}
                            <button className="delete-chat-button" onClick={handleDeleteChat}>
                                Usuń czat
                            </button>
                        </div>
                        <div className="chat-messages" ref={messagesContainerRef}>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.sender}`}
                                    style={{
                                        alignSelf: msg.sender === 'client' ? 'flex-start' : 'flex-end',
                                        backgroundColor: msg.sender === 'client' ? '#e1ffc7' : '#d1ecf1',
                                    }}
                                >
                                    <span
                                        className="sender-name">{msg.sender === 'client' ? 'Klient' : 'Doradca'}</span>
                                    <p>{msg.text}</p>
                                    <span className="timestamp">{formatDate(msg.timestamp)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            {selectedChat.closed ? (
                                <p>Konwersacja zakończona przez {selectedChat.closedWho}</p>  // Wyświetlanie zamykającego czat
                            ) : (
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
                            )}
                        </div>
                    </>
                ) : (
                    <p>Wybierz czat, aby zobaczyć szczegóły.</p>
                )}
            </div>
        </div>
    );
};

export default AdminChats;
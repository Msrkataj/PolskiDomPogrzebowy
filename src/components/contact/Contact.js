import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '../../../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { faMapMarkerAlt, faClock, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Image from "next/image";
import consultantIcon from '../../../public/assets/icons/consultant.png';
import Link from "next/link";
const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'contactMessages'), {
                ...formData,
                timestamp: Timestamp.now()
            });
            setIsSubmitted(true);
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div id="" className="contact">
            <div className="contact__wrapper">
                <h1 className="contact__title">Kontakt</h1>
                <p className="contact__subtitle">
                    Jesteśmy tutaj, aby pomóc Ci w każdej chwili. Jeśli masz pytania, potrzebujesz wsparcia lub chcesz
                    dowiedzieć się więcej o naszych usługach, skontaktuj się z nami za pomocą poniższych informacji.
                </p>
                <div className="contact__card">
                    <h2 className="contact__section-title">Dane kontaktowe</h2>
                    <div className="contact__details">
                        <div className="contact__item">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="contact__icon"/>
                            <div>
                                <p className="contact__item-title">Adres główny biura:</p>
                                <p className="contact__item-content">Dom Pogrzebowy 24<br/>ul. Przykładowa 123<br/>00-001
                                    Warszawa</p>
                            </div>
                        </div>
                        <div className="contact__item">
                            <FontAwesomeIcon icon={faClock} className="contact__icon"/>
                            <div>
                                <p className="contact__item-title">Godziny otwarcia:</p>
                                <p className="contact__item-content">Poniedziałek - Piątek: 8:00 - 18:00<br/>Sobota:
                                    9:00 - 14:00<br/>Niedziela: Zamknięte</p>
                            </div>
                        </div>
                        <div className="contact__item">
                            <FontAwesomeIcon icon={faEnvelope} className="contact__icon"/>
                            <div>
                                <p className="contact__item-title">E-mail:</p>
                                <p className="contact__item-content">kontakt@dompogrzebowy24.pl</p>
                            </div>
                        </div>
                        <div className="contact__item">
                            <FontAwesomeIcon icon={faPhoneAlt} className="contact__icon"/>
                            <div>
                                <p className="contact__item-title">Telefon kontaktowy:</p>
                                <p className="contact__item-content">+48 123 456 789</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact__social">
                    <h2 className="contact__section-title">Śledź nas w mediach społecznościowych</h2>
                    <p className="contact__social-subtitle">Aby być na bieżąco</p>
                    <div className="contact__social-links">
                        <Link href="#" className="contact__social-link">
                            <FontAwesomeIcon icon={faFacebookF} className="fa-2xl"/> Polskidompogrzebowy
                        </Link>
                        <Link href="#" className="contact__social-link">
                            <FontAwesomeIcon icon={faInstagram} className="fa-2xl"/> Polskidompogrzebowy
                        </Link>
                    </div>
                </div>
                <div className="contact__form">
                    <h2 className="contact__section-title">Formularz kontaktowy</h2>
                    <div className="contact__form-main">
                        {isSubmitted && (
                            <p className="contact__success-message">Wiadomość została wysłana pomyślnie!</p>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="contact__form-group">
                                <label htmlFor="fullName">Imię i Nazwisko</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="contact__form-group">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="contact__form-group">
                                <label htmlFor="phone">Numer Telefonu</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="contact__form-group">
                                <label htmlFor="subject">Temat</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="contact__form-group">
                                <label htmlFor="message">Treść wiadomości</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="contact__form-submit">Wyślij</button>
                        </form>
                    </div>
                </div>
                <div className="contact-chat contact__social">
                    <h2 className="contact__section-title">Czat na żywo</h2>
                    <p className="contact-chatsubtitle">Jeśli masz pilne pytanie, skorzystaj z czatu na żywo i
                        porozmawiaj z naszym konsultantem w czasie rzeczywistym.</p>
                    <div className="contact-chat-main">
                        <div className="option-select">
                            <a>
                                <Image src={consultantIcon} alt="Consultant" width={32} height={32}/>
                                <p>Rozpocznij czat</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
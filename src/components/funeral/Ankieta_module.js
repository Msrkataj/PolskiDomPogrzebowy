import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, query, where, collection, getDocs, updateDoc, arrayUnion } from 'firebase/firestore'; // Używamy odpowiednich metod
import { db } from '../../../firebase';
import dayjs from 'dayjs';
import Image from 'next/image';
import supportIcon from '../../../public/assets/icons/support.webp';

const Ankieta = () => {
    const [rating, setRating] = useState(0);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sprawdź, czy formId istnieje
        if (!id) {
            alert('Nie znaleziono numeru ID formularza.');
            return;
        }

        const date = dayjs().format('DD.MM.YYYY');

        try {
            // Krok 1: Pobierz dokument formularza z kolekcji `forms`, aby znaleźć `funeralHomeName`
            const formDocRef = doc(db, 'forms', id);
            const formSnapshot = await getDoc(formDocRef);

            if (!formSnapshot.exists()) {
                alert('Nie znaleziono formularza.');
                return;
            }

            const formData = formSnapshot.data();
            const funeralHomeName = formData.funeralHomeName; // Pobieramy funeralHomeName z formularza

            if (!funeralHomeName) {
                alert('Formularz nie zawiera nazwy domu pogrzebowego.');
                return;
            }

            // Krok 2: Znajdź dokument w kolekcji `domyPogrzebowe`, który ma odpowiedni `funeralHomeName`
            const funeralHomeQuery = query(
                collection(db, 'domyPogrzebowe'),
                where('funeralHomeName', '==', funeralHomeName)
            );
            const funeralHomeSnapshot = await getDocs(funeralHomeQuery);

            if (funeralHomeSnapshot.empty) {
                alert('Nie znaleziono domu pogrzebowego o podanej nazwie.');
                return;
            }

            const funeralHomeDocRef = funeralHomeSnapshot.docs[0].ref; // Pobieramy referencję do dokumentu domu pogrzebowego

            // Krok 3: Zaktualizuj dokument `domyPogrzebowe`, dodając nową recenzję w polu `reviews`
            await updateDoc(funeralHomeDocRef, {
                reviews: arrayUnion({
                    rating: rating.toString(),
                    author,
                    text,
                    date,
                }),
            });

            setSubmitted(true);
            alert('Dziękujemy za Twoją opinię!');
        } catch (error) {
            console.error('Błąd przy zapisie opinii:', error);
            alert('Wystąpił błąd podczas przesyłania opinii.');
        }
    };

    return (
        <div className="ankieta-container">
            <Image
                src={supportIcon}
                alt="Logo"
                width={100}
                height={100}
                className="funeralHomeLogo"
            />
            <h1>Uwiecznij swoje doświadczenie</h1>
            {!submitted ? (
                <form onSubmit={handleSubmit} className="ankieta-form">
                    <div className="rating-section">
                        <h2>Twoja ocena</h2>
                        <div className="stars">
                            {[...Array(5)].map((_, index) => (
                                <span
                                    key={index}
                                    className={`star ${index < rating ? 'filled' : ''}`}
                                    onClick={() => setRating(index + 1)}
                                >
                                    &#9733;
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="author-section">
                        <label htmlFor="author">Twoje imię</label>
                        <input
                            id="author"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Wpisz swoje imię"
                            required
                        />
                    </div>

                    <div className="text-section">
                        <label htmlFor="text">Twoja opinia</label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Wpisz swoją opinię"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">Wyślij opinię</button>
                </form>
            ) : (
                <p>Dziękujemy za Twoją opinię!</p>
            )}
        </div>
    );
};

export default Ankieta;

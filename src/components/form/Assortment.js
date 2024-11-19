// Assortment.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../../../firebase';
import { collection, doc, getDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";
import Image from 'next/image';
import StepNavigation from "@/components/StepNavigation";
import { v4 as uuidv4 } from 'uuid';

const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
        return "0.00";
    }
    return numericPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00', '');
};

const Assortment = () => {
    const [budget, setBudget] = useState('');
    const [assortyment, setAssortyment] = useState([]);
    const [filteredAssortyment, setFilteredAssortyment] = useState([]);
    const [formType, setFormType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('coffins');
    const [selectedType, setSelectedType] = useState('stolen');
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const cartModalRef = useRef(null);
    const [showNotification, setShowNotification] = useState(false);
    const [countByCategory, setCountByCategory] = useState({});
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const [currentStep, setCurrentStep] = useState('assortyment');
    const router = useRouter();

    useEffect(() => {
        const fetchFormData = async () => {
            const formId = localStorage.getItem('formId');
            if (formId) {
                try {
                    const formRef = doc(db, 'forms', formId);
                    const formSnap = await getDoc(formRef);
                    if (formSnap.exists()) {
                        const formData = formSnap.data();
                        setFormType(formData.formType);
                        fetchFuneralHomeAssortment(formData.funeralHomeName);
                    } else {
                        console.error('Dokument forms nie istnieje w Firestore');
                    }
                } catch (error) {
                    console.error('Błąd pobierania danych formularza:', error);
                }
            } else {
                console.error('Nie znaleziono ID formularza w localStorage.');
            }
        };

        fetchFormData();
    }, [selectedCategory]);

    useEffect(() => {
        filterAssortment();
    }, [assortyment, selectedCategory, selectedType, budget]);

    const handleSaveAndNavigate = async (step) => {
        await proceedToSummary();
        setCurrentStep(step);
        await router.push(`/${step}`);
    };

    const fetchFuneralHomeAssortment = async (funeralHomeName) => {
        try {
            const q = query(collection(db, 'domyPogrzebowe'), where('funeralHomeName', '==', funeralHomeName));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const funeralHomeDoc = querySnapshot.docs[0];
                const assortymentData = funeralHomeDoc.data().assortment || [];
                const musicData = funeralHomeDoc.data().music || [];
                // Dodajemy kategorię 'music' do elementów muzycznych
                const musicItems = musicData.map(item => ({ ...item, category: 'music' }));
                const combinedAssortyment = [...assortymentData, ...musicItems];
                setAssortyment(combinedAssortyment);
            } else {
                console.error('Dokument domyPogrzebowe nie istnieje w Firestore');
            }
        } catch (error) {
            console.error('Błąd pobierania asortymentu:', error);
        }
    };

    const filterAssortment = useCallback(() => {
        const filtered = assortyment.filter(item => {
            if (selectedCategory === 'coffins' || selectedCategory === 'urns') {
                return item.category === selectedCategory &&
                    item.type?.toLowerCase() === selectedType &&
                    (budget === '' || item.price <= parseFloat(budget));
            } else {
                return item.category === selectedCategory &&
                    (budget === '' || item.price <= parseFloat(budget));
            }
        });

        setFilteredAssortyment(filtered);
        setCurrentIndex(null);
    }, [assortyment, selectedCategory, selectedType, budget]);

    const handleItemClick = (index) => {
        // Dla kategorii 'music' nie rozwijamy elementu
        if (filteredAssortyment[index].category !== 'music') {
            setCurrentIndex(currentIndex === index ? null : index);
            setCurrentImageIndex(0); // Resetowanie indeksu obrazu
            setShowValidationMessage(false); // Zamknięcie okna walidacji po otwarciu produktu
        }
    };

    const handlePreviousImage = (e) => {
        e.stopPropagation();
        const imagesArray = filteredAssortyment[currentIndex].imageUrls || [];
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesArray.length) % imagesArray.length);
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        const imagesArray = filteredAssortyment[currentIndex].imageUrls || [];
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesArray.length);
    };

    const handleAddToCart = (item) => {
        const newItem = { ...item, category: selectedCategory, id: uuidv4() };
        setCart([...cart, newItem]);
        localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };


    const handleRemoveFromCart = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };


    const handleShowCart = () => {
        const newCountByCategory = cart.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = 0;
            }
            acc[item.category]++;
            return acc;
        }, {});

        setCountByCategory(newCountByCategory);
        setShowCart(true);
        document.body.classList.add('no-scroll');
    };

    const handleHideCart = () => {
        setShowCart(false);
        document.body.classList.remove('no-scroll');
    };

    const handleSummary = async () => {
        const newCountByCategory = cart.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = 0;
            }
            acc[item.category]++;
            return acc;
        }, {});

        setCountByCategory(newCountByCategory);

        const validationMessages = [];
        const categoryNames = {
            coffins: 'trumny',
            urns: 'urny',
            wreaths: 'wieńce kwiatowe',
            crosses: 'krzyże',
            plaques: 'tabliczki',
            music: 'odprawy muzyczne'
        };

        for (const [category, count] of Object.entries(newCountByCategory)) {
            if (count > 1 && category !== 'wreaths') {
                validationMessages.push(`Czy na pewno chcesz dodać ${count} sztuki kategorii ${categoryNames[category]}?`);
            }
        }

        if (validationMessages.length > 0) {
            setValidationMessage(validationMessages);
            setShowValidationMessage(true);
        } else {
            proceedToSummary();
        }
    };

    const proceedToSummary = async () => {
        const formId = localStorage.getItem('formId');
        if (!formId) {
            alert('Nie znaleziono ID formularza. Upewnij się, że jest zapisane w local storage.');
            return;
        }

        try {
            const formRef = doc(db, 'forms', formId);
            await updateDoc(formRef, {
                selectedItems: cart,
                timestamp: new Date()
            });
            console.log("Dane zapisane w formularzu z ID: ", formId);
            setCart([]);
            await router.push("/podsumowanie");
            handleHideCart();
            localStorage.removeItem('cart');
        } catch (error) {
            console.error("Błąd przy zapisie danych: ", error);
            alert("Nie udało się zapisać danych. Spróbuj ponownie.");
        }
    };

    useEffect(() => {
        if (showValidationMessage) {
            document.body.style.overflow = 'hidden'; // Blokujemy przewijanie strony
        } else {
            document.body.style.overflow = ''; // Przywracamy normalne przewijanie
        }
    }, [showValidationMessage]);

    const handleConfirm = () => {
        setShowValidationMessage(false);
        proceedToSummary();
    };

    const categoryNames = {
        coffins: 'Trumny',
        urns: 'Urny',
        wreaths: 'Wieńce Kwiatowe',
        crosses: 'Krzyże',
        plaques: 'Tabliczki',
        music: 'Odprawy Muzyczne'
    };

    return (
        <div className="container">
            <div className="navigation-buttons">
                <button className="nav-button" onClick={() => handleSaveAndNavigate('formularz-trzeci')}>← Cofnij</button>
                <button className="nav-button" onClick={() => handleSaveAndNavigate('podsumowanie')}>Dalej →</button>
            </div>
            <div className="steps-assortment">
                <StepNavigation currentStep={currentStep} setCurrentStep={setCurrentStep} handleSaveAndNavigate={handleSaveAndNavigate} />
            </div>
            <div className="assortment-container">
                <h1>Wybierz asortyment</h1>
                <div className="budget-input">
                    <label>Podaj swój budżet, zaproponujemy Ci najlepszy zestaw do Twoich możliwości:</label>
                    <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                        <option value="">Wybierz budżet</option>
                        <option value="4000">do 4000zł</option>
                        <option value="6000">do 6000zł</option>
                        <option value="8000">do 8000zł</option>
                        <option value="8000+">powyżej 8000zł</option>
                    </select>
                </div>
                <div className="category-buttons">
                    <button onClick={() => setSelectedCategory('coffins')}
                            className={selectedCategory === 'coffins' ? 'selected' : ''}>Trumny
                    </button>
                    <button onClick={() => setSelectedCategory('urns')}
                            className={selectedCategory === 'urns' ? 'selected' : ''}>Urny
                    </button>
                    <button onClick={() => setSelectedCategory('wreaths')}
                            className={selectedCategory === 'wreaths' ? 'selected' : ''}>Wieńce Kwiatowe
                    </button>
                    <button onClick={() => setSelectedCategory('crosses')}
                            className={selectedCategory === 'crosses' ? 'selected' : ''}>Krzyże
                    </button>
                    <button onClick={() => setSelectedCategory('plaques')}
                            className={selectedCategory === 'plaques' ? 'selected' : ''}>Tabliczki
                    </button>
                    <button onClick={() => setSelectedCategory('music')}
                            className={selectedCategory === 'music' ? 'selected' : ''}>Odprawy Muzyczne
                    </button>
                </div>
                {(selectedCategory === 'coffins' || selectedCategory === 'urns') && (
                    <div className="type-buttons">
                        <h3>Wybierz typ:</h3>
                        <button onClick={() => setSelectedType('stolen')}
                                className={selectedType === 'stolen' ? 'selected' : ''}>Kamienna
                        </button>
                        <button onClick={() => setSelectedType('wooden')}
                                className={selectedType === 'wooden' ? 'selected' : ''}>Drewniana
                        </button>
                    </div>
                )}
                <h2>Lista produktów:</h2>
                <div className="assortment-list">
                    {filteredAssortyment.length > 0 ? (
                        filteredAssortyment.map((item, index) => (
                            <div
                                key={index}
                                className={`assortment-item ${currentIndex === index ? 'expanded' : ''}`}
                                onClick={() => handleItemClick(index)}
                            >
                                <div className="assortment-summary">
                                    <h3>{item.name}</h3>
                                    {currentIndex !== index && (
                                        <>
                                            <p>Cena: {formatPrice(item.price)} PLN</p>
                                            {item.category !== 'music' && item.imageUrls && item.imageUrls.length > 0 && (
                                                <div className="image-container">
                                                    <Image src={item.imageUrls[0]} alt={item.name} fill
                                                           style={{objectFit: 'contain'}}
                                                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(item);
                                    }}>Dodaj +
                                    </button>
                                </div>
                                {currentIndex === index && item.category !== 'music' && (
                                    <div className="assortment-details">
                                        <p>Cena: {formatPrice(item.price)} PLN</p>
                                        <p>Producent: {item.producent}</p>
                                        <p>Dostępność: {item.availability}</p>
                                        <p>Opis: {item.text}</p>
                                        {item.build && <p>Materiał: {item.build}</p>}

                                        {item.imageUrls && item.imageUrls.length > 0 && (
                                            <div className="expanded-image-container">
                                                <Image
                                                    src={item.imageUrls[currentImageIndex]}
                                                    alt={item.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                        )}
                                        <div className="image-navigation" onClick={(e) => e.stopPropagation()}>
                                            <button onClick={handlePreviousImage}><FontAwesomeIcon
                                                icon={faArrowLeft} /></button>
                                            <button onClick={handleNextImage}><FontAwesomeIcon icon={faArrowRight} />
                                            </button>
                                        </div>
                                        <button onClick={() => handleAddToCart(item)}>Dodaj +</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Brak asortymentu w wybranej kategorii.</p>
                    )}
                </div>
                {showNotification && (
                    <div className="notification-assortment">
                        Produkt został dodany do koszyka!
                    </div>
                )}
                {showCart && (
                    <>
                        <div className="cart-overlay" onClick={handleHideCart}></div>
                        <div className="cart-modal" ref={cartModalRef}>
                            <h4>Twój zestaw:</h4>
                            {Object.keys(countByCategory).map((category) => (
                                <div key={category} className="cart-category">
                                    <h5>{categoryNames[category]}</h5>
                                    <ul>
                                        {cart
                                            .filter(item => item.category === category)
                                            .map((item, index) => (
                                                <li key={item.id}>
                                                    <span>{index + 1}</span>
                                                    {item.category !== 'music' ? (
                                                        item.imageUrls && item.imageUrls.length > 0 ? (
                                                            <Image
                                                                src={item.imageUrls[0]}
                                                                alt={item.name}
                                                                width={100}
                                                                height={100}
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            <span>Brak zdjęcia</span>
                                                        )
                                                    ) : null}
                                                    <div className="item-details">
                                                        <span className="item-name">{item.name}</span>
                                                        <span className="item-price">{formatPrice(item.price)} PLN</span>
                                                    </div>
                                                    <button className="remove-button"
                                                            onClick={() => handleRemoveFromCart(item.id)}>Usuń
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                            <div className="cart-total">
                                <h5>Suma koszyka:</h5>
                                <p>{formatPrice(cart.reduce((total, item) => total + parseFloat(item.price), 0))} PLN</p>
                            </div>

                            <button className="close-button" onClick={handleHideCart}>Zamknij</button>
                            <button className="summary-button" onClick={handleSummary}>Podsumowanie</button>
                        </div>
                    </>
                )}
                {showValidationMessage && (
                    <>
                        <div className="validation-overlay"></div> {/* Przyciemnienie tła */}
                        <div className="validation-message">
                            {validationMessage.map((message, index) => (
                                <p key={index}>{message}</p>
                            ))}
                            <button onClick={handleConfirm}>Potwierdź i przejdź do podsumowania</button>
                            <button onClick={() => setShowValidationMessage(false)}>Wróć</button>
                        </div>
                    </>
                )}
                <div className="assortment-buttons">
                    <button onClick={handleShowCart}>Pokaż wybrany zestaw ({cart.length})</button>
                    <div className="summary-button">
                        <button onClick={handleSummary}>Podsumowanie</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Assortment;

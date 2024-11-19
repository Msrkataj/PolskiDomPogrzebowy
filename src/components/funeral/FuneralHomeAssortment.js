import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Assortment from "./AddAsortment";
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";
import Image from 'next/image';
import AuthGuardFuneral from "@/components/panel/AuthGuardFuneral";

const FuneralHomeAssortment = () => {
    const [assortment, setAssortment] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [loading, setLoading] = useState(true);
    const [editIndex, setEditIndex] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [originalEditItem, setOriginalEditItem] = useState(null);
    const [currentImageIndexes, setCurrentImageIndexes] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [newProducts, setNewProducts] = useState([{
        id: uuidv4(),
        name: '',
        category: 'coffins',
        price: '',
        availability: 'Dostępna od ręki',
        producent: '',
        text: '',
        build: '',
        type: '',
        imageUrls: [],
    }]);
    const [newProductCounter, setNewProductCounter] = useState(1);

    useEffect(() => {
        const fetchAssortment = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('Brak identyfikatora użytkownika.');
                return;
            }

            const docRef = doc(db, 'domyPogrzebowe', userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const fetchedAssortment = data.assortment || [];
                const fetchedMusic = data.music || [];

                // Połącz asortyment i muzykę w jedno pole assortment
                const combinedAssortment = [...fetchedAssortment, ...fetchedMusic.map(music => ({ ...music, category: 'music' }))];
                setAssortment(combinedAssortment);
            } else {
                console.error('Nie znaleziono dokumentu.');
            }

            setLoading(false);
        };

        fetchAssortment();
    }, []);

    const handleDeleteClick = async (index) => {
        const itemToDelete = assortment[index];
        const updatedAssortment = [...assortment];
        updatedAssortment.splice(index, 1);

        setAssortment(updatedAssortment);

        const userId = localStorage.getItem('userId');
        const docRef = doc(db, 'domyPogrzebowe', userId);

        try {
            // Usuń z listy, zachowując połączoną tablicę
            await setDoc(docRef, {
                assortment: updatedAssortment
            }, { merge: true });
            console.log('Produkt został usunięty.');
        } catch (error) {
            console.error('Błąd podczas usuwania produktu:', error);
        }
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const handleTypeFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const filteredAssortment = assortment.filter(item =>
        (filterCategory === 'all' || item.category === filterCategory) &&
        (filterType === 'all' || item.type === filterType)
    );

    const sortedProducts = React.useMemo(() => {
        let sortableProducts = [...filteredAssortment];
        if (sortConfig.key !== null) {
            sortableProducts.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableProducts;
    }, [filteredAssortment, sortConfig]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditItem({ ...assortment[index] });
        setOriginalEditItem({ ...assortment[index] });
        setIsModalOpen(true);
    };

    const handleSaveClick = async (index) => {
        const updatedAssortment = [...assortment];
        updatedAssortment[index] = editItem; // Zaktualizuj produkt w lokalnym stanie

        setAssortment(updatedAssortment);
        setEditIndex(null);
        setEditItem(null);
        setOriginalEditItem(null);
        setIsModalOpen(false);

        const userId = localStorage.getItem('userId');
        const docRef = doc(db, 'domyPogrzebowe', userId);

        try {
            // Zapisz zaktualizowany asortyment w Firestore
            await setDoc(docRef, { assortment: updatedAssortment }, { merge: true });
            console.log('Zaktualizowano asortyment.');
        } catch (error) {
            console.error('Błąd podczas zapisywania asortymentu:', error);
        }
    };

    const handleCancelClick = () => {
        setEditIndex(null);
        setEditItem(null);
        setOriginalEditItem(null);
        setIsModalOpen(false);
    };

    const handleImageRemove = (index) => {
        const updatedImages = editItem.imageUrls.filter((_, i) => i !== index);
        setEditItem({ ...editItem, imageUrls: updatedImages });
    };

    const handleImageAdd = (e) => {
        const files = e.target.files;
        const newImageUrls = [...(editItem.imageUrls || [])];

        for (let file of files) {
            const reader = new FileReader();
            reader.onload = (event) => {
                newImageUrls.push(event.target.result);
                setEditItem({ ...editItem, imageUrls: newImageUrls });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setEditItem({ ...editItem, [field]: value });
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleAddSaveClick = async () => {
        const updatedAssortment = [...assortment, ...newProducts];
        setAssortment(updatedAssortment);
        setNewProducts([{
            id: uuidv4(),
            name: '',
            category: 'coffins',
            price: '',
            availability: 'Dostępna od ręki',
            producent: '',
            text: '',
            build: '',
            type: '',
            imageUrls: [],
        }]);
        setIsAddModalOpen(false);

        const userId = localStorage.getItem('userId');
        const docRef = doc(db, 'domyPogrzebowe', userId);

        try {
            // Zapisz zaktualizowany asortyment w Firestore
            await setDoc(docRef, { assortment: updatedAssortment }, { merge: true });
            console.log('Dodano nowy produkt.');
        } catch (error) {
            console.error('Błąd podczas zapisywania asortymentu:', error);
        }
    };

    const handleAddCancelClick = () => {
        setIsAddModalOpen(false);
    };

    const handlePrevImage = (index) => {
        setCurrentImageIndexes((prevIndexes) => ({
            ...prevIndexes,
            [index]: prevIndexes[index] > 0 ? prevIndexes[index] - 1 : assortment[index].imageUrls.length - 1,
        }));
    };

    const handleNextImage = (index) => {
        setCurrentImageIndexes((prevIndexes) => ({
            ...prevIndexes,
            [index]: prevIndexes[index] < assortment[index].imageUrls.length - 1 ? prevIndexes[index] + 1 : 0,
        }));
    };

    const translateCategory = (category) => {
        const translations = {
            'urns': 'Urny',
            'coffins': 'Trumny',
            'wreaths': 'Wieńce',
            'plaques': 'Tabliczki',
            'crosses': 'Krzyże',
            'music': 'Odprawy muzyczne'
        };
        return translations[category] || category;
    };

    const translateType = (type) => {
        const translations = {
            'wooden': 'Drewniana',
            'stolen': 'Kamienna',
            'ceramic': 'Ceramiczna',
            'glass': 'Szklana',
        };
        return translations[type] || type;
    };

    if (loading) return <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Ładowanie danych...</div>
    </div>

    return (
        <div className={isModalOpen ? "container assortment-none" : "container"}>
            <Link className="back-link" href="/funeral/panel">
                Wróć do panelu
            </Link>
            <h1>Twój asortyment</h1>
            <div className="filter-bar">
                <select onChange={handleFilterChange}>
                    <option value="all">Wszystkie kategorie</option>
                    <option value="urns">Urny</option>
                    <option value="coffins">Trumny</option>
                    <option value="wreaths">Wieńce</option>
                    <option value="plaques">Tabliczki</option>
                    <option value="crosses">Krzyże</option>
                    <option value="music">Odprawy muzyczne</option>
                </select>
                {filterCategory !== 'music' && (
                    <select onChange={handleTypeFilterChange}>
                        <option value="all">Wszystkie typy</option>
                        <option value="wooden">Drewniana</option>
                        <option value="stolen">Kamienna</option>
                        <option value="ceramic">Ceramiczna</option>
                        <option value="glass">Szklana</option>
                    </select>
                )}
            </div>
            <table className="assortment-table">
                <thead>
                <tr>
                    <th>Miniaturka</th>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Typ</th>
                    <th>Dostępność</th>
                    <th>Cena</th>
                    <th>Producent</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((product, index) => (
                    <tr key={index}>
                        <td>
                            {product.imageUrls && product.imageUrls.length > 0 ? (
                                <Image
                                    src={product.imageUrls[currentImageIndexes[index] || 0]}
                                    alt={product.name}
                                    className="product-thumbnail"
                                    width={100}
                                    height={100}
                                    style={{ objectFit: 'cover' }}
                                />
                            ) : (
                                <span>Brak zdjęć</span>
                            )}
                        </td>
                        <td>{product.name}</td>
                        <td>{translateCategory(product.category)}</td>
                        <td>{translateType(product.type)}</td>
                        <td>{product.availability}</td>
                        <td>{product.price} PLN</td>
                        <td>{product.producent}</td>
                        <td>
                            <button onClick={() => handleEditClick(index)}>Edytuj</button>
                            <button onClick={() => handleDeleteClick(index)}>Usuń</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                {[...Array(Math.ceil(assortment.length / itemsPerPage)).keys()].map((number) => (
                    <button key={number + 1} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
            <button className="add-button" onClick={handleAddClick}>
                Dodaj nowy produkt
            </button>
            {isModalOpen && editItem && (
                <div className="modal-edit">
                    <div className="modal-content-funeral">
                        <h2>Edytuj produkt</h2>
                        <p>Nazwa:</p>
                        <input type="text" value={editItem.name} onChange={(e) => handleInputChange(e, 'name')} />
                        <p>Kategoria:</p>
                        <select value={editItem.category} onChange={(e) => handleInputChange(e, 'category')}>
                            <option value="urns">Urny</option>
                            <option value="coffins">Trumny</option>
                            <option value="wreaths">Wieńce</option>
                            <option value="plaques">Tabliczki</option>
                            <option value="crosses">Krzyże</option>
                            <option value="music">Odprawy muzyczne</option>
                        </select>

                        {/* Warunkowe renderowanie typu lub budulca */}
                        {['urns', 'coffins'].includes(editItem.category) ? (
                            <>
                                <p>Typ:</p>
                                <select value={editItem.type} onChange={(e) => handleInputChange(e, 'type')}>
                                    <option value="wooden">Drewniana</option>
                                    <option value="stolen">Kamienna</option>
                                    <option value="ceramic">Ceramiczna</option>
                                    <option value="glass">Szklana</option>
                                </select>
                            </>
                        ) : editItem.category !== 'music' ? (
                            <>
                                <p>Z czego wykonane:</p>
                                <input type="text" value={editItem.build} onChange={(e) => handleInputChange(e, 'build')} />
                            </>
                        ) : null}

                        <p>Dostępność:</p>
                        <select value={editItem.availability} onChange={(e) => handleInputChange(e, 'availability')}>
                            <option value="Dostępna od ręki">Dostępna od ręki</option>
                            <option value="Na zamówienie">Na zamówienie</option>
                        </select>
                        <p>Opis:</p>
                        <textarea className="modal-content-funeral-text" value={editItem.text} onChange={(e) => handleInputChange(e, 'text')} />
                        <p>Cena:</p>
                        <input type="number" value={editItem.price} onChange={(e) => handleInputChange(e, 'price')} />

                        {/* Sekcja dla zdjęć */}
                        {editItem.category !== 'music' && (
                            <>
                                <h3>Zdjęcia</h3>
                                <ul>
                                    {editItem.imageUrls && editItem.imageUrls.map((url, index) => (
                                        <li key={index} style={{ listStyleType: 'none', marginBottom: '10px' }}>
                                            <Image
                                                src={url}
                                                alt={`Zdjęcie ${index + 1}`}
                                                width={80}
                                                height={80}
                                                style={{ marginRight: '10px', objectFit: 'cover' }}
                                            />
                                            <button onClick={() => handleImageRemove(index)} style={{ marginLeft: '10px' }}>Usuń</button>
                                        </li>
                                    ))}
                                </ul>
                                <input type="file" multiple onChange={handleImageAdd} />
                            </>
                        )}

                        {/* Akcje w modalu */}
                        <div className="modal-actions">
                            <button onClick={() => handleSaveClick(editIndex)}>Zapisz</button>
                            <button onClick={handleCancelClick}>Anuluj</button>
                        </div>
                    </div>
                </div>
            )}
            {isAddModalOpen && (
                <div className="modal-add">
                    <div className="modal-content-add">
                        <Assortment
                            products={newProducts}
                            setProducts={setNewProducts}
                            productCounter={newProductCounter}
                            setProductCounter={setNewProductCounter}
                        />
                        <div className="modal-actions">
                            <button onClick={handleAddSaveClick}>Zapisz</button>
                            <button onClick={handleAddCancelClick}>Anuluj</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DashboardWithAuth = () => (
    <AuthGuardFuneral>
        <FuneralHomeAssortment />
    </AuthGuardFuneral>
);

export default DashboardWithAuth;

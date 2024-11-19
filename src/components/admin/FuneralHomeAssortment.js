import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import Assortment from "../funeral/AddAsortment";
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";
import { useRouter } from 'next/router';
import Image from 'next/image';
import AuthGuard from "@/components/panel/AuthGuard";

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
    const router = useRouter();
    const { homeId } = router.query;

    useEffect(() => {
        const fetchAssortment = async () => {
            if (!homeId) {
                console.error('Brak identyfikatora domu pogrzebowego.');
                return;
            }

            const docRef = doc(db, 'domyPogrzebowe', homeId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const fetchedAssortment = data.assortment || [];
                let fetchedMusic = data.music || [];

                // Jeśli 'music' nie jest tablicą, zamień na tablicę
                if (!Array.isArray(fetchedMusic)) {
                    fetchedMusic = [fetchedMusic];
                }

                const combinedAssortment = [...fetchedAssortment, ...fetchedMusic];
                setAssortment(combinedAssortment);
            } else {
                console.error('Nie znaleziono dokumentu.');
            }

            setLoading(false);
        };

        fetchAssortment();
    }, [homeId]);

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
        updatedAssortment[index] = editItem;

        // Sprawdź, czy kategoria, typ lub nazwa zostały zmienione
        if (
            originalEditItem.category !== editItem.category ||
            originalEditItem.type !== editItem.type ||
            originalEditItem.name !== editItem.name
        ) {
            await moveProductFiles(originalEditItem, editItem);
        }

        setAssortment(updatedAssortment);
        setEditIndex(null);
        setEditItem(null);
        setOriginalEditItem(null);
        setIsModalOpen(false);

        const docRef = doc(db, 'domyPogrzebowe', homeId);

        try {
            if (editItem.category === 'music') {
                await setDoc(docRef, { music: updatedAssortment.filter(item => item.category === 'music') }, { merge: true });
            } else {
                await setDoc(docRef, { assortment: updatedAssortment.filter(item => item.category !== 'music') }, { merge: true });
            }
            console.log('Zaktualizowano asortyment.');
        } catch (error) {
            console.error('Błąd podczas zapisywania asortymentu:', error);
        }
    };

    const moveProductFiles = async (oldProduct, newProduct) => {
        if (oldProduct.category === 'music') {
            return;
        }

        const storage = getStorage();

        const updatedImageUrls = [];

        for (let url of oldProduct.imageUrls) {
            const urlParts = url.split('/');
            const fileNameWithParams = urlParts[urlParts.length - 1];
            const fileName = fileNameWithParams.split('?')[0];

            const oldStoragePath = oldProduct.type
                ? `assortment/${oldProduct.category}/${oldProduct.type}/${oldProduct.name}/${fileName}`
                : `assortment/${oldProduct.category}/${oldProduct.name}/${fileName}`;

            const newStoragePath = newProduct.type
                ? `assortment/${newProduct.category}/${newProduct.type}/${newProduct.name}/${fileName}`
                : `assortment/${newProduct.category}/${newProduct.name}/${fileName}`;

            const oldRef = storageRef(storage, oldStoragePath);
            const newRef = storageRef(storage, newStoragePath);

            try {
                const fileData = await getDownloadURL(oldRef).then(async (url) => {
                    const response = await fetch(url);
                    return await response.blob();
                });

                await uploadBytes(newRef, fileData);
                await deleteObject(oldRef);

                const newUrl = await getDownloadURL(newRef);
                updatedImageUrls.push(newUrl);

            } catch (error) {
                console.error('Błąd podczas przenoszenia pliku:', error);
            }
        }

        setEditItem(prevEditItem => ({ ...prevEditItem, imageUrls: updatedImageUrls }));
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

    const handleImageAdd = async (e) => {
        const files = e.target.files;
        const newImageUrls = [...(editItem.imageUrls || [])];
        const storage = getStorage();

        for (let file of files) {
            const fileName = uuidv4() + "_" + file.name;
            const storagePath = editItem.type
                ? `assortment/${editItem.category}/${editItem.type}/${editItem.name}/${fileName}`
                : `assortment/${editItem.category}/${editItem.name}/${fileName}`;
            const fileRef = storageRef(storage, storagePath);

            try {
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);
                newImageUrls.push(url);
            } catch (error) {
                console.error('Błąd podczas przesyłania pliku:', error);
            }
        }

        setEditItem({ ...editItem, imageUrls: newImageUrls });
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

        const docRef = doc(db, 'domyPogrzebowe', homeId);

        try {
            await setDoc(docRef, {
                assortment: updatedAssortment.filter(item => item.category !== 'music'),
                music: updatedAssortment.filter(item => item.category === 'music')
            }, { merge: true });
            console.log('Dodano nowy produkt.');
        } catch (error) {
            console.error('Błąd podczas zapisywania asortymentu:', error);
        }
    };

    const handleAddCancelClick = () => {
        setIsAddModalOpen(false);
    };

    const handleDeleteClick = async (index) => {
        const itemToDelete = assortment[index];
        const updatedAssortment = [...assortment];
        updatedAssortment.splice(index, 1);

        setAssortment(updatedAssortment);

        const docRef = doc(db, 'domyPogrzebowe', homeId);

        try {
            if (itemToDelete.category === 'music') {
                const newMusicArray = updatedAssortment.filter(item => item.category === 'music');
                await setDoc(docRef, { music: newMusicArray.length === 1 ? newMusicArray[0] : newMusicArray }, { merge: true });
            } else {
                await setDoc(docRef, {
                    assortment: updatedAssortment.filter(item => item.category !== 'music')
                }, { merge: true });
            }
            console.log('Produkt został usunięty.');
        } catch (error) {
            console.error('Błąd podczas usuwania produktu:', error);
        }
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
            'stone': 'Kamienna',
            'ceramic': 'Ceramiczna',
            'glass': 'Szklana',
        };
        return translations[type] || type;
    };

    if (loading) {
        return <p>Ładowanie...</p>;
    }

    return (
        <div className={isModalOpen ? "container assortment-none" : "container"}>
            <Link className="back-link back-button" href="/admin/funerals">
                Wróć do domów pogrzebowych
            </Link>
            <h1>Asortyment:</h1>
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
                        <option value="stone">Kamienna</option>
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
                                    src={product.imageUrls[currentImageIndexes[index] || 0] || '/default-image.png'}
                                    alt={product.name || 'Product Image'}
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

                        {['urns', 'coffins'].includes(editItem.category) ? (
                            <>
                                <p>Typ:</p>
                                <select value={editItem.type} onChange={(e) => handleInputChange(e, 'type')}>
                                    <option value="wooden">Drewniana</option>
                                    <option value="stone">Kamienna</option>
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
                        <input type="text" value={editItem.text} onChange={(e) => handleInputChange(e, 'text')} />
                        <p>Cena:</p>
                        <input type="number" value={editItem.price} onChange={(e) => handleInputChange(e, 'price')} />

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

const FuneralHomeAssortmentWithAuth = () => (
    <AuthGuard>
        <FuneralHomeAssortment />
    </AuthGuard>
);

export default FuneralHomeAssortmentWithAuth;

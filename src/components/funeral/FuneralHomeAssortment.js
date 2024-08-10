import React, {useState, useEffect} from 'react';
import {db, storage} from '../../../firebase';
import {collection, getDocs, doc, getDoc, setDoc} from 'firebase/firestore';
import {getDownloadURL, listAll, ref} from 'firebase/storage';
import Assortment from "./AddAsortment";
import {v4 as uuidv4} from 'uuid';
import Link from "next/link";

const FuneralHomeAssortment = () => {
    const [assortment, setAssortment] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [sortConfig, setSortConfig] = useState({key: null, direction: null});
    const [loading, setLoading] = useState(true);
    const [editIndex, setEditIndex] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [currentImageIndexes, setCurrentImageIndexes] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');
    const [newProducts, setNewProducts] = useState([{
        id: uuidv4(),
        name: '',
        category: 'coffins',
        price: '',
        availability: 'Dostępna od ręki',
        producent: '',
        text: '',
        build: '',
        type: 'Drewniana',
        files: []
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
                const fetchedAssortment = data.assortyment || [];

                const assortmentWithImages = await Promise.all(fetchedAssortment.map(async product => {
                    const imagePath = product.type
                        ? `assortment/${product.category}/${product.type}/${product.name}`
                        : `assortment/${product.category}/${product.name}`;
                    try {
                        const imagesRef = ref(storage, imagePath);
                        const imagesList = await listAll(imagesRef);
                        const imageUrls = await Promise.all(imagesList.items.map(item => getDownloadURL(item)));
                        return {...product, imageUrls};
                    } catch (error) {
                        console.error('Błąd pobierania obrazów:', error);
                        return {...product, imageUrls: []};
                    }
                }));
                setAssortment(assortmentWithImages);
            } else {
                console.error('Nie znaleziono dokumentu.');
            }

            setLoading(false);
        };

        fetchAssortment();
    }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    };

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const filteredAssortment = assortment.filter(item => filterCategory === 'all' || item.category === filterCategory);

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
        setEditItem({...assortment[index]});
        setIsModalOpen(true);
    };

    const handleSaveClick = async (index) => {
        const updatedAssortment = [...assortment];
        updatedAssortment[index] = editItem;
        setAssortment(updatedAssortment);
        setEditIndex(null);
        setEditItem(null);
        setIsModalOpen(false);

        const userId = localStorage.getItem('userId');
        const docRef = doc(db, 'domyPogrzebowe', userId);
        await setDoc(docRef, {assortment: updatedAssortment}, {merge: true});
    };

    const handleCancelClick = () => {
        setEditIndex(null);
        setEditItem(null);
        setIsModalOpen(false);
    };

    const handleImageRemove = (index) => {
        const updatedImages = editItem.imageUrls.filter((_, i) => i !== index);
        setEditItem({...editItem, imageUrls: updatedImages});
    };

    const handleImageAdd = (e) => {
        const files = e.target.files;
        const newImageUrls = [...editItem.imageUrls];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event) => {
                newImageUrls.push(event.target.result);
                setEditItem({...editItem, imageUrls: newImageUrls});
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const handleInputChange = (e, field) => {
        setEditItem({...editItem, [field]: e.target.value});
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
            type: 'Drewniana',
            files: []
        }]);
        setIsAddModalOpen(false);

        const userId = localStorage.getItem('userId');
        const docRef = doc(db, 'domyPogrzebowe', userId);
        await setDoc(docRef, {assortment: updatedAssortment}, {merge: true});
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
            'wooden': 'Drewno',
            'woden': 'Drewno',
            'stolen': 'Kamień',
        };
        return translations[type] || type;
    };

    if (loading) {
        return <p>Ładowanie...</p>;
    }

    return (
        <div className={isModalOpen ? "container assortment-none" : "container"} >
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
            </div>
            <div className={isModalOpen ? "assortment assortment-none" : "assortment"}>
                {currentItems.map((product, index) => (
                    <div key={index} className="assortment-item">
                        <h2>{product.name}</h2>
                        {product.imageUrls.length > 0 ? (
                            <div className="image-slider-funeral">
                                <button onClick={() => handlePrevImage(index)}>←</button>
                                <img src={product.imageUrls[currentImageIndexes[index] || 0]} alt={product.name}/>
                                <button onClick={() => handleNextImage(index)}>→</button>
                            </div>
                        ) : (
                            <span>Brak zdjęć</span>
                        )}
                        <p>
                            <strong>Kategoria:</strong> {translateCategory(product.category)}
                        </p>
                        {product.type ?
                            <p>
                                <strong>Typ:</strong> {translateType(product.type)}
                            </p>
                            : null}
                        {product.build ?
                            <p>
                                <strong>Typ:</strong> {product.build}
                            </p>
                            : null}
                        <p>
                            <strong>Dostępność:</strong> {product.availability}
                        </p>
                        <p>
                            <strong>Opis:</strong> {product.text}
                        </p>
                        {product.type === null ? (
                            <p>
                                <strong>Materiał:</strong> {product.build}
                            </p>
                        ) : null}
                        <p>
                            <strong>Producent:</strong> {product.producent}
                        </p>
                        <p>
                            <strong>Cena:</strong> {product.price} PLN
                        </p>
                        <button onClick={() => handleEditClick(index)}>Edytuj</button>
                    </div>
                ))}
            </div>
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
                    <div className="modal-content">
                        <h2>Edytuj produkt</h2>
                        <p>Nazwa:</p>
                        <input type="text" value={editItem.name} onChange={(e) => handleInputChange(e, 'name')}/>
                        <p>Kategoria:</p>
                        <select value={editItem.category} onChange={(e) => handleInputChange(e, 'category')}>
                            <option value="urns">Urny</option>
                            <option value="coffins">Trumny</option>
                            <option value="wreaths">Wieńce</option>
                            <option value="plaques">Tabliczki</option>
                            <option value="crosses">Krzyże</option>
                            <option value="music">Odprawy muzyczne</option>
                        </select>
                        <p>Dostępność:</p>
                        <select value={editItem.availability} onChange={(e) => handleInputChange(e, 'availability')}>
                            <option value="Dostępna od ręki">Dostępna od ręki</option>
                            <option value="Na zamówienie">Na zamówienie</option>
                        </select>
                        <p>Opis:</p>
                        <input type="text" value={editItem.text} onChange={(e) => handleInputChange(e, 'text')}/>
                        <p>Cena:</p>
                        <input type="number" value={editItem.price} onChange={(e) => handleInputChange(e, 'price')}/>
                        <h3>Zdjęcia</h3>
                        <ul>
                            {editItem.imageUrls.map((url, index) => (
                                <li key={index} style={{listStyleType: 'none', marginBottom: '10px'}}>
                                    <img src={url} alt={`Zdjęcie ${index + 1}`} style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        marginRight: '10px'
                                    }}/>
                                    <button onClick={() => handleImageRemove(index)} style={{marginLeft: '10px'}}>Usuń
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <input type="file" multiple onChange={handleImageAdd}/>
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

export default FuneralHomeAssortment;

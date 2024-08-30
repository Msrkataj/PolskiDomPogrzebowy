import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Assortment = ({ products, setProducts, productCounter, setProductCounter }) => {
    const [expandedProductId, setExpandedProductId] = useState(null);

    const addProduct = () => {
        setProducts([...products, { id: uuidv4(), name: '', category: 'coffins', price: '', availability: 'Dostępna od ręki', producent: '', text: '', build: '', type: '', files: [] }]);
        setProductCounter(productCounter + 1);
    };

    const removeProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
        setProductCounter(productCounter - 1);
    };

    const handleProductChange = (id, field, value) => {
        setProducts(products.map(product => product.id === id ? { ...product, [field]: field === 'type' ? getEnglishType(value) : value } : product));
    };

    const handleFileChange = (id, files) => {
        setProducts(products.map(product => product.id === id ? { ...product, files } : product));
    };

    const getEnglishType = (type) => {
        switch (type) {
            case 'Drewniana':
                return 'wooden';
            case 'Kamienna':
                return 'stone';
            case 'Ceramiczna':
                return 'Ceramiczna'
            case 'Szklana':
                return 'Szklana'
            default:
                return type ? type.toLowerCase() : '';
        }
    };

    const toggleProduct = (id) => {
        setExpandedProductId(expandedProductId === id ? null : id);
    };

    return (
        <div className="formSection">
            <h2>Asortyment</h2>
            {products.map((product, index) => (
                <div key={product.id} className="productSection">
                    <div onClick={() => toggleProduct(product.id)}>
                        <h3>{product.name || 'Nowy produkt'} {expandedProductId === product.id ? '-' : '+'}</h3>
                    </div>
                    {expandedProductId === product.id && (
                        <>
                            <label>Nazwa produktu:</label>
                            <input
                                type="text"
                                value={product.name}
                                onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                                required
                            />
                            <label>Kategoria:</label>
                            <select
                                value={product.category}
                                onChange={(e) => handleProductChange(product.id, 'category', e.target.value)}
                                required
                            >
                                <option value="coffins">Trumny</option>
                                <option value="urns">Urny</option>
                                <option value="wreaths">Wieńce Kwiatowe</option>
                                <option value="plaques">Tabliczki</option>
                                <option value="crosses">Krzyże</option>
                                <option value="music">Odprawa Muzyczna</option>
                            </select>
                            <label>Cena:</label>
                            <input
                                type="number"
                                value={product.price}
                                onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                                required
                            />
                            <label>Dostępność:</label>
                            <select
                                value={product.availability}
                                onChange={(e) => handleProductChange(product.id, 'availability', e.target.value)}
                                required
                            >
                                <option value="Dostępna od ręki">Dostępna od ręki</option>
                                <option value="Na zamówienie">Na zamówienie</option>
                            </select>
                            {product.category !== 'music' && (
                                <>
                                    <label>Producent:</label>
                                    <input
                                        type="text"
                                        value={product.producent}
                                        onChange={(e) => handleProductChange(product.id, 'producent', e.target.value)}
                                    />
                                    <label>Opis:</label>
                                    <textarea
                                        value={product.text}
                                        onChange={(e) => handleProductChange(product.id, 'text', e.target.value)}
                                    />
                                    {product.category === 'coffins' || product.category === 'urns' ? (
                                        <>
                                            <label>Typ:</label>
                                            <select
                                                value={product.type}
                                                onChange={(e) => handleProductChange(product.id, 'type', e.target.value)}
                                            >
                                                <option value="wooden">Drewniana</option>
                                                <option value="stone">Kamienna</option>
                                                <option value="metal">Ceramiczna</option>
                                                <option value="stone">Szklana</option>
                                            </select>
                                        </>
                                    ) : (
                                        <>
                                        <label>Z czego wykonane:</label>
                                            <input
                                                type="text"
                                                value={product.build}
                                                onChange={(e) => handleProductChange(product.id, 'build', e.target.value)}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                            <label>Załaduj zdjęcia:</label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleFileChange(product.id, Array.from(e.target.files))}
                            />
                            {index > 0 && (
                                <button type="button" onClick={() => removeProduct(product.id)}>
                                    Usuń produkt
                                </button>
                            )}
                        </>
                    )}
                </div>
            ))}
            <button type="button" onClick={addProduct}>
                Dodaj kolejny produkt +
            </button>
        </div>
    );
};

export default Assortment;

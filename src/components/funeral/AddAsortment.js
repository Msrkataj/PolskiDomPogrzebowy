// Assortment.js (komponent do dodawania produktów)
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";

const Assortment = ({ products, setProducts, productCounter, setProductCounter }) => {
    const [expandedProductId, setExpandedProductId] = useState(null);

    const addProduct = () => {
        setProducts([...products, {
            id: uuidv4(),
            name: '',
            category: 'coffins',
            price: '',
            availability: 'Dostępna od ręki',
            producent: '',
            text: '',
            build: '',
            type: '',
            files: [],
            imageUrls: []
        }]);
        setProductCounter(productCounter + 1);
    };

    const removeProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
        setProductCounter(productCounter - 1);
    };

    const handleProductChange = async (id, field, value) => {
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) return;

        const oldProduct = { ...products[productIndex] };

        const updatedProduct = {
            ...oldProduct,
            [field]: field === 'type' ? getEnglishType(value) : value
        };

        const shouldMoveFiles = (field === 'category' || field === 'type' || field === 'name') && oldProduct.files && oldProduct.files.length > 0;

        const updatedProducts = [...products];
        updatedProducts[productIndex] = updatedProduct;
        setProducts(updatedProducts);

        if (shouldMoveFiles) {
            await moveProductFiles(oldProduct, updatedProduct);
        }
    };

    const handleFileChange = async (id, files) => {
        const storage = getStorage();
        const uploadedFiles = [];

        const product = products.find(product => product.id === id);

        for (let file of files) {
            const fileName = uuidv4() + "_" + file.name;
            const storagePath = product.type
                ? `assortment/${product.category}/${product.type}/${product.name}/${fileName}`
                : `assortment/${product.category}/${product.name}/${fileName}`;
            const fileRef = storageRef(storage, storagePath);

            const metadata = {
                contentType: file.type
            };

            await uploadBytes(fileRef, file, metadata);
            const url = await getDownloadURL(fileRef);

            uploadedFiles.push({
                name: fileName,
                storagePath: storagePath,
                url: url
            });
        }

        setProducts(prevProducts => prevProducts.map(prod => prod.id === id ? {
            ...prod,
            files: [...(prod.files || []), ...uploadedFiles],
            imageUrls: [...(prod.imageUrls || []), ...uploadedFiles.map(file => file.url)]
        } : prod));
    };

    const moveProductFiles = async (oldProduct, newProduct) => {
        const storage = getStorage();

        const updatedFiles = [];
        const updatedImageUrls = [];

        for (let file of oldProduct.files) {
            const fileName = file.name;
            const oldStoragePath = file.storagePath;
            const newStoragePath = newProduct.type
                ? `assortment/${newProduct.category}/${newProduct.type}/${newProduct.name}/${fileName}`
                : `assortment/${newProduct.category}/${newProduct.name}/${fileName}`;

            const oldRef = storageRef(storage, oldStoragePath);
            const newRef = storageRef(storage, newStoragePath);

            try {
                const url = await getDownloadURL(oldRef);
                const response = await fetch(url);
                const blob = await response.blob();

                await uploadBytes(newRef, blob);

                const newUrl = await getDownloadURL(newRef);

                await deleteObject(oldRef);

                updatedFiles.push({ ...file, storagePath: newStoragePath, url: newUrl });
                updatedImageUrls.push(newUrl);

            } catch (error) {
                console.error('Błąd podczas przenoszenia pliku:', error);
            }
        }

        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === newProduct.id) {
                    return {
                        ...product,
                        files: updatedFiles,
                        imageUrls: updatedImageUrls
                    };
                } else {
                    return product;
                }
            });
        });
    };

    const getEnglishType = (type) => {
        switch (type) {
            case 'Drewniana':
                return 'wooden';
            case 'Kamienna':
                return 'stolen';
            case 'Ceramiczna':
                return 'ceramic';
            case 'Szklana':
                return 'glass';
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
                                                <option value="Drewniana">Drewniana</option>
                                                <option value="Kamienna">Kamienna</option>
                                            </select>
                                            <label>Z czego wykonane:</label>
                                            <input
                                                type="text"
                                                value={product.build}
                                                onChange={(e) => handleProductChange(product.id, 'build', e.target.value)}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <label>Typ:</label>
                                            <input
                                                type="text"
                                                value={product.type}
                                                onChange={(e) => handleProductChange(product.id, 'type', e.target.value)}
                                            />
                                            <label>Z czego wykonane:</label>
                                            <input
                                                type="text"
                                                value={product.build}
                                                onChange={(e) => handleProductChange(product.id, 'build', e.target.value)}
                                            />
                                        </>
                                    )}
                                    <label>Załaduj zdjęcia:</label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => handleFileChange(product.id, Array.from(e.target.files))}
                                    />
                                    {product.imageUrls && product.imageUrls.length > 0 && (
                                        <div className="imagePreview">
                                            {product.imageUrls.map((url, idx) => (
                                                <img key={idx} src={url} alt={`Zdjęcie ${idx + 1}`} style={{ width: '100px', marginRight: '10px' }} />
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                            {product.category === 'music' && (
                                <>
                                    <label>Opis:</label>
                                    <textarea
                                        value={product.text}
                                        onChange={(e) => handleProductChange(product.id, 'text', e.target.value)}
                                    />
                                </>
                            )}
                            {index > 0 && (
                                <button className="button-removeProduct" type="button" onClick={() => removeProduct(product.id)}>
                                    Usuń ten produkt ^
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

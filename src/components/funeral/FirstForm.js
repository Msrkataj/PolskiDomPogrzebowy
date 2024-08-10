import React, { useState } from 'react';
import { db, storage } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import useAuthMiddleware from "../../../middleware";
import { useRouter } from "next/router";
import Assortment from './AddAsortment';

const FuneralHomeServicesAndAssortment = () => {
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([{ id: uuidv4(), name: '', category: 'coffins', price: '', availability: 'Dostępna od ręki', producent: '', text: '', build: '', type: 'Drewniana', files: [] }]);
    const [productCounter, setProductCounter] = useState(1);
    const roleChecked = useAuthMiddleware('funeralHome');
    const router = useRouter();

    const handleServiceChange = (service) => {
        if (services.includes(service)) {
            setServices(services.filter(s => s !== service));
        } else {
            setServices([...services, service]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User not logged in');
            return;
        }

        try {
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            const updatedData = {
                services,
                assortyment: products.map(({ id, files, type, ...product }) => ({
                    ...product,
                    type: getEnglishType(type),
                })),
            };

            await updateDoc(userDocRef, updatedData);

            // Upload files
            for (const product of products) {
                const category = product.category;
                const englishType = getEnglishType(product.type);
                const path = englishType
                    ? `assortment/${category}/${englishType}/${product.name}/`
                    : `assortment/${category}/${product.name}/`;

                for (const file of product.files) {
                    const storageRef = ref(storage, `${path}${file.name}`);
                    await uploadBytes(storageRef, file);
                }
            }

            alert('Dane zostały zapisane.');
            router.push('/funeral/first-summary');
        } catch (error) {
            console.error('Error updating document: ', error);
            alert('Error updating document. Please try again.');
        }
    };

    const getEnglishType = (type) => {
        switch (type) {
            case 'Drewniana':
                return 'wooden';
            case 'Kamienna':
                return 'stone';
            default:
                return type ? type.toLowerCase() : '';
        }
    };

    return (
        <div className="login-container">
            <h1>Witamy w Twoim Panelu Domu Pogrzebowego</h1>
            <form onSubmit={handleSubmit}>
                <div className="formSection">
                    <h2>Usługi</h2>
                    <div className="services">
                        <div>
                            <input type="checkbox" id="organizacja" onChange={() => handleServiceChange('Organizacja ceremonii pogrzebowych')} />
                            <label htmlFor="organizacja">Organizacja ceremonii pogrzebowych</label>
                        </div>
                        <div>
                            <input type="checkbox" id="kremacja" onChange={() => handleServiceChange('Kremacja')} />
                            <label htmlFor="kremacja">Kremacja</label>
                        </div>
                        <div>
                            <input type="checkbox" id="transport" onChange={() => handleServiceChange('Transport zwłok')} />
                            <label htmlFor="transport">Transport zwłok</label>
                        </div>
                        <div>
                            <input type="checkbox" id="formalnosci" onChange={() => handleServiceChange('Pomoc w załatwianiu formalności')} />
                            <label htmlFor="formalnosci">Pomoc w załatwianiu formalności</label>
                        </div>
                        <div>
                            <input type="checkbox" id="ekshumacja" onChange={() => handleServiceChange('Ekshumacja')} />
                            <label htmlFor="ekshumacja">Ekshumacja</label>
                        </div>
                        <div>
                            <input type="checkbox" id="florystyka" onChange={() => handleServiceChange('Usługi florystyczne')} />
                            <label htmlFor="florystyka">Usługi florystyczne</label>
                        </div>
                        <div>
                            <input type="checkbox" id="miedzynarodowe" onChange={() => handleServiceChange('Przewozy międzynarodowe')} />
                            <label htmlFor="miedzynarodowe">Przewozy międzynarodowe</label>
                        </div>
                        <div>
                            <input type="checkbox" id="balsamowanie" onChange={() => handleServiceChange('Usługi balsamowania')} />
                            <label htmlFor="balsamowanie">Usługi balsamowania</label>
                        </div>
                    </div>
                </div>
                <Assortment
                    products={products}
                    setProducts={setProducts}
                    productCounter={productCounter}
                    setProductCounter={setProductCounter}
                />
                <button type="submit">Dalej</button>
            </form>
        </div>
    );
};

export default FuneralHomeServicesAndAssortment;

import React, { useState } from 'react';
import { db, storage } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import useAuthMiddleware from "../../../middleware";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';

const FuneralHomeImages = () => {
    const [images, setImages] = useState({
        main: null,
        hall: null,
        car: null,
    });
    const [customImages, setCustomImages] = useState([]);
    const roleChecked = useAuthMiddleware('funeralHome');
    const router = useRouter();

    const handleImageChange = (key, file) => {
        setImages({ ...images, [key]: file });
    };

    const handleCustomImageChange = (id, field, value) => {
        setCustomImages(customImages.map(image => image.id === id ? { ...image, [field]: value } : image));
    };

    const addCustomImage = () => {
        setCustomImages([...customImages, { id: uuidv4(), title: '', file: null }]);
    };

    const removeCustomImage = (id) => {
        setCustomImages(customImages.filter(image => image.id !== id));
    };

    const handleFileChange = (id, file) => {
        setCustomImages(customImages.map(image => image.id === id ? { ...image, file } : image));
    };

    const compressAndConvertToWebP = async (file) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
            fileType: 'image/webp'
        };
        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error('Error during image compression:', error);
            throw error;
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
            // Pobierz dokument użytkownika
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                alert('User document not found');
                return;
            }

            const userData = userDocSnap.data();
            const funeralHomeName = userData.funeralHomeName;

            if (!funeralHomeName) {
                alert('Funeral home name not found');
                return;
            }

            const imagePaths = {};

            const uploadAndCompressImage = async (file, path) => {
                const compressedFile = await compressAndConvertToWebP(file);
                const storageRef = ref(storage, path);
                await uploadBytes(storageRef, compressedFile);
                return path;
            };

            for (const [key, file] of Object.entries(images)) {
                if (file) {
                    const fileName = `${key}.webp`; // Użyj nazwy klucza jako nazwy pliku
                    const path = `${funeralHomeName}/images/${key}.webp`;
                    imagePaths[key] = await uploadAndCompressImage(file, path);
                }
            }

            for (const customImage of customImages) {
                if (customImage.file) {
                    const fileName = `${customImage.title}.webp`; // Użyj tytułu jako nazwy pliku
                    const path = `${funeralHomeName}/images/custom/${fileName}`;
                    imagePaths[customImage.title] = await uploadAndCompressImage(customImage.file, path);
                }
            }

            // Dodanie ratingu i reviews do danych, jeśli nie istnieją
            const rating = userData.rating || 0;
            const reviews = userData.reviews || [{ message: "Example review", date: new Date().toISOString().split('T')[0] }];

            await updateDoc(userDocRef, { images: imagePaths });
            alert('Zdjęcia zostały zapisane.');
            router.push('/funeral/panel');
        } catch (error) {
            console.error('Error uploading images: ', error);
            alert('Error uploading images. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h1>Witamy w Twoim Panelu Domu Pogrzebowego</h1>
            <form onSubmit={handleSubmit}>
                <div className="formSection">
                    <h2>Zdjęcia</h2>
                    <label>Zdjęcie zakładu</label>
                    <input type="file" onChange={(e) => handleImageChange('main', e.target.files[0])} />
                    <label>Zdjęcie sali pożegnań</label>
                    <input type="file" onChange={(e) => handleImageChange('hall', e.target.files[0])} />
                    <label>Zdjęcie karawanu</label>
                    <input type="file" onChange={(e) => handleImageChange('car', e.target.files[0])} />
                    {customImages.map((customImage, index) => (
                        <div key={customImage.id} className="customImageSection">
                            <label>Tytuł zdjęcia</label>
                            <input
                                type="text"
                                value={customImage.title}
                                onChange={(e) => handleCustomImageChange(customImage.id, 'title', e.target.value)}
                            />
                            <label>Załaduj zdjęcie</label>
                            <input type="file" onChange={(e) => handleFileChange(customImage.id, e.target.files[0])} />
                            <button type="button" onClick={() => removeCustomImage(customImage.id)}>
                                Usuń zdjęcie
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addCustomImage}>
                        Dodaj kolejne zdjęcie +
                    </button>
                </div>
                <button type="submit">Zakończ</button>
            </form>
        </div>
    );
};

export default FuneralHomeImages;

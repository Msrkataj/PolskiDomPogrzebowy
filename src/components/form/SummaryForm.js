import React, {useEffect, useState} from 'react';
import {db} from '../../../firebase';
import {doc, getDoc, updateDoc, setDoc} from 'firebase/firestore';
import {getStorage, ref as storageRef, getDownloadURL, uploadBytes} from "firebase/storage";
import Link from 'next/link';
import bcrypt from 'bcryptjs';
import {useRouter} from "next/router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import 'jspdf-autotable';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { saveAs } from 'file-saver';
import PelnomocnictwoForm from "@/components/documents/pelnomocnictwo";
import WniosekKremacjaForm from "@/components/documents/wniosek-kremacja";
import ZusUpowaznienie from "@/components/documents/zus-upowaznienie";
import ZaswiadczenieEr from "@/components/documents/zaswiadczenie-er";
import ZleceniePelnomocnictwoForm from "@/components/documents/akt-zgonu";
import SzpitalKoszalinPDF from "@/components/documents/szpital-odbior-ciala";
import UpowaznienieKrus from "@/components/documents/upowaznienie-krus";
import UpowaznienieOdbiorDokumentowForm from "@/components/documents/upowaznienie-odbior-dokumentow";
const Summary = () => {
    const [formData, setFormData] = useState(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadCategory, setUploadCategory] = useState('');
    const router = useRouter();
    const storage = getStorage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            if (typeof window !== 'undefined') {
                const localFormId = localStorage.getItem('formId');
                console.log("Pobrane formId:", localFormId);
                if (localFormId) {
                    try {
                        const formRef = doc(db, 'forms', localFormId);
                        const formSnap = await getDoc(formRef);
                        if (formSnap.exists()) {
                            setFormData(formSnap.data());
                            console.log('Dane formularza:', formSnap.data());
                        } else {
                            console.error('Dokument forms nie istnieje w Firestore');
                        }
                    } catch (error) {
                        console.error('Błąd pobierania danych formularza:', error);
                    }
                } else {
                    console.error('Nie znaleziono ID formularza w localStorage.');
                }
            }
        };

        fetchData();
    }, []);
    const handleOpenModal = (documentName) => {
        setSelectedDocument(documentName);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDocument('');
    };

    const handleRemoveItem = async (index) => {
        if (!formData || !formData.selectedItems) return;

        const updatedItems = formData.selectedItems.filter((_, i) => i !== index);

        try {
            const localFormId = localStorage.getItem('formId');
            if (!localFormId) {
                console.error('Nie znaleziono ID formularza w localStorage.');
                return;
            }
            const formRef = doc(db, 'forms', localFormId);
            await updateDoc(formRef, {selectedItems: updatedItems});
            setFormData(prevData => ({...prevData, selectedItems: updatedItems}));
        } catch (error) {
            console.error('Błąd przy aktualizacji formularza:', error);
        }
    };

    const handlePasswordMatch = () => {
        if (password !== confirmPassword) {
            setError('Hasła nie są zgodne.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handlePasswordMatch()) {
            return;
        }

        if (!validateEmail(email)) {
            alert('Podano nieprawidłowy adres e-mail.');
            return;
        }

        if (!validatePassword(password)) {
            alert('Hasło musi zawierać co najmniej 8 znaków, w tym dużą literę, małą literę, cyfrę i znak specjalny.');
            return;
        }

        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const id = localStorage.getItem('formId');
            const timestamp = new Date();

            await setDoc(doc(db, 'forms', id), {
                email,
                phone,
                password: hashedPassword,
                status: "Zgłoszono - oczekujące na potwierdzenie",
                notifications: [
                    {
                        message: "Utworzono zgłoszenie",
                        timestamp: timestamp,
                        name: "client"
                    }
                ]
            }, { merge: true });

            alert('Dane zostały zapisane.');
            await router.push("/success");
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
            alert('Wystąpił błąd podczas zapisu danych.');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);
    };

    const handleDownload = async (fileName) => {
        const fileRef = storageRef(storage, `documents/${fileName}`);
        try {
            const url = await getDownloadURL(fileRef);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        const category = e.target.name;
        setUploadCategory(category);
    };

    const generatePDF = async (items) => {
        if (!Array.isArray(items)) {
            console.error("Items is not an array:", items);
            return;
        }

        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        const fontBytes = await fetch('/fonts/NotoSans-Regular.ttf').then(res => res.arrayBuffer());
        const customFont = await pdfDoc.embedFont(fontBytes);

        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 12;

        // Tytuł
        page.drawText('Podsumowanie Wybranego Zestawu', {
            x: 50,
            y: height - 50,
            size: 20,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        // Nagłówki tabeli
        page.drawText('Nazwa', {
            x: 50,
            y: height - 80,
            size: fontSize,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawText('Cena', {
            x: 400,
            y: height - 80,
            size: fontSize,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        // Generowanie tabeli z produktami
        let yPosition = height - 100;
        for (const item of items) {
            const wrappedText = wrapText(item.name, 350, fontSize, customFont); // Zawijanie tekstu do szerokości 350px

            wrappedText.forEach((line, lineIndex) => {
                page.drawText(line, {
                    x: 50,
                    y: yPosition - (lineIndex * fontSize),
                    size: fontSize,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
            });

            // Rysowanie ceny obok nazwy produktu
            page.drawText(`${item.price} PLN`, {
                x: 400,
                y: yPosition,
                size: fontSize,
                font: customFont,
                color: rgb(0, 0, 0),
            });

            yPosition -= (wrappedText.length * fontSize) + 10; // Przesuwanie w dół, w zależności od liczby linii
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'Podsumowanie_Zestawu.pdf');
    };

    const wrapText = (text, maxWidth, fontSize, font) => {
        const words = text.split(' ');
        let line = '';
        const lines = [];

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);

            if (testWidth > maxWidth && n > 0) {
                lines.push(line.trim());
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line.trim());
        return lines;
    };


    const uploadFile = async () => {
        if (!selectedFile) return;

        const formId = localStorage.getItem('formId');
        const filePath = `uploaded-documents/${formId}/${uploadCategory}/${selectedFile.name}`;
        const fileRef = storageRef(storage, filePath);

        try {
            await uploadBytes(fileRef, selectedFile);
            const formRef = doc(db, 'forms', formId);
            await updateDoc(formRef, {
                [`${uploadCategory}Document`]: filePath
            });
            alert("Plik przesłany pomyślnie!");
        } catch (error) {
            console.error("Błąd podczas przesyłania pliku:", error);
        }
    };


    if (!formData) {
        return <p>Ładowanie danych...</p>;
    }

    return (
        <div className="summary-container">
            <div className="summary-container-header">
                <h1>Podsumowanie</h1>
                <p>Proszę sprawdzić, czy dane się zgadzają</p>
            </div>

            <div className="summary-container-text">
                {[
                    {
                        title: "Informacje o Osobie zmarłej",
                        data: [
                            { label: "Imię", value: formData.name },
                            { label: "Nazwisko", value: formData.surname },
                            { label: "PESEL", value: formData.pesel },
                            { label: "Data urodzin", value: formData.birthDate },
                            { label: "Data śmierci", value: formData.deathDate },
                            { label: "Kiedy będą załatwiane dokumenty?", value: formData.documents },
                            { label: "Czy Osoba pracowała?", value: formData.worked },
                            { label: "Zmarła Osoba była ubezpieczona w", value: formData.insurance },
                            { label: "Numer świadczenia", value: formData.certificateNumber }
                        ]
                    },
                    {
                        title: "Informacje o pełnomocniku",
                        data: [
                            { label: "Imię i Nazwisko", value: formData.authorizedPerson?.name },
                            { label: "PESEL", value: formData.authorizedPerson?.pesel },
                            { label: "Numer dowodu", value: formData.authorizedPerson?.idNumber },
                            { label: "Kto sporządza akt zgonu?", value: formData.who }
                        ]
                    },
                    {
                        title: "Informacje o pogrzebie",
                        data: [
                            { label: "Forma pogrzebu", value: formData.formType },
                            { label: "Forma", value: formData.religiousCeremony },
                            { label: "Czy dochowujemy do grobu?", value: formData.burialOption },
                            { label: "Ubiór zmarłego", value: formData.clothingOption }
                        ]
                    }
                ].map((section, index) => (
                    <div key={index}>
                        <h2>{section.title}</h2>
                        {section.data.map((item, idx) => (
                            <p key={idx}><strong>{item.label}:</strong> {item.value}</p>
                        ))}
                    </div>
                ))}
            </div>

            <div className="summary-edit">
                <Link href="/form" className="change-button">Wróć i edytuj</Link>
            </div>

            <h2>Wybrany zestaw:</h2>
            <table className="selected-items-table">
                <thead>
                <tr>
                    <th>Twój wybór</th>
                    <th>Miniaturka</th>
                    <th>Cena</th>
                    <th>Usuń</th>
                </tr>
                </thead>
                <tbody>
                {formData.selectedItems?.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                            {item.category !== 'music' && item.name && (
                                Array.isArray(item.imageUrls) && item.imageUrls.length > 0 ? (
                                    <Image
                                        src={item.imageUrls[0]}  // Użyj pierwszego elementu z tablicy imageUrls
                                        alt={item.name}
                                        className="thumbnail-image"
                                        width={100}  // Ustawienia szerokości obrazu
                                        height={100}  // Ustawienia wysokości obrazu
                                        style={{ objectFit: 'cover' }}  // Styl dopasowania obrazu
                                    />
                                ) : (
                                    <Image
                                        src={item.imageUrls}  // Użyj pojedynczego URL, jeśli nie jest tablicą
                                        alt={item.name}
                                        className="thumbnail-image"
                                        width={100}  // Ustawienia szerokości obrazu
                                        height={100}  // Ustawienia wysokości obrazu
                                        style={{ objectFit: 'cover' }}  // Styl dopasowania obrazu
                                    />
                                )
                            )}
                        </td>
                        <td>{item.price} PLN</td>
                        <td>
                            <button onClick={() => handleRemoveItem(index)}>X</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="total-price"><strong>Suma:</strong> {formData.selectedItems?.reduce((sum, item) => sum + parseFloat(item.price), 0)} PLN</p>

            <button onClick={() => generatePDF(formData.selectedItems)} className="download-pdf-button">Pobierz PDF z podsumowaniem</button>

                <div className="documents-section">
                    <h2>Druki do wypełnienia</h2>
                    <p>Wypełnij teraz online lub później w panelu klienta, albo pobierz plik PDF, wypełnij ręcznie i załaduj tutaj lub później w swoim panelu klienta.</p>

                    <div className="document-actions">
                        {[
                            {
                                name: 'Pelnomocnictwo ZP.doc',
                                info: 'Pełnomocnictwo umożliwia prawne działanie w imieniu zmarłej osoby.'
                            },
                            {
                                name: 'Wniosek do kremacji.doc',
                                info: 'Wniosek potrzebny do uzyskania zgody na kremację.'
                            },
                            {
                                name: 'ZUS-UPOWAŻNIENIE.doc',
                                info: 'Dokument upoważniający do uzyskania informacji od ZUS.'
                            },
                            {
                                name: 'Zaświadczenie E-R.docx',
                                info: 'Zaświadczenie dotyczące składek emerytalno-rentowych.'
                            },
                            {
                                name: 'akt zgonu USC.doc',
                                info: 'Dokument rejestrujący zgon w Urzędzie Stanu Cywilnego.'
                            },
                            {
                                name: 'szpital Koszalin odbiór ciała.doc',
                                info: 'Dokument pozwalający na odbiór ciała ze szpitala.'
                            },
                            {
                                name: 'upowaźnienie KRUS.doc',
                                info: 'Dokument dotyczący uprawnień do świadczeń KRUS.'
                            },
                            {
                                name: 'upowaźnienie odbiór dokumentów.doc',
                                info: 'Upoważnienie do odbioru dokumentów w imieniu zmarłego.'
                            }
                        ].map((file, index) => (
                            <div key={index} className="form-item">
                                <div className="form-item__title">
                                    {file.name}
                                    <span className="tooltip" data-tooltip={file.info}>
                                <FontAwesomeIcon icon={faQuestionCircle} className="fa-xl" />
                            </span>
                                </div>
                                <div className="form-item__description">
                                    Możesz wypełnić ten dokument teraz online lub pobrać i wypełnić go ręcznie.
                                </div>
                                <div className="form-item__buttons">
                                    <button
                                        className="fill-online"
                                        onClick={() => handleOpenModal(file.name)}
                                    >
                                        Wypełnij online
                                    </button>
                                    <span>ALBO</span>
                                    <button className="download-pdf" onClick={() => handleDownload(file.name)}>Pobierz PDF</button>
                                    <div className="form-item__upload">
                                        <label htmlFor={`upload-${index}`}>Prześlij plik:</label>
                                        <input type="file" id={`upload-${index}`} name={file.name} onChange={handleFileUpload} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                        {selectedDocument === 'Pelnomocnictwo ZP.doc' && <PelnomocnictwoForm isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {selectedDocument === 'Wniosek do kremacji.doc' && <WniosekKremacjaForm isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {selectedDocument === 'ZUS-UPOWAŻNIENIE.doc' && <ZusUpowaznienie isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {selectedDocument === 'Zaświadczenie E-R.docx' && <ZaswiadczenieEr isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {selectedDocument === 'akt zgonu USC.doc' && <ZleceniePelnomocnictwoForm isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {selectedDocument === 'szpital Koszalin odbiór ciała.doc' && <SzpitalKoszalinPDF isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {selectedDocument === 'upowaźnienie KRUS.doc' && <UpowaznienieKrus isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {selectedDocument === 'upowaźnienie odbiór dokumentów.doc' && <UpowaznienieOdbiorDokumentowForm isOpen={isModalOpen} onClose={handleCloseModal} />}
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <h2>Podaj swoje dane:</h2>
                    <div className="form-group">
                        <label htmlFor="email">Twój e-mail:</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefon kontaktowy:</label>
                        <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" required />
                    </div>
                    <h3>Załóż konto, aby zapisać swoje dane i ułatwić dalszą organizację pogrzebu.</h3>
                    <div className="form-group">
                        <label htmlFor="password">Hasło:</label>
                        <input type="password" id="password" name="password" value={password}
                               onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Powtórz hasło:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Powtórz hasło"
                               required/>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button">Wyślij</button>
                </form>
        </div>

    );
};

export default Summary;

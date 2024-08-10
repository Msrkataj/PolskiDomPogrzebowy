import React, {useEffect, useState} from 'react';
import {db} from '../../../firebase';
import {doc, getDoc, updateDoc, setDoc} from 'firebase/firestore';
import {getStorage, ref as storageRef, getDownloadURL, uploadBytes} from "firebase/storage";
import Link from 'next/link';
import bcrypt from 'bcryptjs';
import {useRouter} from "next/router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { saveAs } from 'file-saver';
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

            await setDoc(doc(db, 'forms', id), {
                email,
                phone,
                password: hashedPassword,
                status: "Zgłoszono - oczekujące na potwierdzenie"
            }, {merge: true});
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
                {/* Informacje o osobie zmarłej */}
                <div>
                    <h2>Informacje o Osobie zmarłej:</h2>
                    <p><strong>Imię:</strong> {formData.name}</p>
                    <p><strong>Nazwisko:</strong> {formData.surname}</p>
                    <p><strong>PESEL:</strong> {formData.pesel}</p>
                    <p><strong>Data urodzin:</strong> {formData.birthDate}</p>
                    <p><strong>Data śmierci:</strong> {formData.deathDate}</p>
                    <p><strong>Kiedy będą załatwiane dokumenty?</strong> {formData.documents}</p>
                    <p><strong>Czy Osoba pracowała?</strong> {formData.worked}</p>
                    <p><strong>Zmarła Osoba była ubezpieczona w:</strong> {formData.insurance}</p>
                    <p><strong>Numer świadczenia:</strong> {formData.certificateNumber}</p>
                </div>

                {/* Informacje o pełnomocniku */}
                <div>
                    <h2>Informacje o pełnomocniku:</h2>
                    <p><strong>Imię i Nazwisko:</strong> {formData.authorizedPerson?.name}</p>
                    <p><strong>PESEL:</strong> {formData.authorizedPerson?.pesel}</p>
                    <p><strong>Numer dowodu:</strong> {formData.authorizedPerson?.idNumber}</p>
                    <p><strong>Kto sporządza akt zgonu?</strong> {formData.who}</p>
                </div>

                {/* Informacje o pogrzebie */}
                <div>
                    <h2>Informacje o pogrzebie:</h2>
                    <p><strong>Forma pogrzebu:</strong> {formData.formType}</p>
                    <p><strong>Forma:</strong> {formData.religiousCeremony}</p>
                    <p><strong>Czy dochowujemy do grobu?</strong> {formData.burialOption}</p>
                    <p><strong>Ubiór zmarłego:</strong> {formData.clothingOption}</p>
                </div>
            </div>
            <div className="summary-container-edit">
                <Link href={"/form"} className="change-button">Wróć i edytuj</Link>
            </div>

            {/* Wybrany zestaw */}
            <h2>Wybrany zestaw:</h2>
            <table className="selected-items-table">
                <thead>
                <tr>
                    <th>Twój wybór:</th>
                    <th>Miniaturka:</th>
                    {/* Dodaj nową kolumnę */}
                    <th>Cena:</th>
                    <th>Usuń:</th>
                </tr>
                </thead>
                <tbody>
                {formData.selectedItems?.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                            {item.category !== 'music' && item.name && (
                                <img src={item.imageUrls} alt={item.name}
                                     className="thumbnail-image"/>
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
            <p className="total-price">
                <strong>Suma:</strong> {formData.selectedItems?.reduce((sum, item) => sum + parseFloat(item.price), 0)} PLN
            </p>
            <button onClick={() => generatePDF(formData.selectedItems)} className="download-pdf-button">Pobierz PDF z
                podsumowaniem
            </button>
            <div className="document-and-account-form">
                <div className="download-forms">
                    <h2>Druki do wypełnienia:</h2>
                    <ul>
                        {[
                            {
                                name: 'Pełnomocnictwo ZP.doc',
                                info: 'Pełnomocnictwo umożliwia prawne działanie w imieniu zmarłej osoby.'
                            },
                            {
                                name: 'Wniosek do kremacji.doc',
                                info: 'Wniosek potrzebny do uzyskania zgody na kremację.'
                            },
                            {
                                name: 'ZUS-UPOWAŻNIENIE.doc',
                                info: 'Dokument upoważniający do uzyskania informacji od ZUS.'
                            },
                            {
                                name: 'Zaświadczenie E-R.docx',
                                info: 'Zaświadczenie dotyczące składek emerytalno-rentowych.'
                            },
                            {name: 'akt zgonu USC.doc', info: 'Dokument rejestrujący zgon w Urzędzie Stanu Cywilnego.'},
                            {
                                name: 'szpital Koszalin odbiór ciała.doc',
                                info: 'Dokument pozwalający na odbiór ciała ze szpitala.'
                            },
                            {name: 'upoważnienie KRUS.doc', info: 'Dokument dotyczący uprawnień do świadczeń KRUS.'},
                            {
                                name: 'upoważnienie odbiór dokumentów.doc',
                                info: 'Upoważnienie do odbioru dokumentów w imieniu zmarłego.'
                            }
                        ].map((file, index) => (
                            <li key={index}>
                                <div className="download-button-wrapper">
                                    <button className="download-button" onClick={() => handleDownload(file.name)}>
                                        <FontAwesomeIcon icon={faDownload}/> {file.name}
                                    </button>
                                    <span className="download-button-wrapper-info-icon">
                    <FontAwesomeIcon icon={faQuestionCircle} className="fa-xl"/>
                    <div className="tooltip">{file.info}</div>
                </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="upload-documents-section">
                        <h2>Prześlij wymagane dokumenty:</h2>
                        <h3>lub prześlij te pliki później w panelu klienta.</h3>
                        <div className="upload-item">
                            <label>Prześlij pełnomocnictwo:</label>
                            <input type="file" name="pełnomocnictwo" onChange={handleFileUpload}/>
                        </div>
                        <div className="upload-item">
                            <label>Prześlij wniosek do kremacji:</label>
                            <input type="file" name="wniosek" onChange={handleFileUpload}/>
                        </div>
                        <div className="upload-item">
                            <label>Prześlij ZUS-UPOWAŻNIENIE:</label>
                            <input type="file" name="zusUpowaznienie" onChange={handleFileUpload}/>
                        </div>
                        <div className="upload-item">
                            <label>Prześlij zaświadczenie E-R <strong style={{"font-weight": "bold"}}>(jeśli wcześniej
                                nie przesłałeś):</strong> </label>
                            <input type="file" name="zaswiadczenie ER" onChange={handleFileUpload}/>
                        </div>
                        <div className="upload-item">
                            <label>Prześlij dokument pozwalający na odbiór ciala:</label>
                            <input type="file" name="akt zgonu USC" onChange={handleFileUpload}/>
                        </div>
                        <div className="upload-item">
                            <label>Prześlij upoważnienie do odbioru dokumentów:</label>
                            <input type="file" name="zupoważnienie KRUS" onChange={handleFileUpload}/>
                        </div>
                        <button type="button" className="upload-button" onClick={uploadFile}>Prześlij plik</button>
                        <p>Możesz także później przesłać te pliki w panelu klienta.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="contact-form">
                    <h2>Podaj swoje dane:</h2>
                    <div className="form-group">
                        <label htmlFor="email">Twój e-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefon kontaktowy:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Telefon"
                            required
                        />
                    </div>
                    <h3>Załóż konto, aby zapisać swoje dane i ułatwić dalszą organizację pogrzebu.</h3>
                    <div className="form-group">
                        <label htmlFor="password">Hasło:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Hasło"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Powtórz hasło:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Powtórz hasło"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button">Wyślij</button>
                </form>
            </div>
        </div>
    );
};

export default Summary;

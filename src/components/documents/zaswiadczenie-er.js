import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import React, {useEffect, useState} from 'react';
import { pdf } from '@react-pdf/renderer';
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import {doc, doc as firestoreDoc, getDoc, updateDoc} from "firebase/firestore";
import { db } from '../../../firebase';

// Rejestracja czcionki
Font.register({ family: 'Noto Sans', src: '/fonts/NotoSans-Regular.ttf' });

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Noto Sans',
        fontSize: 10,
        lineHeight: 1.3,
    },
    title: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    lineGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: '100%',
        marginBottom: 4,
        marginTop: 4,
    },
    label: {
        fontSize: 9,
        marginTop: 2,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
    },
    dottedLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'dotted',
        width: '100%',
        marginBottom: 4,
        marginTop: 4,
    },
    textLine: {
        marginBottom: 15,
    },
    signature: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    signatureField: {
        width: '45%',
        textAlign: 'center',
        borderBottomColor: 'black',
        paddingBottom: 2,
    },
});

const ZaswiadczenieERPDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.lineGroup}>
                <View style={{ width: '60%' }}>
                    <Text style={styles.dottedLine}>{formData.companyDetails}</Text>
                    <Text style={styles.label}>(dane Firmy)</Text>
                </View>
                <View style={{ width: '40%' }}>
                    <Text style={styles.dottedLine}>{formData.date}</Text>
                    <Text style={styles.label}>dnia</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>ZAŚWIADCZENIE</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.textLine}>Niniejszym potwierdzam, że Pan/Pani:</Text>
                <Text style={styles.dottedLine}>{formData.personName}</Text>
                <Text style={styles.label}>(imię i nazwisko)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.textLine}>ur.</Text>
                <Text style={styles.dottedLine}>{formData.birthDate}</Text>
                <Text style={styles.label}>(data urodzenia)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.textLine}>PESEL:</Text>
                <Text style={styles.dottedLine}>{formData.pesel}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.textLine}>w okresie od:</Text>
                <Text style={styles.dottedLine}>{formData.startDate}</Text>
                <Text style={styles.label}>(początek okresu zatrudnienia)</Text>
                <Text style={styles.textLine}>do:</Text>
                <Text style={styles.dottedLine}>{formData.endDate}</Text>
                <Text style={styles.label}>(koniec okresu zatrudnienia)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.textLine}>była zatrudniona na umowę o pracę w:</Text>
                <Text style={styles.dottedLine}>{formData.companyName}</Text>
                <Text style={styles.label}>(nazwa firmy)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.textLine}>Na dzień śmierci tj.:</Text>
                <Text style={styles.dottedLine}>{formData.deathDate}</Text>
                <Text style={styles.label}>(data zgonu)</Text>
                <Text style={styles.textLine}>podlegał(a) ubezpieczeniu emerytalnemu i rentowym.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.textLine}>Zaświadczenie wydano w celu nabycia prawa do zasiłku pogrzebowego.</Text>
            </View>

            <View style={styles.signature}>
                <Text style={styles.signatureField}>Podpis: .........................................................</Text>
                <Text style={styles.signatureField}>Pieczątka: .........................................................</Text>
            </View>
        </Page>
    </Document>
);
const ZaswiadczenieERForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        companyDetails: '',
        date: '',
        personName: '',
        birthDate: '',
        pesel: '',
        startDate: '',
        endDate: '',
        companyName: '',
        deathDate: '',
    });

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
                            const data = formSnap.data();
                            setFormData({
                                companyDetails: data.companyDetails || '',
                                personName: `${data.name || ''} ${data.surname || ''}`,
                                birthDate: data.birthDate || '',
                                pesel: data.pesel || '',
                                startDate: data.startDate || '',
                                endDate: data.endDate || '',
                                companyName: data.companyName || '',
                                deathDate: data.deathDate || '',
                            });
                            console.log('Dane formularza:', data);
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
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerateAndUploadPDF = async () => {
        try {
            const pdfBlob = await pdf(<ZaswiadczenieERPDF formData={formData} />).toBlob();
            const formId = localStorage.getItem('formId');
            const fileName = `ZASWIADCZENIE_ER_${formData.personName}_${Date.now()}.pdf`;
            const filePath = `uploaded-documents/${formId}/Zaświadczenie E-R/${fileName}`;
            const storage = getStorage();
            const fileRef = storageRef(storage, filePath);

            await uploadBytes(fileRef, pdfBlob);
            const formRef = firestoreDoc(db, 'forms', formId);
            await updateDoc(formRef, {
                zaswiadczenieERDocument: filePath
            });
            alert("PDF został wygenerowany i zapisany pomyślnie!");
            onClose();
        } catch (error) {
            console.error("Błąd podczas przesyłania pliku:", error);
        }
    };

    if (!isOpen) return null;


    return (
        <div className="modal-document">
            <div className="modal-content">
                <h2>Wypełnij ZAŚWIADCZENIE E-R</h2>
                <form>
                    <p>Dane Firmy:</p>
                    <input type="text" name="companyDetails" value={formData.companyDetails} onChange={handleChange} placeholder="(dane Firmy)" />

                    <p>Dnia:</p>
                    <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="(data)" />

                    <p>ZAŚWIADCZENIE</p>
                    <p>Niniejszym potwierdzam, że Pan/Pani:</p>
                    <input type="text" name="personName" value={formData.personName} onChange={handleChange}
                           placeholder="(imię i nazwisko)"/>

                    <p>ur.</p>
                    <input type="text" name="birthDate" value={formData.birthDate} onChange={handleChange}
                           placeholder="(data urodzenia)"/>

                    <p>PESEL:</p>
                    <input type="text" name="pesel" value={formData.pesel} onChange={handleChange}
                           placeholder="(PESEL)"/>

                    <p>w okresie od:</p>
                    <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="(początek okresu zatrudnienia)" />

                    <p>do:</p>
                    <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="(koniec okresu zatrudnienia)" />

                    <p>była zatrudniona na umowę o pracę w:</p>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="(nazwa firmy)" />

                    <p>Na dzień śmierci tj.:</p>
                    <input type="text" name="deathDate" value={formData.deathDate} onChange={handleChange}
                           placeholder="(data zgonu)"/>

                    <p>podlegał(a) ubezpieczeniu emerytalnemu i rentowym.</p>

                    <p>Zaświadczenie wydano w celu nabycia prawa do zasiłku pogrzebowego.</p>

                    <button type="button" onClick={handleGenerateAndUploadPDF}>Wyślij i wygeneruj PDF</button>
                    <button onClick={onClose}>Zamknij</button>
                </form>
            </div>
        </div>
    );
};

export default ZaswiadczenieERForm;
import React, { useEffect, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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
    dottedLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'dotted',
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
    address: {
        marginTop: 30,
        marginBottom: 20,
        width: 200,
    },
    signature: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 30,
    },
    signatureField: {
        width: '45%',
        textAlign: 'center',
        borderBottomColor: 'black',
        paddingBottom: 2,
    },
});

const SzpitalKoszalinPDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.lineGroup}>
                <View style={{ width: '30%' }}>
                    <Text style={styles.dottedLine}>{formData.fullName}</Text>
                    <Text style={styles.label}>(imię i nazwisko)</Text>
                </View>
                <View style={{ width: '30%' }}>
                    <Text style={styles.dottedLine}>{formData.city}</Text>
                    <Text style={styles.label}>miejscowość</Text>
                </View>
                <View style={{ width: '30%' }}>
                    <Text style={styles.dottedLine}>{formData.date}</Text>
                    <Text style={styles.label}>dnia</Text>
                </View>
            </View>

            <View style={styles.address}>
                <Text style={styles.dottedLine}>{formData.address}</Text>
                <Text style={styles.label}>(adres)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>UPOWAŻNIENIE</Text>
            </View>

            <View style={styles.section}>
                <Text>Upoważniam (NAZWA FIRMY):</Text>
                <Text style={styles.dottedLine}>{formData.companyName}</Text>
            </View>

            <View style={styles.section}>
                <Text>do odbioru zwłok:</Text>
                <Text style={styles.dottedLine}>{formData.deceasedName}</Text>
            </View>

            <View style={styles.section}>
                <Text>z prosektorium w:</Text>
                <Text style={styles.dottedLine}>{formData.morgueLocation}</Text>
            </View>

            <View style={styles.signature}>
                <Text style={styles.signatureField}>Podpis: .........................................................</Text>
            </View>

            <View style={styles.section}>
                <Text>Stwierdzam zgodność podpisu</Text>
            </View>
        </Page>
    </Document>
);

const SzpitalKoszalinForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        date: '',
        address: '',
        companyName: '',
        deceasedName: '',
        morgueLocation: '',
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
                                fullName: `${data.firstName || ''} ${data.lastName || ''}`,
                                date: data.date || '',
                                address: data.address || '',
                                companyName: data.companyName || '',
                                deceasedName: data.deceasedName || '',
                                morgueLocation: data.morgueLocation || '',
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
            const pdfBlob = await pdf(<SzpitalKoszalinPDF formData={formData} />).toBlob();
            const formId = localStorage.getItem('formId');
            const fileName = `SZPITAL_KOSZALIN_${formData.fullName}_${Date.now()}.pdf`;
            const filePath = `uploaded-documents/${formId}/Szpital Koszalin odbiór ciała/${fileName}`;
            const storage = getStorage();
            const fileRef = storageRef(storage, filePath);

            await uploadBytes(fileRef, pdfBlob);
            const formRef = doc(db, 'forms', formId);
            await updateDoc(formRef, {
                szpitalKoszalinDocument: filePath
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
                <h2>Wypełnij UPOWAŻNIENIE</h2>
                <form>
                    <p>Dnia:</p>
                    <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="Data"/>

                    <p>W miescowości:</p>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="miejscowość"/>

                    <p>Imię i nazwisko:</p>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                           placeholder="Imię i nazwisko"/>

                    <p>Adres:</p>
                    <input type="text" name="address" value={formData.address} onChange={handleChange}
                           placeholder="Adres"/>

                    <p>Upoważniam (NAZWA FIRMY):</p>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                           placeholder="Nazwa firmy"/>

                    <p>do odbioru zwłok:</p>
                    <input type="text" name="deceasedName" value={formData.deceasedName} onChange={handleChange}
                           placeholder="Imię i nazwisko zmarłego"/>

                    <p>z prosektorium w:</p>
                    <input type="text" name="morgueLocation" value={formData.morgueLocation} onChange={handleChange}
                           placeholder="Lokalizacja prosektorium"/>

                    <button type="button" onClick={handleGenerateAndUploadPDF}>Wyślij i wygeneruj PDF</button>
                    <button onClick={onClose}>Zamknij</button>
                </form>
            </div>
        </div>
    );
};

export default SzpitalKoszalinForm;
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
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
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

const UpowaznienieOdbiorDokumentowPDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.lineGroup}>
                <View style={{ width: '70%' }}>
                    <Text style={styles.dottedLine}>{formData.authorizerName}</Text>
                </View>
                <View style={{ width: '30%' }}>
                    <Text style={styles.dottedLine}>{formData.date}</Text>
                    <Text style={styles.label}>dnia</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.dottedLine}>{formData.address}</Text>
                <Text style={styles.label}>Adres:</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>UPOWAŻNIENIE</Text>
            </View>

            <View style={styles.section}>
                <Text>Upoważniam panią/pana:</Text>
                <Text style={styles.dottedLine}>{formData.representativeName}</Text>
                <Text>legitymującą/ego się dowodem osobistym nr:</Text>
                <Text style={styles.dottedLine}>{formData.idNumber}</Text>
                <Text style={styles.dottedLine}>{formData.documents}</Text>
                <Text style={styles.label}>pracownika Przedsiębiorstwa Gospodarki Komunalnej Spółka z o.o. w Koszalinie do odbioru dokumentów:</Text>
                <Text style={styles.dottedLine}>{formData.deceasedName}</Text>
                <Text style={styles.label}>po zmarłym /ej/:</Text>
                <Text>ze:</Text>
                <Text style={styles.dottedLine}>{formData.institution}</Text>
            </View>

            <View style={styles.signature}>
                <Text style={styles.signatureField}>Podpis: .........................................................</Text>
            </View>
        </Page>
    </Document>
);

const UpowaznienieOdbiorDokumentowForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        authorizerName: '',
        date: '',
        address: '',
        representativeName: '',
        idNumber: '',
        documents: '',
        deceasedName: '',
        institution: '',
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
                                authorizerName: `${data.firstName || ''} ${data.lastName || ''}`,
                                representativeName: data.representativeName || '',
                                deceasedName: `${data.name || ''} ${data.surname || ''}`,
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
            const pdfBlob = await pdf(<UpowaznienieOdbiorDokumentowPDF formData={formData} />).toBlob();
            const formId = localStorage.getItem('formId');
            const fileName = `UPOWAZNIENIE_ODBIOR_DOKUMENTOW_${formData.authorizerName}_${Date.now()}.pdf`;
            const filePath = `uploaded-documents/${formId}/Upoważnienie odbiór dokumentów/${fileName}`;
            const storage = getStorage();
            const fileRef = storageRef(storage, filePath);

            await uploadBytes(fileRef, pdfBlob);
            const formRef = doc(db, 'forms', formId);
            await updateDoc(formRef, {
                upowaznienieOdbiorDokumentowDocument: filePath
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
                <h2>Wypełnij UPOWAŻNIENIE ODBIÓR DOKUMENTÓW</h2>
                <form>
                    <p>Dnia:</p>
                    <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="Data" />

                    <p>Imię i nazwisko upoważniającego:</p>
                    <input type="text" name="authorizerName" value={formData.authorizerName} onChange={handleChange} placeholder="Imię i nazwisko upoważniającego" />

                    <p>Adres zamieszkania:</p>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Dokładny adres zamieszkania" />

                    <h3>UPOWAŻNIENIE</h3>

                    <p>Upoważniam panią/pana:</p>
                    <input type="text" name="representativeName" value={formData.representativeName} onChange={handleChange} placeholder="Imię i nazwisko osoby upoważnionej" />

                    <p>Legitymującą/ego się dowodem osobistym nr:</p>
                    <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="Nr dowodu osobistego" />

                    <p>Pracownika Przedsiębiorstwa Gospodarki Komunalnej Spółka z o.o. w Koszalinie do odbioru dokumentów:</p>
                    <input type="text" name="documents" value={formData.documents} onChange={handleChange} placeholder="Dokumenty do odbioru" />

                    <p>Po zmarłym /ej/:</p>
                    <input type="text" name="deceasedName" value={formData.deceasedName} onChange={handleChange} placeholder="Imię i nazwisko zmarłego" />

                    <p>Ze:</p>
                    <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="Instytucja" />

                    <button type="button" onClick={handleGenerateAndUploadPDF}>Wyślij i wygeneruj PDF</button>
                    <button onClick={onClose}>Zamknij</button>
                </form>
            </div>
        </div>
    );
};

export default UpowaznienieOdbiorDokumentowForm;
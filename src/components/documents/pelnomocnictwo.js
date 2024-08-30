import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font, pdf } from '@react-pdf/renderer';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { doc as firestoreDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

// Rejestracja czcionki
Font.register({ family: 'Noto Sans', src: '/fonts/NotoSans-Regular.ttf' });

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Noto Sans',
        fontSize: 11,
        lineHeight: 1.5,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    signature: {
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
    }
});

const PelnomocnictwoPDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Nazwisko i imię: {formData.name}</Text>
                <Text>Adres: {formData.address}</Text>
                <Text>Stosunek pokrewieństwa do osoby zmarłej: {formData.relation}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>PEŁNOMOCNICTWO</Text>
                <Text>
                    Na podstawie Kodeksu Cywilnego art. 96, 97 oraz art. 99 & 2 udzielam pełnomocnictwa (NAZWA FIRMY)
                    do załatwienia wszelkich niezbędnych czynności do zorganizowania pogrzebu zgodnie ze zleceniem nr: {formData.orderNumber}
                </Text>
                <Text>
                    oraz pobranie z właściwej instytucji należnych mi świadczeń po Zmarłym/Zmarłej śp.: {formData.deceasedName}
                </Text>
            </View>
            <View style={styles.signature}>
                <Text>Stwierdzam własnoręczność podpisu:</Text>
                <Text>Podpis: .........................................................</Text>
                <Text>Data oraz czytelny podpis osoby upoważniającej</Text>
            </View>
        </Page>
    </Document>
);

const PelnomocnictwoForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        relation: '',
        orderNumber: '',
        deceasedName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerateAndUploadPDF = async () => {
        try {
            // Generowanie PDF
            const pdfBlob = await pdf(<PelnomocnictwoPDF formData={formData} />).toBlob();

            // Zapisanie PDF do Firebase Storage
            const formId = localStorage.getItem('formId');
            const fileName = `Pelnomocnictwo_${formData.name}_${Date.now()}.pdf`;
            const filePath = `uploaded-documents/${formId}/Pełnomocnictwo ZP/${fileName}`;
            const storage = getStorage();
            const fileRef = storageRef(storage, filePath);

            await uploadBytes(fileRef, pdfBlob);
            const formRef = firestoreDoc(db, 'forms', formId);
            await updateDoc(formRef, {
                pelnomocnictwoDocument: filePath
            });
            alert("PDF został wygenerowany i zapisany pomyślnie!");
            onClose()
        } catch (error) {
            console.error("Błąd podczas przesyłania pliku:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-document">
            <div className="modal-content">
                <h2>Wypełnij Pełnomocnictwo ZP</h2>
                <p>Nazwisko i imię:</p>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />

                <p>Adres:</p>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />

                <p>Stosunek pokrewieństwa do osoby zmarłej:</p>
                <input type="text" name="relation" value={formData.relation} onChange={handleChange} />

                <h3>PEŁNOMOCNICTWO</h3>

                <p>Na podstawie Kodeksu Cywilnego art. 96, 97 oraz art. 99 & 2 udzielam pełnomocnictwa</p>

                <p>(NAZWA FIRMY) do załatwienia wszelkich niezbędnych czynności do zorganizowania pogrzebu</p>

                <p>zgodnie ze zleceniem nr:</p>
                <input type="text" name="orderNumber" value={formData.orderNumber} onChange={handleChange} />

                <p>oraz pobranie z właściwej instytucji należnych mi świadczeń po Zmarłym/Zmarłej śp.:</p>
                <input type="text" name="deceasedName" value={formData.deceasedName} onChange={handleChange} />

                <p>Stwierdzam własnoręczność podpisu / Data oraz czytelny podpis osoby upoważniającej</p>

                <button onClick={handleGenerateAndUploadPDF}>Wyślij i wygeneruj PDF</button>
                <button onClick={onClose}>Zamknij</button>
            </div>
        </div>
    );
};

export default PelnomocnictwoForm;

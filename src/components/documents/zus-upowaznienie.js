import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font, pdf } from '@react-pdf/renderer';
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { doc as firestoreDoc, updateDoc } from "firebase/firestore";
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
    down: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: '100%',
        marginBottom: 4,
        marginTop: 6,
    },
    label: {
        fontSize: 9,
        marginTop: 2,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
    },
    paragraph: {
        marginBottom: 15,
        textAlign: 'justify',
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

const ZUSUpowaznieniePDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.lineGroup}>
                <View style={{ width: '30%' }}>
                    <Text style={styles.line}>{formData.authorizingName}</Text>
                    <Text style={styles.label}>imię i nazwisko upoważniającego</Text>
                </View>
                <View style={{ width: '30%' }}>
                    <Text style={styles.line}>{formData.location}</Text>
                    <Text style={styles.label}>miejscowość</Text>
                </View>
                <View style={{ width: '30%' }}>
                    <Text style={styles.line}>{formData.date}</Text>
                    <Text style={styles.label}>data</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.line}>{formData.address}</Text>
                <Text style={styles.label}>dokładny adres zamieszkania</Text>
            </View>

            <View style={styles.title}>
                <Text>UPOWAŻNIENIE</Text>
            </View>

            <View style={styles.section}>
                <Text>W związku z wnioskiem z dnia:</Text>
                <Text style={styles.line}>{formData.requestDate}</Text>
                <Text style={styles.label}>(data wniosku)</Text>
                <Text>o wypłatę zasiłku pogrzebowego po zmarłym:</Text>
                <Text style={styles.line}>{formData.deceasedName}</Text>
                <Text style={styles.label}>(imię i nazwisko zmarłego oraz stopień pokrewieństwa osoby zmarłej w stosunku do wnioskodawcy)</Text>
            </View>

            <View style={styles.section}>
                <Text>Ja niżej podpisany/a:</Text>
                <Text style={styles.line}>{formData.name}</Text>
                <Text style={styles.label}>(imię i nazwisko)</Text>
            </View>

            <View style={styles.section}>
                <Text>legitymujący(a) się:</Text>
                <Text style={styles.line}>{formData.idNumber}</Text>
                <Text style={styles.label}>(seria i nr dowodu osobistego/paszportu)</Text>
            </View>

            <View style={styles.section}>
                <Text>upoważniam:</Text>
                <Text style={styles.line}>{formData.companyName}</Text>
                <Text style={styles.label}>(nazwa Firmy)</Text>
            </View>

            <View style={styles.paragraph}>
                <Text>
                    do przedłożenia w moim imieniu podpisanego przeze mnie wniosku wraz z wymaganymi dokumentami oraz proszę o przekazanie zasiłku pogrzebowego na konto zakładu pogrzebowego:
                </Text>
                <Text style={styles.line}>{formData.bankDetails}</Text>
                <Text style={styles.label}>(nr konta)</Text>
            </View>

            <View style={styles.paragraph}>
                <Text>
                    Proszę o zwrot poniższych dokumentów na wskazany adres po wypłacie zasiłku pogrzebowego: aktu zgonu oraz aktu urodzenia/małżeństwa.
                </Text>
            </View>

            <View style={styles.signature}>
                <Text style={styles.signatureField}>Podpis: .........................................................</Text>
                <Text style={styles.signatureField}>Data: .........................................................</Text>
            </View>

            <View style={styles.section}>
                <Text>
                    Ustalenie tożsamości wnioskodawcy zostało dokonane na podstawie dowodu osobistego/paszportu nr {formData.idNumber}, którą sporządził:
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.down}>{formData.employeeName}</Text>
                <Text style={styles.label}>(imię i nazwisko pracownika zakładu pogrzebowego)</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.line}></Text>
                <Text style={styles.label}>pieczątka i podpis pracownika zakładu pogrzebowego</Text>
            </View>
        </Page>
    </Document>
);

const ZUSUpowaznienieForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        authorizingName: '',
        location: '',
        date: '',
        address: '',
        requestDate: '',
        deceasedName: '',
        idNumber: '',
        companyName: '',
        bankDetails: '',
        idSeries: '',
        employeeName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerateAndUploadPDF = async () => {
        try {
            const pdfBlob = await pdf(<ZUSUpowaznieniePDF formData={formData} />).toBlob();
            const formId = localStorage.getItem('formId');
            const fileName = `ZUS_UPOWAZNIENIE_${formData.authorizingName}_${Date.now()}.pdf`;
            const filePath = `uploaded-documents/${formId}/ZUS-UPOWAŻNIENIE/${fileName}`;
            const storage = getStorage();
            const fileRef = storageRef(storage, filePath);

            await uploadBytes(fileRef, pdfBlob);
            const formRef = firestoreDoc(db, 'forms', formId);
            await updateDoc(formRef, {
                zusUpowaznienieDocument: filePath
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
                <h2>Wypełnij UPOWAŻNIENIE ZUS</h2>
                <form>
                    <p>Imię i nazwisko upoważniającego:</p>
                    <input type="text" name="authorizingName" value={formData.authorizingName} onChange={handleChange} placeholder="(imię i nazwisko)" />

                    <p>Miejscowość:</p>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="(miejscowość)" />

                    <p>Data:</p>
                    <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="(data)" />

                    <p>Dokładny adres zamieszkania:</p>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="(adres zamieszkania)" />
                    <p>W związku z wnioskiem z dnia:</p>
                    <input type="text" name="requestDate" value={formData.requestDate} onChange={handleChange} placeholder="(data wniosku)" />

                    <p>o wypłatę zasiłku pogrzebowego po zmarłym:</p>
                    <input type="text" name="deceasedName" value={formData.deceasedName} onChange={handleChange} placeholder="(imię i nazwisko zmarłego oraz stopień pokrewieństwa)" />

                    <p>Ja niżej podpisany/a:</p>
                    <input type="text" name="authorizingName" value={formData.authorizingName} onChange={handleChange} placeholder="(imię i nazwisko)" />

                    <p>legitymujący/a się dowodem osobistym/paszportem:</p>
                    <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="(seria i nr dowodu osobistego/paszportu)" />

                    <p>upoważniam:</p>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="(nazwa firmy)" />

                    <p>do przedłożenia w moim imieniu podpisanego przeze mnie wniosku wraz z wymaganymi dokumentami oraz proszę o przekazanie zasiłku pogrzebowego na konto zakładu pogrzebowego:</p>
                    <input type="text" name="bankDetails" value={formData.bankDetails} onChange={handleChange} placeholder="(nr konta bankowego)" />

                    <p>Proszę o zwrot poniższych dokumentów na wskazany adres po wypłacie zasiłku pogrzebowego: aktu zgonu oraz aktu urodzenia/małżeństwa.</p>

                    <button type="button" onClick={handleGenerateAndUploadPDF}>Wyślij i wygeneruj PDF</button>
                    <button onClick={onClose}>Zamknij</button>
                </form>
            </div>
        </div>
    );
};

export default ZUSUpowaznienieForm;

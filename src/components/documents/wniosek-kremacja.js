import React, {useState} from 'react';
import {Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font, pdf} from '@react-pdf/renderer';
import {getStorage, ref as storageRef, uploadBytes} from "firebase/storage";
import {doc as firestoreDoc, updateDoc} from "firebase/firestore";
import {db} from '../../../firebase';

// Rejestracja czcionki
Font.register({family: 'Noto Sans', src: '/fonts/NotoSans-Regular.ttf'});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Noto Sans',
        fontSize: 11,
        lineHeight: 1.6,
    },
    title: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    section: {
        marginBottom: 20,
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputWrapper: {
        width: '48%',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 2,
        marginBottom: 4,
    },
    label: {
        fontSize: 10,
        marginTop: 2,
        textAlign: 'center',
    },
    fullWidthInputWrapper: {
        width: '100%',
    },
    smallText: {
        fontSize: 10,
        textAlign: 'center',
    },
    signature: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signatureField: {
        width: '45%',
        textAlign: 'center',
        borderBottomColor: 'black',
    }
});

const WniosekKremacjaPDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>OŚWIADCZENIE</Text>
            </View>

            <View style={styles.section}>
                <Text>Ja niżej podpisany/a:</Text>
                <View style={styles.inputGroup}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{formData.name}</Text>
                        <Text style={styles.label}>Nazwisko i imię osoby udzielającej zezwolenie na kremację</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{formData.pesel}</Text>
                        <Text style={styles.label}>(Pesel)</Text>
                    </View>
                </View>

                <View style={styles.fullWidthInputWrapper}>
                    <Text style={styles.textInput}>{formData.idNumber}</Text>
                    <Text style={styles.label}>(seria i nr dowodu osobistego)</Text>
                </View>
                <View style={styles.fullWidthInputWrapper}>
                    <Text style={styles.textInput}>{formData.address}</Text>
                    <Text style={styles.label}>(adres: miejscowość, ulica, nr domu, nr mieszkania)</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text>Wyrażam zgodę na kremację (spopielenie ciała) zmarłego/zmarłej:</Text>
                <View style={styles.inputGroup}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{formData.deceasedName}</Text>
                        <Text style={styles.label}>(nazwisko i imię osoby zmarłej)</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{formData.deceasedWeight}</Text>
                        <Text style={styles.label}>(waga osoby zmarłej)</Text>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{formData.birthDate}</Text>
                        <Text style={styles.label}>(data urodzenia)</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{formData.birthPlace}</Text>
                        <Text style={styles.label}>(miejsce urodzenia)</Text>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{formData.deathDate}</Text>
                        <Text style={styles.label}>(data zgonu)</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{formData.deathPlace}</Text>
                        <Text style={styles.label}>(miejsce zgonu)</Text>
                    </View>
                </View>

                <View style={styles.fullWidthInputWrapper}>
                    <Text style={styles.textInput}>{formData.deathCertificate}</Text>
                    <Text style={styles.label}>(nr aktu zgonu, przez kogo wystawiony)</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text>Stwierdzam również, że byłem(am) spokrewniony(a) z osobą zmarłą jako:</Text>
                <View style={styles.fullWidthInputWrapper}>
                    <Text style={styles.textInput}>{formData.relation}</Text>
                    <Text style={styles.label}>(stopień pokrewieństwa np. mąż, brat)</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text>Oświadczam, że osoba zmarła nie posiadała rozrusznika serca.</Text>
            </View>

            <View style={styles.section}>
                <Text>Spopielone prochy zostaną pochowane na cmentarzu:</Text>
                <View style={styles.fullWidthInputWrapper}>
                    <Text style={styles.textInput}>{formData.cemetery}</Text>
                    <Text style={styles.label}>(nazwa cmentarza i miejscowość)</Text>
                </View>
            </View>

            <View style={styles.signature}>
                <Text style={styles.signatureField}>Podpis: .........................................................</Text>
                <Text style={styles.signatureField}>Data: .........................................................</Text>
            </View>
        </Page>
    </Document>
);

const WniosekKremacjaForm = ({isOpen, onClose}) => {
    const [formData, setFormData] = useState({
        name: '',
        pesel: '',
        idNumber: '',
        address: '',
        deceasedName: '',
        deceasedWeight: '',
        birthDate: '',
        birthPlace: '',
        deathDate: '',
        deathPlace: '',
        deathCertificate: '',
        relation: '',
        cemetery: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleGenerateAndUploadPDF = async () => {
        try {
            const pdfBlob = await pdf(<WniosekKremacjaPDF formData={formData}/>).toBlob();
            const formId = localStorage.getItem('formId');
            const fileName = `WniosekKremacja_${formData.name}_${Date.now()}.pdf`;
            const filePath = `uploaded-documents/${formId}/Wniosek do kremacji/${fileName}`;
            const storage = getStorage();
            const fileRef = storageRef(storage, filePath);

            await uploadBytes(fileRef, pdfBlob);
            const formRef = firestoreDoc(db, 'forms', formId);
            await updateDoc(formRef, {
                kremacjaDocument: filePath
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
                <h2>Wypełnij Wniosek do kremacji</h2>
                <div style={styles.content}>
                    <p>OŚWIADCZENIE</p>
                    <p>Ja niżej podpisany/a:</p>
                    <input className="input" type="text" name="name" value={formData.name} onChange={handleChange}
                           placeholder="(nazwisko i imię  osoby udzielającej zezwolenie na kremację)"/>
                    <input className="input" type="text" name="pesel" value={formData.pesel} onChange={handleChange}
                           placeholder="(PESEL)"/>

                    <p>Legitymujący(a) się dowodem osobistym:</p>
                    <input className="input" type="text" name="idNumber" value={formData.idNumber}
                           onChange={handleChange} placeholder="(seria i nr dowodu osobistego)"/>

                    <p>Zamieszkały(a):</p>
                    <input className="input" type="text" name="address" value={formData.address} onChange={handleChange}
                           placeholder="(adres:  miejscowość, ulica, nr domu, nr mieszkania)"/>

                    <p>1) Wyrażam zgodę na kremację (spopielenie ciała) zmarłego/zmarłej:</p>
                    <input className="input" type="text" name="deceasedName" value={formData.deceasedName}
                           onChange={handleChange} placeholder="(nazwisko i imię osoby zmarłej)"/>
                    <input className="input" type="text" name="deceasedWeight" value={formData.deceasedWeight}
                           onChange={handleChange} placeholder="(waga osoby zmarłej)"/>

                    <p>2) Stwierdzam również, że byłem(am) spokrewniony(a) z osobą zmarłą jako:</p>
                    <input className="input" type="text" name="relation" value={formData.relation}
                           onChange={handleChange} placeholder="(stopień pokrewieństwa np. mąż, brat)"/>
                    <p>i dokonałem(am) identyfikacji zwłok przed kremacją.</p>

                    <p>3) Oświadczam również, że osoba zmarła nie posiadała rozrusznika serca.</p>

                    <p>4) Zobowiązuję się dostarczyć zwłoki w trumnie z drewna liściastego, nie lakierowaną, pozbawioną
                        wszelkich okuć metalowych, na co najmniej jedną godzinę przed rozpoczęciem spopielenia.</p>

                    <p>Spopielone prochy zostaną pochowane na cmentarzu:</p>
                    <input className="input" type="text" name="cemetery" value={formData.cemetery}
                           onChange={handleChange} placeholder="(nazwa cmentarza i miejscowość)"/>

                    <p>Upoważniony do odbioru urny z prochami jest Pan/Pani lub Firma:</p>
                    <input className="input" type="text" name="urnRecipient" value={formData.urnRecipient}
                           onChange={handleChange}
                           placeholder="(imię i nazwisko osoby upoważnionej lub nazwa Firmy zlecającej kremację)"/>
                    <button type="button" onClick={handleGenerateAndUploadPDF}>
                        Wyślij i wygeneruj PDF
                    </button>
                    <button onClick={onClose}>Zamknij</button>
                </div>
            </div>
        </div>
    );
};

export default WniosekKremacjaForm;

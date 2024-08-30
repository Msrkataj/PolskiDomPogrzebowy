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
        marginTop: 30,
    },
    label: {
        fontSize: 9,
        marginTop: 2,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
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

const ZleceniePelnomocnictwoPDF = ({ formData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.lineGroup}>
                <View style={{ width: '60%' }}>
                    <Text style={styles.dottedLine}>{formData.location}</Text>
                    <Text style={styles.label}>Miejscowość</Text>
                </View>
                <View style={{ width: '40%' }}>
                    <Text style={styles.dottedLine}>{formData.date}</Text>
                    <Text style={styles.label}>dnia</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Zlecenie-Pełnomocnictwo</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.dottedLine}>{formData.authorizedPerson}</Text>
                <Text style={styles.label}>(nazwisko i imię osoby udzielającej pełnomocnictwa oraz jej stopień pokrewieństwa wobec osoby zmarłej)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.dottedLine}>{formData.representative}</Text>
                <Text style={styles.label}>(nazwisko imię oraz adres pełnomocnika uprawnionego do załatwienia formalności)</Text>
            </View>

            <View style={styles.section}>
                <Text>Czas i miejsce zgonu/znalezienia zwłok:</Text>
                <Text style={styles.dottedLine}>{formData.deathDate}</Text>
                <Text style={styles.label}>Data zgonu</Text>
                <Text style={styles.dottedLine}>{formData.deathTime}</Text>
                <Text style={styles.label}>Godzina zgonu</Text>
                <Text style={styles.dottedLine}>{formData.deathPlace}</Text>
                <Text style={styles.label}>Miejsce zgonu</Text>
                <Text style={styles.dottedLine}>{formData.bodyFindDate}</Text>
                <Text style={styles.label}>Data znalezienia zwłok</Text>
                <Text style={styles.dottedLine}>{formData.bodyFindTime}</Text>
                <Text style={styles.label}>Godzina znalezienia zwłok</Text>
                <Text style={styles.dottedLine}>{formData.bodyFindPlace}</Text>
                <Text style={styles.label}>Miejsce znalezienia zwłok</Text>
            </View>

            <View style={styles.section}>
                <Text>Dane osoby zmarłej:</Text>
                <Text style={styles.dottedLine}>{formData.firstName}</Text>
                <Text style={styles.label}>Imię pierwsze</Text>
                <Text style={styles.dottedLine}>{formData.secondName}</Text>
                <Text style={styles.label}>Imię drugie</Text>
                <Text style={styles.dottedLine}>{formData.lastName}</Text>
                <Text style={styles.label}>Nazwisko</Text>
                <Text style={styles.dottedLine}>{formData.maidenName}</Text>
                <Text style={styles.label}>Nazwisko rodowe</Text>
                <Text style={styles.dottedLine}>{formData.maritalStatus}</Text>
                <Text style={styles.label}>Stan cywilny</Text>
                <Text style={styles.dottedLine}>{formData.birthDate}</Text>
                <Text style={styles.label}>Data urodzenia</Text>
                <Text style={styles.dottedLine}>{formData.birthPlace}</Text>
                <Text style={styles.label}>Miejsce urodzenia</Text>
                <Text style={styles.dottedLine}>{formData.citizenship}</Text>
                <Text style={styles.label}>Obywatelstwo</Text>
                <Text style={styles.dottedLine}>{formData.pesel}</Text>
                <Text style={styles.label}>Nr PESEL</Text>
                <Text style={styles.dottedLine}>{formData.education}</Text>
                <Text style={styles.label}>Wykształcenie</Text>
            </View>

            <View style={styles.section}>
                <Text>Rodzice osoby zmarłej:</Text>
                <View style={styles.lineGroup}>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.dottedLine}>{formData.fatherFirstName}</Text>
                        <Text style={styles.label}>Imię ojca</Text>
                    </View>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.dottedLine}>{formData.motherFirstName}</Text>
                        <Text style={styles.label}>Imię matki</Text>
                    </View>
                </View>
                <View style={styles.lineGroup}>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.dottedLine}>{formData.fatherLastName}</Text>
                        <Text style={styles.label}>Nazwisko ojca</Text>
                    </View>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.dottedLine}>{formData.motherLastName}</Text>
                        <Text style={styles.label}>Nazwisko matki</Text>
                    </View>
                </View>
                <View style={styles.lineGroup}>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.dottedLine}>{formData.fatherMaidenName}</Text>
                        <Text style={styles.label}>Nazwisko rodowe ojca</Text>
                    </View>
                    <View style={{ width: '48%' }}>
                        <Text style={styles.dottedLine}>{formData.motherMaidenName}</Text>
                        <Text style={styles.label}>Nazwisko rodowe matki</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text>Małżonek osoby zmarłej:</Text>
                <Text style={styles.dottedLine}>{formData.spouseFirstName}</Text>
                <Text style={styles.label}>Imię małżonka</Text>
                <Text style={styles.dottedLine}>{formData.spouseLastName}</Text>
                <Text style={styles.label}>Nazwisko małżonka</Text>
                <Text style={styles.dottedLine}>{formData.spouseMaidenName}</Text>
                <Text style={styles.label}>Nazwisko rodowe małżonka</Text>
                <Text style={styles.dottedLine}>{formData.spousePesel}</Text>
                <Text style={styles.label}>Numer PESEL małżonka</Text>
            </View>

            <View style={styles.section}>
                <Text>Proszę o wydanie bezpłatnego odpisu skróconego aktu zgonu oraz {formData.extraCopies} egzemplarzy dodatkowych.</Text>
            </View>

            <View style={styles.signature}>
                <Text style={styles.signatureField}>Podpis: .........................................................</Text>
            </View>

            <View style={styles.section}>
                <Text>Sporządzenie aktu i wydanie 1 odpisu zwolnione od opłaty skarbowej, opłata skarbowa za skrócony odpis aktu zgonu 22 zł, za pełnomocnictwo 17 zł.</Text>
                <Text>Ustawa z dnia 16.11.2006 roku o opłacie skarbowej (Dz. U. z 2019 poz. 1000).</Text>
            </View>
        </Page>
    </Document>
);


const ZleceniePelnomocnictwoForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        location: '',
        date: '',
        authorizedPerson: '',
        representative: '',
        deathDate: '',
        deathTime: '',
        deathPlace: '',
        bodyFindDate: '',
        bodyFindTime: '',
        bodyFindPlace: '',
        firstName: '',
        secondName: '',
        lastName: '',
        maidenName: '',
        maritalStatus: '',
        birthDate: '',
        birthPlace: '',
        citizenship: '',
        pesel: '',
        education: '',
        fatherFirstName: '',
        fatherLastName: '',
        fatherMaidenName: '',
        motherFirstName: '',
        motherLastName: '',
        motherMaidenName: '',
        spouseFirstName: '',
        spouseLastName: '',
        spouseMaidenName: '',
        spousePesel: '',
        extraCopies: '',
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
                                date: data.date || '',
                                authorizedPerson: data.authorizedPerson?.name || '',
                                representative: data.representative || '',
                                deathDate: data.deathDate || '',
                                deathTime: data.deathTime || '',
                                deathPlace: data.city + " ul. " + data.street + ", " + data.postalCode || '',
                                bodyFindDate: data.bodyFindDate || '',
                                bodyFindTime: data.bodyFindTime || '',
                                bodyFindPlace: data.bodyFindPlace || '',
                                firstName: data.firstName || '',
                                secondName: data.secondName || '',
                                lastName: data.lastName || '',
                                maidenName: data.maidenName || '',
                                maritalStatus: data.maritalStatus || '',
                                birthDate: data.birthDate || '',
                                birthPlace: data.birthPlace || '',
                                citizenship: data.citizenship || '',
                                pesel: data.pesel || '',
                                education: data.education || '',
                                fatherFirstName: data.fatherFirstName || '',
                                fatherLastName: data.fatherLastName || '',
                                fatherMaidenName: data.fatherMaidenName || '',
                                motherFirstName: data.motherFirstName || '',
                                motherLastName: data.motherLastName || '',
                                motherMaidenName: data.motherMaidenName || '',
                                spouseFirstName: data.spouseFirstName || '',
                                spouseLastName: data.spouseLastName || '',
                                spouseMaidenName: data.spouseMaidenName || '',
                                spousePesel: data.spousePesel || '',
                                extraCopies: data.extraCopies || '',
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
            const pdfBlob = await pdf(<ZleceniePelnomocnictwoPDF formData={formData} />).toBlob();
            const formId = localStorage.getItem('formId');
            const fileName = `akt zgonu USC_${formData.authorizedPerson}_${Date.now()}.pdf`;
            const filePath = `uploaded-documents/${formId}/Akt zgonu USC/${fileName}`;
            const storage = getStorage();
            const fileRef = storageRef(storage, filePath);

            await uploadBytes(fileRef, pdfBlob);
            const formRef = doc(db, 'forms', formId);
            await updateDoc(formRef, {
                zleceniePelnomocnictwoDocument: filePath
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
                <h2>Wypełnij Zlecenie-Pełnomocnictwo</h2>
                <form>
                    <p>Miejscowość:</p>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Miejscowość" />

                    <p>Dnia:</p>
                    <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="Data" />

                    <p>Zlecenie-Pełnomocnictwo</p>

                    <p>Nazwisko i imię osoby udzielającej pełnomocnictwa oraz jej stopień pokrewieństwa:</p>
                    <input type="text" name="authorizedPerson" value={formData.authorizedPerson} onChange={handleChange} placeholder="Nazwisko i imię" />

                    <p>Nazwisko, imię oraz adres pełnomocnika uprawnionego do załatwienia formalności:</p>
                    <input type="text" name="representative" value={formData.representative} onChange={handleChange} placeholder="Nazwisko, imię, adres" />

                    <p>Data zgonu:</p>
                    <input type="text" name="deathDate" value={formData.deathDate} onChange={handleChange} placeholder="Data zgonu" />

                    <p>Godzina zgonu:</p>
                    <input type="text" name="deathTime" value={formData.deathTime} onChange={handleChange} placeholder="Godzina zgonu" />

                    <p>Miejsce zgonu:</p>
                    <input type="text" name="deathPlace" value={formData.deathPlace} onChange={handleChange} placeholder="Miejsce zgonu" />

                    <p>Data znalezienia zwłok:</p>
                    <input type="text" name="bodyFindDate" value={formData.bodyFindDate} onChange={handleChange} placeholder="Data znalezienia zwłok" />

                    <p>Godzina znalezienia zwłok:</p>
                    <input type="text" name="bodyFindTime" value={formData.bodyFindTime} onChange={handleChange} placeholder="Godzina znalezienia zwłok" />

                    <p>Miejsce znalezienia zwłok:</p>
                    <input type="text" name="bodyFindPlace" value={formData.bodyFindPlace} onChange={handleChange} placeholder="Miejsce znalezienia zwłok" />

                    <p>Imię pierwsze:</p>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Imię pierwsze" />

                    <p>Imię drugie:</p>
                    <input type="text" name="secondName" value={formData.secondName} onChange={handleChange} placeholder="Imię drugie" />

                    <p>Nazwisko:</p>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Nazwisko" />

                    <p>Nazwisko rodowe:</p>
                    <input type="text" name="maidenName" value={formData.maidenName} onChange={handleChange} placeholder="Nazwisko rodowe" />

                    <p>Stan cywilny:</p>
                    <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} placeholder="Stan cywilny" />

                    <p>Miejsce urodzenia:</p>
                    <input type="text" name="birthPlace" value={formData.birthPlace} onChange={handleChange} placeholder="Miejsce urodzenia" />

                    <p>Obywatelstwo:</p>
                    <input type="text" name="citizenship" value={formData.citizenship} onChange={handleChange} placeholder="Obywatelstwo" />

                    <p>Nr PESEL:</p>
                    <input type="text" name="pesel" value={formData.pesel} onChange={handleChange} placeholder="Nr PESEL" />

                    <p>Wykształcenie:</p>
                    <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Wykształcenie" />

                    <p>Imię ojca:</p>
                    <input type="text" name="fatherFirstName" value={formData.fatherFirstName} onChange={handleChange} placeholder="Imię ojca" />

                    <p>Nazwisko ojca:</p>
                    <input type="text" name="fatherLastName" value={formData.fatherLastName} onChange={handleChange} placeholder="Nazwisko ojca" />

                    <p>Nazwisko rodowe ojca:</p>
                    <input type="text" name="fatherMaidenName" value={formData.fatherMaidenName} onChange={handleChange} placeholder="Nazwisko rodowe ojca" />

                    <p>Imię matki:</p>
                    <input type="text" name="motherFirstName" value={formData.motherFirstName} onChange={handleChange} placeholder="Imię matki" />

                    <p>Nazwisko matki:</p>
                    <input type="text" name="motherLastName" value={formData.motherLastName} onChange={handleChange} placeholder="Nazwisko matki" />

                    <p>Nazwisko rodowe matki:</p>
                    <input type="text" name="motherMaidenName" value={formData.motherMaidenName} onChange={handleChange} placeholder="Nazwisko rodowe matki" />

                    <p>Imię małżonka:</p>
                    <input type="text" name="spouseFirstName" value={formData.spouseFirstName} onChange={handleChange} placeholder="Imię małżonka" />

                    <p>Nazwisko małżonka:</p>
                    <input type="text" name="spouseLastName" value={formData.spouseLastName} onChange={handleChange} placeholder="Nazwisko małżonka" />

                    <p>Nazwisko rodowe małżonka:</p>
                    <input type="text" name="spouseMaidenName" value={formData.spouseMaidenName} onChange={handleChange} placeholder="Nazwisko rodowe małżonka" />

                    <p>Numer PESEL małżonka:</p>
                    <input type="text" name="spousePesel" value={formData.spousePesel} onChange={handleChange} placeholder="Numer PESEL małżonka" />

                    <p>Proszę o wydanie bezpłatnego odpisu skróconego aktu zgonu oraz:</p>
                    <input type="text" name="extraCopies" value={formData.extraCopies} onChange={handleChange} placeholder="Liczba dodatkowych egzemplarzy" />

                    <p>Sporządzenie aktu i wydanie 1 odpisu zwolnione od opłaty skarbowej, opłata skarbowa za skrócony odpis aktu zgonu 22 zł, za pełnomocnictwo 17 zł.</p>
                    <p>Ustawa z dnia 16.11.2006 roku o opłacie skarbowej (Dz. U. z 2019 poz. 1000).</p>

                    <button type="button" onClick={handleGenerateAndUploadPDF}>Wyślij i wygeneruj PDF</button>
                    <button onClick={onClose}>Zamknij</button>
                </form>
            </div>
        </div>
    );
};

export default ZleceniePelnomocnictwoForm;


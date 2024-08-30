import React, {useEffect, useState} from 'react';
import {pdf} from '@react-pdf/renderer';
import {getStorage, ref as storageRef, uploadBytes} from "firebase/storage";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from '../../../firebase';
import {Document, Page, Text, View, StyleSheet, Font} from '@react-pdf/renderer';

// Rejestracja czcionki
Font.register({family: 'Noto Sans', src: '/fonts/NotoSans-Regular.ttf'});

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
        marginTop: 20,
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

const UpowaznienieKRUSPDF = ({formData}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.lineGroup}>
                <View style={{width: '60%'}}>
                    <Text style={styles.dottedLine}>{formData.authorizerName}</Text>
                    <Text style={styles.label}>(Imię i nazwisko upoważniającego)</Text>
                </View>
                <View style={{width: '20%'}}>
                    <Text style={styles.dottedLine}>{formData.location}</Text>
                    <Text style={styles.label}>miejscowość</Text>
                </View>
                <View style={{width: '20%'}}>
                    <Text style={styles.dottedLine}>{formData.date}</Text>
                    <Text style={styles.label}>dnia</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.dottedLine}>{formData.address}</Text>
                <Text style={styles.label}>(Dokładny adres zamieszkania)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.dottedLine}>{formData.benefitNumber}</Text>
                <Text style={styles.label}>(nr świadczenia)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>UPOWAŻNIENIE</Text>
            </View>

            <View style={styles.section}>
                <Text>Ja niżej podpisana/y:</Text>
                <Text style={styles.dottedLine}>{formData.authorizerName}</Text>
                <Text>legitymująca/y się</Text>
                <Text style={styles.dottedLine}>{formData.id}</Text>
                <Text>seria i numer</Text>
                <Text style={styles.dottedLine}>{formData.idNumber}</Text>
                <Text>wydanym dnia:</Text>
                <Text style={styles.dottedLine}>{formData.issueDate}</Text>
                <Text>przez</Text>
                <Text style={styles.dottedLine}>{formData.issuingAuthority}</Text>
            </View>

            <View style={styles.section}>
                <Text>upoważniam Kasę Rolniczego Ubezpieczenia Społecznego Oddział Regionalny w Koszalinie do
                    przekazania kwoty należnego mi zasiłku pogrzebowego po zmarłej/ym:</Text>
                <Text style={styles.dottedLine}>{formData.deceasedName}</Text>
                <Text style={styles.label}>imię i nazwisko zmarłej/go</Text>
                <Text style={styles.dottedLine}>{formData.deathDate}</Text>
                <Text>w dniu</Text>
            </View>

            <View style={styles.section}>
                <Text>nr aktu zgonu:</Text>
                <Text style={styles.dottedLine}>{formData.deathCertificateNumber}</Text>
                <Text>z dnia</Text>
                <Text style={styles.dottedLine}>{formData.deathCertificateDate}</Text>
            </View>

            <View style={styles.section}>
                <Text>na konto zakładu pogrzebowego (nazwa zakładu i numer konta):</Text>
                <Text style={styles.dottedLine}>{formData.funeralCompanyDetails}</Text>
            </View>

            <View style={styles.signature}>
                <Text style={styles.signatureField}>Podpis:
                    .........................................................</Text>
            </View>

            <View style={styles.section}>
                <Text>Stwierdzam własnoręczność podpisu i zgodność danych</Text>
                <Text style={styles.dottedLine}>{formData.verifiedBy}</Text>
                <Text style={styles.label}>data i podpis upoważnionego pracownika</Text>
            </View>
        </Page>
    </Document>
);

const UpowaznienieKRUSForm = ({isOpen, onClose}) => {
    const [formData, setFormData] = useState({
        authorizerName: '',
        location: '',
        date: '',
        address: '',
        benefitNumber: '',
        idNumber: '',
        issueDate: '',
        issuingAuthority: '',
        deceasedName: '',
        deathCertificateNumber: '',
        deathCertificateDate: '',
        funeralCompanyDetails: '',
        verifiedBy: '',
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
                                address: data.address || '',
                                benefitNumber: data.benefitNumber || '',
                                idNumber: data.idNumber || '',
                                issueDate: data.issueDate || '',
                                issuingAuthority: data.issuingAuthority || '',
                                deceasedName: `${data.name || ''} ${data.surname || ''}`,
                                deathCertificateNumber: data.deathCertificateNumber || '',
                                deathDate: data.deathDate || '',
                                funeralCompanyDetails: data.funeralCompanyDetails || '',
                                verifiedBy: data.verifiedBy || '',
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
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleGenerateAndUploadPDF = async () => {
        try {
            const pdfBlob = await pdf(<UpowaznienieKRUSPDF formData={formData}/>).toBlob();
            const formId = localStorage.getItem('formId');
            const fileName = `UPOWAZNIENIE_KRUS_${formData.authorizerName}_${Date.now()}.pdf`;
            const filePath = `uploaded-documents/${formId}/Upoważnienie KRUS/${fileName}`;
            const storage = getStorage();
            const fileRef = storageRef(storage, filePath);

            await uploadBytes(fileRef, pdfBlob);
            const formRef = doc(db, 'forms', formId);
            await updateDoc(formRef, {
                upowaznienieKrusDocument: filePath
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
                <h2>Wypełnij UPOWAŻNIENIE KRUS</h2>
                <form>
                    <p>Dnia:</p>
                    <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="Data"/>

                    <p>W miejscowości:</p>
                    <input type="text" name="location" value={formData.location} onChange={handleChange}
                           placeholder="Miejscowość"/>

                    <p>Imię i nazwisko upoważniającego:</p>
                    <input type="text" name="authorizerName" value={formData.authorizerName} onChange={handleChange}
                           placeholder="Imię i nazwisko upoważniającego"/>

                    <p>Adres zamieszkania:</p>
                    <input type="text" name="address" value={formData.address} onChange={handleChange}
                           placeholder="Dokładny adres zamieszkania"/>

                    <p>Nr. świadczenia:</p>
                    <input type="text" name="benefitNumber" value={formData.benefitNumber} onChange={handleChange}
                           placeholder="Nr świadczenia"/>

                    <h3>UPOWAŻNIENIE</h3>

                    <p>Ja niżej podpisana/y:</p>
                    <input type="text" name="authorizerName" value={formData.authorizerName} onChange={handleChange}
                           placeholder="Imię i nazwisko"/>

                    <p>Legitymująca/y się:</p>
                    <input type="text" name="id" value={formData.id} onChange={handleChange}
                           placeholder="dowód/paszport/kartapobytu"/>

                    <p>Legitymująca/y się: seria i numer</p>
                    <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange}
                           placeholder="Seria i numer"/>

                    <p>Wydanym dnia:</p>
                    <input type="text" name="issueDate" value={formData.issueDate} onChange={handleChange}
                           placeholder="Data wydania"/>

                    <p>Przez:</p>
                    <input type="text" name="issuingAuthority" value={formData.issuingAuthority} onChange={handleChange}
                           placeholder="Organ wydający"/>

                    <p>
                        Upoważniam Kasę Rolniczego Ubezpieczenia Społecznego Oddział Regionalny w Koszalinie do
                        przekazania kwoty należnego mi zasiłku pogrzebowego po zmarłej/ym:
                    </p>
                    <input type="text" name="deceasedName" value={formData.deceasedName} onChange={handleChange}
                           placeholder="Imię i nazwisko zmarłego"/>

                    <p>W dniu:</p>
                    <input type="text" name="deathCertificateDate" value={formData.deathDate}
                           onChange={handleChange} placeholder="Data zgonu"/>

                    <p>Nr aktu zgonu:</p>
                    <input type="text" name="deathCertificateNumber" value={formData.deathCertificateNumber}
                           onChange={handleChange} placeholder="Nr aktu zgonu"/>

                    <p>Z dnia:</p>
                    <input type="text" name="deathCertificateDate" value={formData.deathCertificateDate}
                           onChange={handleChange} placeholder="Data aktu zgonu"/>

                    <p>
                        Na konto zakładu pogrzebowego (nazwa zakładu i numer konta):
                    </p>
                    <input type="text" name="funeralCompanyDetails" value={formData.funeralCompanyDetails}
                           onChange={handleChange} placeholder="Nazwa zakładu i numer konta"/>

                    <button type="button" onClick={handleGenerateAndUploadPDF}>Wyślij i wygeneruj PDF</button>
                    <button onClick={onClose}>Zamknij</button>
                </form>
            </div>
        </div>

    );
};

export default UpowaznienieKRUSForm;
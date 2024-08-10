import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from '../../../firebase';

const ClientDetails = () => {
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [docsMap, setDocsMap] = useState({});
    const [documents, setDocuments] = useState([]);
    const router = useRouter();
    const { clientId } = router.query;

    const requiredDocs = {
        pelnomocnictwozp: 'Pełnomocnictwo ZP',
        wniosekkremacji: 'Wniosek do kremacji',
        zusupowaznienie: 'ZUS-UPOWAŻNIENIE',
        zaswiadczenieer: 'Zaświadczenie ER',
        aktzgonuusc: 'Akt zgonu USC',
        szpitalkoszalin: 'Szpital Koszalin odbiór ciała',
        upowaznieniekrus: 'Upoważnienie KRUS',
        odbiordokumentow: 'Upoważnienie odbiór dokumentów'
    };

    useEffect(() => {
        const fetchClientData = async () => {
            if (clientId) {
                // Pobranie danych klienta z Firestore
                const docRef = doc(db, 'forms', clientId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setClientData(docSnap.data());
                } else {
                    console.error('Nie znaleziono danych klienta.');
                }

                // Inicjalizacja mapy dokumentów z wartościami false
                const initialDocsMap = Object.keys(requiredDocs).reduce((acc, doc) => {
                    acc[doc] = false;
                    return acc;
                }, {});

                // Sprawdzenie dokumentów w Firebase Storage
                const storage = getStorage();
                const documentsRef = ref(storage, `uploaded-documents/${clientId}/`);

                const fetchedDocuments = [];
                await fetchDocumentsRecursive(documentsRef, initialDocsMap, fetchedDocuments);

                setDocsMap(initialDocsMap);
                setDocuments(fetchedDocuments);
                setLoading(false);
            }
        };

        const fetchDocumentsRecursive = async (folderRef, docsMap, fetchedDocuments) => {
            const result = await listAll(folderRef);

            for (const itemRef of result.items) {
                const docName = itemRef.name.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[^a-z0-9]/gi, '');
                const matchedKey = Object.keys(docsMap).find(key => docName.includes(key));
                if (matchedKey) {
                    docsMap[matchedKey] = true;
                    const url = await getDownloadURL(itemRef);
                    fetchedDocuments.push({ name: itemRef.name, url });
                }
            }

            for (const folder of result.prefixes) {
                await fetchDocumentsRecursive(folder, docsMap, fetchedDocuments);
            }
        };

        fetchClientData();
    }, [clientId]);

    if (loading) return <p>Ładowanie danych...</p>;

    const displayInfo = (label, value) => {
        return value ? (
            <p><strong>{label}:</strong> {value}</p>
        ) : (
            <p className="missing-info"><strong>{label}:</strong> Brak danych</p>
        );
    };

    return (
        <div className="client-details-container">
            <h1>Szczegóły klienta</h1>
            {clientData ? (
                <div className="client-info">
                    <h2>Pełnomocnik</h2>
                    {displayInfo("Imię i nazwisko", clientData.authorizedPerson?.name)}
                    {displayInfo("PESEL", clientData.authorizedPerson?.pesel)}
                    {displayInfo("Email", clientData.email)}
                    {displayInfo("Telefon", clientData.phone)}

                    <h2>Pierwsze informacje</h2>
                    {displayInfo("PESEL", clientData.location)}
                    {displayInfo("Adres zgonu", clientData.address)}
                    {displayInfo("Kiedy będą załatwiane dokumenty", clientData.documents)}

                    <h2>Informacje o osobie zmarłej</h2>
                    {displayInfo("Imię i nazwisko", `${clientData.name} ${clientData.surname}`)}
                    {displayInfo("Data urodzenia", clientData.birthDate)}
                    {displayInfo("Data śmierci", clientData.deathDate)}
                    {displayInfo("Czy osoba podlegała ubezpieczeniu emerytalno-rentowemu", clientData.worked)}
                    {displayInfo("Czy Osoba pracowała", clientData.birthDate)}
                    {displayInfo("PESEL", clientData.pesel)}
                    {displayInfo("Czy osoba zmarła była ubezpieczona w", clientData.insurance)}
                    {displayInfo("Brak świadczeń", clientData.pensionCertificate)}
                    {displayInfo("Szczegóły składki", clientData.pensionDetails)}
                    {displayInfo("Kto sporządza akt zgonu", clientData.who)}
                </div>
            ) : (
                <p>Brak danych klienta.</p>
            )}
            <div className="documents-section">
                <h2>Przesłane dokumenty</h2>
                {Object.keys(docsMap).map((key, index) => {
                    const documentInfo = documents.find(doc => doc.name.toLowerCase().includes(key));
                    return (
                        <p key={index} className={docsMap[key] ? 'document-present' : 'document-missing'}>
                            <strong>{requiredDocs[key]}:</strong> {docsMap[key] ? (
                            <>
                                Dokument dostępny
                                {documentInfo && (
                                    <a href={documentInfo.url} download className="download-link">
                                        Pobierz
                                    </a>
                                )}
                            </>
                        ) : 'Brak dokumentu'}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

export default ClientDetails;

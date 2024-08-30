import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import {arrayUnion, doc, getDoc, updateDoc} from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from '../../../firebase';
import Link from "next/link";
import Notifications from "@/components/funeral/Notifications";
import AlertMessage from "@/components/common/AlertMessage";

const ClientDetails = () => {
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [docsMap, setDocsMap] = useState({});
    const [documents, setDocuments] = useState([]);
    const router = useRouter();
    const { clientId } = router.query;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('info');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const requiredDocs = useMemo(() => ({
        pelnomocnictwozp: 'Pełnomocnictwo ZP',
        wniosekkremacji: 'Wniosek do kremacji',
        zusupowaznienie: 'ZUS-UPOWAŻNIENIE',
        zaswiadczenieer: 'Zaświadczenie ER',
        aktzgonuusc: 'Akt zgonu USC',
        szpitalkoszalin: 'Szpital Koszalin odbiór ciała',
        upowaznieniekrus: 'Upoważnienie KRUS',
        odbiordokumentow: 'Upoważnienie odbiór dokumentów'
    }), []);

    useEffect(() => {
        const fetchClientData = async () => {
            if (clientId) {
                const docRef = doc(db, 'forms', clientId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setClientData(docSnap.data());
                } else {
                    console.error('Nie znaleziono danych klienta.');
                }

                const initialDocsMap = Object.keys(requiredDocs).reduce((acc, doc) => {
                    acc[doc] = false;
                    return acc;
                }, {});

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

            for (const folder of result.prefixes) {
                const folderName = folder.name.trim().toLowerCase(); // Normalize folder name

                // Try to match the folder name with a key in requiredDocs
                const matchedKey = Object.keys(requiredDocs).find(key => requiredDocs[key].toLowerCase() === folderName);

                if (matchedKey) {
                    docsMap[matchedKey] = true;

                    // Fetch files from the matched folder
                    const fileResult = await listAll(folder);
                    for (const fileRef of fileResult.items) {
                        const url = await getDownloadURL(fileRef);
                        fetchedDocuments.push({ name: fileRef.name, url, folderName: folderName }); // Include folderName for debugging
                    }
                } else {
                    // If not matched, go deeper into the subfolder
                    await fetchDocumentsRecursive(folder, docsMap, fetchedDocuments);
                }
            }

            // Log fetched documents for debugging
            console.log("Fetched Documents:", fetchedDocuments);
        };

        fetchClientData();
    }, [clientId, requiredDocs]);
    const handleSendMessage = async () => {
        if (message.trim() === "") return;

        try {
            const docRef = doc(db, 'forms', clientId);
            const newNotification = {
                message: 'Admin przesyła wiadomość:' + message,
                name: "client",
                timestamp: new Date(),
            };
            await updateDoc(docRef, {
                notifications: arrayUnion(newNotification),
            });
            setMessage("");
            closeModal();
            setAlertMessage("Wiadomość została wysłana.");
            setAlertType("success");
            setTimeout(() => {
                router.reload();
            }, 2000);  // Odśwież stronę po 2 sekundach

        } catch (error) {
            console.error("Błąd podczas wysyłania wiadomości:", error);
            setAlertMessage("Wystąpił błąd podczas wysyłania wiadomości.");
            setAlertType("error");
        }
    };

    if (loading) return <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Ładowanie danych...</div>
    </div>

    const handleOrderClick = () => {
        router.push(`/admin/order-details?orderId=${clientId}`);
    };

    const displayInfo = (label, value) => {
        return value ? (
            <p><strong>{label}:</strong> {value}</p>
        ) : (
            <p className="missing-info"><strong>{label}:</strong> Brak danych</p>
        );
    };

    return (
        <div className="client-details-container">
            <Link className="back-link" href="/admin/panel">
                Wróć do zleceń
            </Link>
            <AlertMessage message={alertMessage} type={alertType}/>
            <div className="header-actions">
                <button className="order-button" onClick={handleOrderClick}>
                    Zobacz zamówienie klienta
                </button>
                <button className="message-button" onClick={openModal}>
                    Wyślij wiadomość
                </button>
            </div>
            {isModalOpen && (
                <div className="modal-message">
                    <div className="modal-content">
                        <h2>Wyślij wiadomość</h2>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Wpisz wiadomość"
                        />
                        <button onClick={handleSendMessage}>Wyślij</button>
                        <button onClick={closeModal}>Anuluj</button>
                    </div>
                </div>
            )}

            {clientData && clientData.notifications && (
                <Notifications
                    notifications={clientData.notifications}
                    formCreatedTimestamp={clientData.createdAt?.toDate ? clientData.createdAt.toDate() : clientData.createdAt}
                />
            )}

            <h1>Szczegóły klienta</h1>
            {clientData ? (
                <div className="client-info">
                    <h2>Pełnomocnik</h2>
                    {displayInfo("Imię i nazwisko", clientData.authorizedPerson?.name)}
                    {displayInfo("PESEL", clientData.authorizedPerson?.pesel)}
                    {displayInfo("Email", clientData.email)}
                    {displayInfo("Telefon", clientData.phone)}

                    <h2>Pierwsze informacje</h2>
                    {displayInfo("Lokalizacja (PESEL)", clientData.location)}
                    {displayInfo("Adres zgonu", clientData.address)}
                    {displayInfo("Kiedy będą załatwiane dokumenty", clientData.documents)}

                    <h2>Informacje o osobie zmarłej</h2>
                    {displayInfo("Imię i nazwisko", `${clientData.name} ${clientData.surname}`)}
                    {displayInfo("Data urodzenia", clientData.birthDate)}
                    {displayInfo("Data śmierci", clientData.deathDate)}
                    {displayInfo("Czy osoba podlegała ubezpieczeniu emerytalno-rentowemu", clientData.worked)}
                    {displayInfo("Czy osoba pracowała", clientData.worked)}
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
                    const documentInfo = documents.find(doc => doc.folderName.includes(requiredDocs[key].toLowerCase()));
                    return (
                        <div key={index} className={docsMap[key] ? 'document-present' : 'document-missing'}>
                            <strong>{requiredDocs[key]}:</strong> {docsMap[key] ? (
                            <>
                                Dokument dostępny
                                {documentInfo && (
                                    <Link href={documentInfo.url} download={documentInfo.name} target="_blank"
                                       rel="noopener noreferrer" className="download-link">
                                        Pobierz
                                    </Link>
                                )}
                            </>
                        ) : 'Brak dokumentu'}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ClientDetails;

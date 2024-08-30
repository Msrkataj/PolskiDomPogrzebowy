import React, { useEffect, useState, useMemo } from 'react'; // Dodano useMemo
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes, listAll } from "firebase/storage";
import { db } from '../../../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import PelnomocnictwoForm from "@/components/documents/pelnomocnictwo";
import WniosekKremacjaForm from "@/components/documents/wniosek-kremacja";
import ZusUpowaznienie from "@/components/documents/zus-upowaznienie";
import ZaswiadczenieEr from "@/components/documents/zaswiadczenie-er";
import ZleceniePelnomocnictwoForm from "@/components/documents/akt-zgonu";
import SzpitalKoszalinPDF from "@/components/documents/szpital-odbior-ciala";
import UpowaznienieKrus from "@/components/documents/upowaznienie-krus";
import UpowaznienieOdbiorDokumentowForm from "@/components/documents/upowaznienie-odbior-dokumentow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from "next/link";

const Documents = ({ clientId }) => {
    const [docsMap, setDocsMap] = useState({});
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true); // Dodaj stan ładowania
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadCategory, setUploadCategory] = useState('');
    const storage = getStorage();

    const documentTemplates = useMemo(() => [
        {
            key: 'pelnomocnictwozp',
            name: 'Pelnomocnictwo ZP.doc',
            folderName: 'Pełnomocnictwo ZP'
        },
        {
            key: 'wniosekkremacji',
            name: 'Wniosek do kremacji.doc',
            folderName: 'Wniosek do kremacji'
        },
        {
            key: 'zusupowaznienie',
            name: 'ZUS-UPOWAŻNIENIE.doc',
            folderName: 'ZUS-UPOWAŻNIENIE'
        },
        {
            key: 'zaswiadczenieer',
            name: 'Zaświadczenie E-R.docx',
            folderName: 'Zaświadczenie E-R'
        },
        {
            key: 'aktzgonuusc',
            name: 'akt zgonu USC.doc',
            folderName: 'Akt zgonu USC'
        },
        {
            key: 'szpitalkoszalin',
            name: 'szpital Koszalin odbiór ciała.doc',
            folderName: 'Szpital Koszalin odbiór ciała'
        },
        {
            key: 'upowaznieniekrus',
            name: 'upowaźnienie KRUS.doc',
            folderName: 'Upoważnienie KRUS'
        },
        {
            key: 'odbiordokumentow',
            name: 'upowaźnienie odbiór dokumentów.doc',
            folderName: 'Upoważnienie odbiór dokumentów'
        }
    ], []);

    const formId = typeof window !== 'undefined' ? localStorage.getItem('formId') : null;

    useEffect(() => {
        if (!formId) return;

        const fetchDocuments = async () => {
            setLoading(true);
            const initialDocsMap = documentTemplates.reduce((acc, doc) => {
                acc[doc.key] = false;
                return acc;
            }, {});

            const documentsRef = storageRef(storage, `uploaded-documents/${formId}/`);
            const fetchedDocuments = [];
            await fetchDocumentsRecursive(documentsRef, initialDocsMap, fetchedDocuments);

            setDocsMap(initialDocsMap);
            setDocuments(fetchedDocuments);
            setLoading(false);
        };

        const fetchDocumentsRecursive = async (folderRef, docsMap, fetchedDocuments) => {
            const result = await listAll(folderRef);

            for (const folder of result.prefixes) {
                const folderName = folder.name;
                const matchedKey = documentTemplates.find(doc => folderName === doc.folderName);

                if (matchedKey) {
                    docsMap[matchedKey.key] = true;

                    const fileResult = await listAll(folder);
                    if (fileResult.items.length > 0) {
                        const fileRef = fileResult.items[0];
                        const url = await getDownloadURL(fileRef);
                        fetchedDocuments.push({ name: fileRef.name, url });
                    }
                }
            }
        };

        fetchDocuments();
    }, [formId, documentTemplates, storage]);

    const handleOpenModal = (documentName) => {
        setSelectedDocument(documentName);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDocument('');
    };

    const handleDownloadEmptyDocument = (key) => {
        const matchedTemplate = documentTemplates.find(doc => doc.key === key);
        if (!matchedTemplate) return;

        const emptyDocRef = storageRef(storage, `documents/${matchedTemplate.name}`);
        getDownloadURL(emptyDocRef).then((url) => {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }).catch((error) => {
            console.error("Błąd pobierania pustego dokumentu:", error);
        });
    };

    const handleDownload = async (folderKey) => {
        const matchedTemplate = documentTemplates.find(doc => doc.key === folderKey);
        if (!matchedTemplate) return;

        const folderPath = `uploaded-documents/${formId}/${matchedTemplate.folderName}/`;

        const folderRef = storageRef(storage, folderPath);

        try {
            const folderContents = await listAll(folderRef);
            if (folderContents.items.length > 0) {
                const fileRef = folderContents.items[0];
                const url = await getDownloadURL(fileRef);
                const a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                console.error(`Brak plików w folderze: ${folderKey}`);
                alert(`Brak plików do pobrania w folderze: ${folderKey}`);
            }
        } catch (error) {
            console.error(`Błąd pobierania pliku z folderu ${folderKey}:`, error.message);
            alert(`Błąd pobierania pliku: ${error.message}`);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const matchedTemplate = documentTemplates.find(doc => doc.key === e.target.name);
        if (matchedTemplate) {
            setUploadCategory(matchedTemplate.folderName);
        } else {
            console.error("Nie znaleziono odpowiedniego folderu dla kategorii:", e.target.name);
        }
    };

    const uploadFile = async () => {
        if (!selectedFile || !uploadCategory) return;

        const filePath = `uploaded-documents/${formId}/${uploadCategory}/${selectedFile.name}`;
        const fileRef = storageRef(storage, filePath);

        try {
            await uploadBytes(fileRef, selectedFile);
            const docRef = doc(db, 'forms', formId);
            await updateDoc(docRef, {
                [`${uploadCategory}Document`]: filePath,
                notifications: arrayUnion({
                    message: `Dokument ${uploadCategory} został przesłany.`,
                    timestamp: new Date(),
                    name: 'client'
                })
            });
            alert("Plik przesłany pomyślnie!");
        } catch (error) {
            console.error("Błąd podczas przesyłania pliku:", error);
        }
    };

    return (
        <div className="container">
            <div className="documents-section-client">
                <h2>Przesłane dokumenty</h2>
                <p>Wypełnij teraz online lub pobierz pusty formularz i prześlij wypełniony plik.</p>
                {loading ? (
                    <div className="loading">
                        <FontAwesomeIcon icon={faSpinner} spin /> Ładowanie...
                    </div>
                ) : (
                    documentTemplates.map((doc, index) => {
                        const key = doc.key;
                        const documentInfo = documents.find(document => document.name === doc.name);
                        return (
                            <div key={index} className="form-item">
                                <div className="form-item__title">
                                    {doc.name}
                                </div>
                                <div className="form-item__buttons">
                                    <button className="fill-online" onClick={() => handleOpenModal(doc.name)}>
                                        Wypełnij online
                                    </button>
                                    <span>ALBO</span>
                                    <button className="download-pdf" onClick={() => handleDownloadEmptyDocument(key)}>
                                        Pobierz dokument do wypełnienia
                                    </button>

                                    <div className="form-item__upload">
                                        <label htmlFor={`upload-${index}`}>Prześlij plik:</label>
                                        <input type="file" id={`upload-${index}`} name={key} onChange={handleFileUpload} />
                                        <button onClick={uploadFile}>Prześlij</button>
                                    </div>
                                </div>
                                <div className={docsMap[key] ? 'document-present' : 'document-missing'}>
                                    {docsMap[key] ? (
                                        <>
                                            Dokument wysłany
                                            {documentInfo && (
                                                <Link href={documentInfo.url} download className="download-link">
                                                    Pobierz dokument do wypełnienia
                                                </Link>
                                            )}
                                        </>
                                    ) : 'Brak dokumentu'}
                                    {docsMap[key] && (
                                        <button className="download-pdf" onClick={() => handleDownload(key)}>
                                            Pobierz PDF
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
                {selectedDocument === 'Pelnomocnictwo ZP.doc' &&
                    <PelnomocnictwoForm isOpen={isModalOpen} onClose={handleCloseModal} />}
                {selectedDocument === 'Wniosek do kremacji.doc' &&
                    <WniosekKremacjaForm isOpen={isModalOpen} onClose={handleCloseModal} />}
                {selectedDocument === 'ZUS-UPOWAŻNIENIE.doc' &&
                    <ZusUpowaznienie isOpen={isModalOpen} onClose={handleCloseModal} />}
                {selectedDocument === 'Zaświadczenie E-R.docx' &&
                    <ZaswiadczenieEr isOpen={isModalOpen} onClose={handleCloseModal} />}
                {selectedDocument === 'akt zgonu USC.doc' &&
                    <ZleceniePelnomocnictwoForm isOpen={isModalOpen} onClose={handleCloseModal} />}
                {selectedDocument === 'szpital Koszalin odbiór ciała.doc' &&
                    <SzpitalKoszalinPDF isOpen={isModalOpen} onClose={handleCloseModal} />}
                {selectedDocument === 'upowaźnienie KRUS.doc' &&
                    <UpowaznienieKrus isOpen={isModalOpen} onClose={handleCloseModal} />}
                {selectedDocument === 'upowaźnienie odbiór dokumentów.doc' &&
                    <UpowaznienieOdbiorDokumentowForm isOpen={isModalOpen} onClose={handleCloseModal} />}
            </div>
        </div>
    );
};

export default Documents;

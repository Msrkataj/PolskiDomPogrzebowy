import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

const ZaswiadczenieFormModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        pesel: '',
        birthDate: '',
        employmentStart: '',
        employmentEnd: '',
        companyName: '',
        deathDate: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmitFile = async () => {
        if (!selectedFile) return;

        let formId = localStorage.getItem('formId');
        if (!formId) {
            formId = generateUniqueId();  // Funkcja generująca unikalne ID
            localStorage.setItem('formId', formId);
        }

        const storage = getStorage();
        const filePath = `uploaded-documents/${formId}/Zaświadczenie ER/${selectedFile.name}`;
        const fileRef = storageRef(storage, filePath);

        try {
            await uploadBytes(fileRef, selectedFile);
            const formRef = doc(db, 'forms', formId);
            await updateDoc(formRef, {
                uploadedDocument: filePath
            });
            alert('Plik został pomyślnie wysłany.');
            onClose();  // Zamknij modal po wysłaniu
        } catch (error) {
            console.error("Błąd podczas przesyłania pliku:", error);
        }
    };

    const handleDownloadCertificate = () => {
        const doc = new jsPDF();

        doc.text('ZAŚWIADCZENIE', 105, 40, null, null, 'center');
        doc.text('Niniejszym potwierdzam że Pan/Pani', 20, 60);
        doc.text(`${formData.firstName} ${formData.lastName} ur. ${formData.birthDate}`, 20, 70);
        doc.text(`(PESEL ${formData.pesel}) w okresie od ${formData.employmentStart}`, 20, 80);
        doc.text(`do ${formData.employmentEnd} r. była zatrudniona na umowę o pracę w`, 20, 90);
        doc.text(`${formData.companyName}`, 20, 100);
        doc.text(`Na dzień śmierci tj ${formData.deathDate} podlegał(a) ubezpieczeniu`, 20, 110);
        doc.text('emerytalnemu i rentowemu.', 20, 120);
        doc.text('Zaświadczenie wydano w celu nabycia prawa do zasiłku pogrzebowego.', 20, 130);

        doc.text('………………………………………………………..', 105, 170, null, null, 'center');
        doc.text('(podpis/pieczątka)', 105, 180, null, null, 'center');

        doc.save('zaswiadczenie.pdf');
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Skontaktuj się z psychologiem</h2>
                <form>
                    <label>
                        Imię:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Nazwisko:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        PESEL:
                        <input
                            type="text"
                            name="pesel"
                            value={formData.pesel}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Data urodzenia:
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Okres zatrudnienia od:
                        <input
                            type="date"
                            name="employmentStart"
                            value={formData.employmentStart}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        do:
                        <input
                            type="date"
                            name="employmentEnd"
                            value={formData.employmentEnd}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Nazwa firmy:
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Data zgonu:
                        <input
                            type="date"
                            name="deathDate"
                            value={formData.deathDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </form>
                <div className="additional-info">
                    <p>Załaduj zaświadczenie poniżej i wyślij do bazy danych</p>
                    <div className="additional-info-upload">
                        <input type="file" onChange={handleFileUpload}/>
                        <button type="button" onClick={handleSubmitFile}>
                            Wyślij
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZaswiadczenieFormModal;

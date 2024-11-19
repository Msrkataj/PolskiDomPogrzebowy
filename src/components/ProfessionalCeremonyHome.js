import { useState } from 'react';
import Image from 'next/image';
import dynamic from "next/dynamic";

const ProfessionalCeremony = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleToggle = (option) => {
        setSelectedOption(option === selectedOption ? null : option);
    };

    const getImageSrc = () => {
        switch (selectedOption) {
            case 'trumny':
                return '/assets/images/trumny-i-urny.webp';
            case 'dekoracje':
                return '/assets/images/akcesoria-pogrzebowe.webp';
            case 'mistrz':
                return '/assets/images/mistrz-ceremonii.webp';
            default:
                return '/assets/images/lilies-funeral.webp';
        }
    };

    return (
        <div className="container">
            <section id="professional" className="ceremony-section">
                <div className="content-wrapper flex-center">
                    <div className="ceremony-image">
                        <Image
                            src={getImageSrc()}
                            alt="Ceremony Image"
                            fill
                            style={{ objectFit: 'cover' }}
                            loading={"lazy"}
                        />
                    </div>
                    <div className="ceremony-text">
                        <h2>Profesjonalna organizacja ceremonii</h2>
                        <p>
                            Zapewniamy kompleksową i profesjonalną organizację ceremonii pogrzebowych,
                            współpracując wyłącznie z zaufanymi i sprawdzonymi zakładami pogrzebowymi z całej Polski.
                        </p>
                        <p>
                            Nasza platforma umożliwia łatwy wybór i rezerwację usług, takich jak:
                        </p>
                        <div className="info-options ">
                            <div className={`info-option ${selectedOption === 'trumny' ? 'active' : ''}`}
                                 onClick={() => handleToggle('trumny')}>
                                <h3>Wybór trumien i urn:</h3>
                                <span className="plus">+</span>
                                {selectedOption === 'trumny' && <p>Oferujemy szeroki wybór trumien i urn dostosowanych do różnych preferencji i budżetów. Niezależnie od tego, czy szukasz czegoś tradycyjnego czy nowoczesnego, mamy odpowiednie opcje.</p>}
                            </div>
                            <div className={`info-option ${selectedOption === 'dekoracje' ? 'active' : ''}`}
                                 onClick={() => handleToggle('dekoracje')}>
                                <h3>Dekoracje i dodatki:</h3>
                                <span className="plus">+</span>
                                {selectedOption === 'dekoracje' && <p>Dostępne są różnorodne dekoracje i dodatki, które mogą być dostosowane do indywidualnych potrzeb i życzeń, aby stworzyć wyjątkową atmosferę ceremonii.</p>}
                            </div>
                            <div className={`info-option ${selectedOption === 'mistrz' ? 'active' : ''}`}
                                 onClick={() => handleToggle('mistrz')}>
                                <h3>Mistrz ceremonii:</h3>
                                <span className="plus">+</span>
                                {selectedOption === 'mistrz' && <p>Nasi doświadczeni mistrzowie ceremonii są gotowi, aby prowadzić uroczystości z pełnym szacunkiem i profesjonalizmem, zapewniając godne pożegnanie dla Twoich bliskich.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default dynamic (() => Promise.resolve(ProfessionalCeremony), {ssr: false})
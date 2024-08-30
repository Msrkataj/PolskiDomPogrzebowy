import { useState } from 'react';
import Image from 'next/image';
import heartIcon from '../../public/assets/icons/heart.png';
import phoneIcon from '../../public/assets/icons/phone.png';
import consultantIcon from '../../public/assets/icons/consultant.png';
import SupportModal from "@/components/SupportModal";
import Link from "next/link";
import dynamic from "next/dynamic";

const FotoHome = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="container">
            <section id="emotional-support" className="support-section">
                <div className="content-wrapper">
                    <div className="support-text">
                        <Image src={heartIcon} alt="Heart Icon" width={32} height={32} />
                        <h3>Wsparcie emocjonalne i psychologiczne</h3>
                        <p>
                            Naszym celem jest wsparcie w najtrudniejszych chwilach.
                            Oferujemy kompleksowe usługi pogrzebowe na terenie całej Polski,
                            dbając o każdy szczegół, aby pożegnanie było godne i pełne szacunku.
                            Nasza platforma ma na celu usprawnienie procesu organizacji pogrzebu,
                            oferując pomoc w każdej fazie, od formalności po ceremonie.
                        </p>
                        <button onClick={openModal} className="support-button">Uzyskaj wsparcie i wskazówki</button>
                    </div>
                    <div className="support-image">
                        <Image
                            src="/assets/images/wsparcie-pychologiczne.webp"
                            alt="wsparcie-pychologiczne"
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading={"lazy"}
                        />
                    </div>
                </div>
                <div id="customer-support" className="contact-options">
                    <h2>24/7 Obsługa klienta</h2>
                    <p>
                        Jesteśmy dostępni dla Ciebie przez całą dobę, siedem dni w tygodniu.
                        Nasz czat jest zawsze otwarty, a w razie potrzeby nasi pracownicy są gotowi,
                        aby odpowiedzieć na Twoje pytania na żywo.
                        Niezależnie od pory dnia czy nocy, możesz liczyć na pełne wsparcie w trudnych chwilach.
                    </p>
                    <div className="option-main">
                        <div className="option option-down">
                            <div className="option-select">
                                <Link href="tel:+48600000000">
                                    <Image src={phoneIcon} alt="Phone" width={32} height={32}/>
                                    <p>+48 600 000 000</p>
                                </Link>
                            </div>
                        </div>
                        <div className="option option-down">
                            <div className="option-select">
                                <div>
                                    <Image src={consultantIcon} alt="Consultant" width={32} height={32}/>
                                    <p>Doradca</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SupportModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};
export default dynamic (() => Promise.resolve(FotoHome), {ssr: false})


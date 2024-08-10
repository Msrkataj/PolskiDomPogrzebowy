import Image from 'next/image';
import heartIcon from '../../public/assets/icons/heart.png';
import phoneIcon from '../../public/assets/icons/phone.png';
import consultantIcon from '../../public/assets/icons/consultant.png';

const FotoHome = () => {
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
                        <a href="/form" className="support-button">Uzyskaj wsparcie i wskazówki</a>
                    </div>
                    <div className="support-image">
                        <Image src="/assets/images/wsparcie-pychologiczne.webp" alt="wsparcie-pychologiczne" layout="fill" objectFit="cover" />
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
                        <div className="option">
                            <div className="option-select">
                                <a href="tel:+48600000000">
                                    <Image src={phoneIcon} alt="Phone" width={32} height={32}/>
                                    <p>+48 600 000 000</p>
                                </a>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-select">
                                <a href="/chat">
                                    <Image src={consultantIcon} alt="Consultant" width={32} height={32}/>
                                    <p>Konsultant</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FotoHome;

import Image from 'next/image';
import phoneIcon from '../../public/assets/icons/phone.png';
import chatIcon from '../../public/assets/icons/consultant.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import dynamic from "next/dynamic";

const PolskaMap = () => {
    return (
        <div className="container flex-center">
            <div id="nationwide-support" className="contact-home flex-center">
                <h2  className="contact-title">Pomoc na terenie całej Polski</h2>
                <section className="polska-map-section">
                    <div className="map">
                        <Image
                            src="/assets/images/map.webp"
                            alt="Mapa Polski"
                            fill
                            style={{objectFit: "contain"}}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading={"lazy"}
                        />
                    </div>
                    <div className="contact-info-main">
                        <p className="contact-info-text">Działamy na terenie całej Polski, oferując kompleksowe usługi pogrzebowe w każdym regionie. Współpracujemy z lokalnymi zakładami pogrzebowymi, aby zapewnić najwyższą jakość usług, niezależnie od miejsca, w którym się znajdujesz. Nasza platforma umożliwia szybki i łatwy dostęp do sprawdzonych zakładów pogrzebowych w Twojej okolicy.</p>
                        <div className="contact-methods">
                            <h3>Kontakt</h3>
                            <div className="contact-methods-main">
                                <div className="contact-item">
                                    <Link href="tel:+48600000000">
                                        <Image src={phoneIcon} alt="Telefon" width={32} height={32} loading="lazy"/>
                                        <div className="contact-item-details">
                                            <p>+48 600 000 000</p>
                                            <span>Telefon całodobowy</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="contact-item">
                                    <div>
                                        <Image src={chatIcon} alt="Czat na żywo" width={32} height={32} loading="lazy"/>
                                        <div className="contact-item-details">
                                            <p>Czat na żywo</p>
                                            <span>W razie dostępności</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <Link href="mailto:kontakt@pdpogrzebowy.pl">
                                        <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                                        <p>kontakt@pdpogrzebowy.pl</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
export default dynamic(() => Promise.resolve(PolskaMap), {ssr: false})


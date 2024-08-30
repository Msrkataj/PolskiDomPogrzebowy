import Image from 'next/image';
import houseIcon from '../../public/assets/icons/house.webp';
import panelIcon from '../../public/assets/icons/panel.webp';
import supportIcon from '../../public/assets/icons/support.webp';
import dynamic from "next/dynamic";

const FeaturesSection = () => {
    const features = [
        {
            icon: houseIcon,
            title: 'Kompleksowa organizacja pogrzebu z domu',
            description: 'Dzięki naszemu portalowi możesz zorganizować wszystko bez wychodzenia z domu. Współpracujemy z najbardziej profesjonalnymi zakładami pogrzebowymi, aby zapewnić najlepszy asortyment w specjalnej cenie.'
        },
        {
            icon: panelIcon,
            title: 'Stały Dostęp do Panelu Zarządzania',
            description: 'Stały dostęp do Twojego panelu, gdzie na bieżąco możesz monitorować proces organizacji pogrzebu. Udostępnij bliskim informacje o przebiegu ceremonii, aby wspólnie, mimo odległości, uczestniczyć w tych trudnych chwilach.'
        },
        {
            icon: supportIcon,
            title: 'Profesjonalna pomoc od początku do końca',
            description: 'Nie zostawimy Cię po pogrzebie. Jesteśmy do Twojej dyspozycji, oferując pomoc psychologiczną, prawną oraz wsparcie w załatwianiu spraw urzędowych i spadkowych. Zapewniamy również opiekę nad miejscem pochówku.'
        }
    ];

    return (
        <div className="container">
            <section id="kim-jestesmy" className="features-section">
                <h2>Kim jesteśmy i co oferujemy?</h2>
                <div className="features-container">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-image">
                                <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw,
                                       (max-width: 1200px) 50vw,
                                       33vw"
                                    loading={"lazy"}
                                    style={{objectFit: "contain"}}
                                />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
export default dynamic (() => Promise.resolve(FeaturesSection), {ssr: false})


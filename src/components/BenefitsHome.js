import React from 'react';


const Benefits = () => {
    const benefits = [
        {
            title: 'Trumny i Urny',
            description: 'Oferujemy bogaty wybór trumien i urn, aby każdy mógł znaleźć odpowiednią formę pożegnania. Nasze produkty charakteryzują się wysoką jakością wykonania i różnorodnością stylów, które odpowiadają indywidualnym potrzebom i oczekiwaniom.',
        },
        {
            title: 'Tabliczki Metalowe i Krzyże',
            description: 'Nasze tabliczki metalowe i krzyże stanowią eleganckie i trwałe elementy upamiętnienia. Dostępne w różnych wzorach i rozmiarach, są idealnym wyborem do umieszczenia na grobach, zapewniając estetyczne i czytelne oznaczenie miejsca pochówku.',
        },
        {
            title: 'Wieńce Kwiatowe',
            description: 'Nasza oferta wieńców kwiatowych obejmuje różnorodne kompozycje kwiatowe, które wyrażają szacunek i miłość. Każdy wieniec jest starannie przygotowany z myślą o godnym upamiętnieniu bliskiej osoby, oferując piękno i delikatność w trudnych chwilach.',
        },
    ];

    return (
        <section className="benefits-section">
            <h2 id="asortyment">Szeroki wybór asortymentu pogrzebowego</h2>
            <div className="benefits-container">
                {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-card">
                        <h3>{benefit.title}</h3>
                        <p>{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Benefits;

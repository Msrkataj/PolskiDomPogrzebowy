import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthGuard from "@/components/panel/AuthGuard";

const statusDescriptions = {
    'Nowe zgłoszenie': 'To jest początkowy etap zamówienia, w którym zgłoszenie zostało odebrane, ale jeszcze nie rozpoczęto jego przetwarzania. W tym momencie zamówienie oczekuje na dalsze kroki weryfikacyjne i administracyjne, zanim zostanie przekazane do kolejnych etapów realizacji.',
    'Weryfikacja danych': 'Zamówienie jest w trakcie szczegółowej weryfikacji danych dostarczonych przez klienta. Ten etap obejmuje sprawdzenie poprawności danych kontaktowych, zgodności dokumentów, oraz upewnienie się, że wszystkie wymagane informacje zostały dostarczone. Może to również obejmować kontakt z klientem w celu wyjaśnienia nieścisłości lub uzupełnienia brakujących informacji.',
    'Oczekiwanie na dokumenty': 'Ten etap następuje, gdy zamówienie wymaga dodatkowych dokumentów lub informacji od klienta. Zamówienie nie może przejść do kolejnych etapów, dopóki nie zostaną dostarczone wszystkie wymagane dokumenty, takie jak akt zgonu, zgoda na pochówek, itp. W tym czasie administracja monitoruje postęp w dostarczaniu brakujących dokumentów.',
    'Planowanie ceremonii': 'Na tym etapie ustalane są szczegóły ceremonii pogrzebowej, w tym daty, godziny, miejsca, a także specyficzne życzenia rodziny zmarłego. Obejmuje to również koordynację z duchownymi, usługodawcami i innymi zaangażowanymi stronami. Celem jest opracowanie szczegółowego planu, który spełni wszystkie wymagania i oczekiwania klienta.',
    'Potwierdzenie terminu': 'Termin ceremonii został uzgodniony z klientem oraz wszystkimi zaangażowanymi stronami. W tym momencie harmonogram jest oficjalnie zatwierdzony, a klient jest informowany o ostatecznych ustaleniach. Obejmuje to również rezerwację wszelkich zasobów, takich jak kaplica, sala pożegnań, czy transport.',
    'Przygotowanie miejsca pochówku': 'Zespół przygotowuje miejsce pochówku zgodnie z ustaleniami. Może to obejmować przygotowanie grobu, dostarczenie i ustawienie namiotu nad grobem, oraz wszelkie inne prace związane z przygotowaniem miejsca do ceremonii. Na tym etapie zapewnia się, że miejsce pochówku spełnia wszystkie wymagania estetyczne i techniczne.',
    'Oczekiwanie na odbiór trumny/urny': 'Czekamy na dostawę lub odbiór wybranego asortymentu przez klienta. Obejmuje to przygotowanie trumny lub urny oraz wszelkich innych zamówionych elementów, które muszą być gotowe na czas ceremonii. Może również obejmować personalizację lub inskrypcje na trumnie/urnie.',
    'Przygotowanie ciała': 'Ciało zmarłego jest przygotowywane do pochówku lub kremacji zgodnie z życzeniami rodziny. Ten proces może obejmować mycie, ubieranie, balsamowanie, makijaż, oraz inne zabiegi kosmetyczne. W przypadku kremacji, ciało jest przygotowywane zgodnie z wymaganiami krematorium. W tym czasie zapewnia się, że zmarły jest traktowany z należnym szacunkiem i godnością.',
    'Ceremonia pogrzebowa': 'Ceremonia pogrzebowa jest w trakcie realizacji. Na tym etapie wszystkie przygotowania zostały zakończone i odbywa się właściwy pogrzeb. Zespół koordynuje przebieg ceremonii, zapewniając, że wszystko odbywa się zgodnie z planem, w tym przemówienia, modlitwy, muzyka, i inne elementy ceremonii.',
    'Zakończone': 'Wszystkie czynności związane z zamówieniem zostały zakończone, a ceremonia pogrzebowa została pomyślnie przeprowadzona. Obejmuje to również ewentualne działania po ceremonii, takie jak przekazanie dokumentów, uregulowanie płatności, i inne formalności. Zamówienie zostaje zamknięte i archiwizowane.'
};

const Help = () => {
    const router = useRouter();

    return (
        <div className="help-container">
            <h1>Centrum Pomocy</h1>
            <div className="section faq-section">
                <h2>Najczęściej Zadawane Pytania (FAQ)</h2>
                <div className="faq-item">
                    <h3>Jak dodać nowy dom pogrzebowy?</h3>
                    <p>Aby dodać nowy dom pogrzebowy, przejdź do sekcji &quot;Domy Pogrzebowe&quot; w panelu administracyjnym i kliknij przycisk &quot;Dodaj nowy&quot;. Tam znajdują się wnioski od domow pogrzebowych. Po akceptowaniu zgloszenia, użutkownik dostaje email i hasło wraz linkiem do konfiguracji konta.</p>
                </div>
                <div className="faq-item">
                    <h3>Jak mogę edytować zamówienie?</h3>
                    <p>Aby edytować zamówienie, przejdź do sekcji &quot;Zamówienia&quot;, wybierz zamówienie, które chcesz edytować, a następnie kliknij &quot;Edytuj&quot;. Po wprowadzeniu zmian, kliknij &quot;Zapisz&quot;.</p>
                </div>
                <div className="faq-item">
                    <h3>Co zrobić, jeśli napotkam błąd?</h3>
                    <p>W przypadku napotkania błędu, prosimy o kontakt z naszym zespołem wsparcia technicznego poprzez sekcję &quot;Kontakt z Pomocą Techniczną&quot; poniżej.</p>
                </div>
            </div>

            <div className="section contact-section">
                <h2>Kontakt z Pomocą Techniczną</h2>
                <h3>Jeśli potrzebujesz pomocy, skontaktuj się z naszym zespołem wsparcia technicznego:</h3>
                <ul>
                    <li>Email: support@example.com</li>
                    <li>Telefon: +48 123 456 789</li>
                    <li>Godziny wsparcia: Poniedziałek - Piątek, 9:00 - 17:00</li>
                </ul>
            </div>

            <div className="section shortcuts-section">
                <h2>Pomoc - Opis Statusów Zamówień</h2>
                {Object.entries(statusDescriptions).map(([status, description], index) => (
                    <div key={index} className="status-description-item">
                        <h2 className="status-title">{status}</h2>
                        <p className="status-description">{description}</p>
                    </div>
                ))}
            </div>
            <div className="section documentation-section">
                <h2>Dokumentacja Systemu</h2>
                <p>Tu będzie dodatkowa dokumentacja</p>
            </div>
        </div>
    );
};

const HelpWithAuth = () => (
    <AuthGuard>
        <Help/>
    </AuthGuard>
);

export default HelpWithAuth;
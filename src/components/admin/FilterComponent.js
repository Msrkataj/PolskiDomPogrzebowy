import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const FilterComponent = ({ onFilterChange }) => {
    const [funeralHomeName, setFuneralHomeName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchFuneralHomeNames = async () => {
            const querySnapshot = await getDocs(collection(db, 'domyPogrzebowe'));
            const homeNames = querySnapshot.docs.map(doc => doc.data().funeralHomeName);
            setSuggestions(homeNames);
        };

        fetchFuneralHomeNames();
    }, []);

    const handleFuneralHomeChange = (e) => {
        setFuneralHomeName(e.target.value);
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
    };

    const handleSearchClick = () => {
        onFilterChange({
            funeralHomeName,
            startDate,
            endDate,
        });
    };

    const handleClearFilters = () => {
        setFuneralHomeName('');
        setStartDate('');
        setEndDate('');
        onFilterChange({ funeralHomeName: '', startDate: '', endDate: '' });
    };

    return (
        <div className="filter-container">
            <input
                type="text"
                value={funeralHomeName}
                onChange={handleFuneralHomeChange}
                placeholder="Wyszukaj dom pogrzebowy..."
                list="suggestions"
                className="filter-input"
            />
            <datalist id="suggestions">
                {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion}/>
                ))}
            </datalist>
            <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={handleDateChange}
                placeholder="dd.mm.rrrr"
                className="filter-input"
            />
            <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleDateChange}
                placeholder="dd.mm.rrrr"
                className="filter-input"
            />
            <button onClick={handleClearFilters}>Wyczyść</button>
            <button onClick={handleSearchClick}>Szukaj</button>
        </div>
    );
};

export default FilterComponent;

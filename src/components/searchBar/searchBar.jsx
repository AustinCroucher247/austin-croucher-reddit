import React, { useState } from 'react';
import './searchBar.scss';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div className="search-bar">
            <input
                className="search-input"
                type="text"
                placeholder='Search Reddit'
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchBar;
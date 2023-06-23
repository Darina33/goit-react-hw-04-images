import { useState } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

import { ReactComponent as Search } from "./Search.svg";

export default function Searchbar({ onSubmit }){

    const [query, setQuery] = useState('');

    const onSubmitQuery = e => { 
        e.preventDefault();

        if (query.trim() === '') {
            Notify.warning('Enter text');
            return;
        }
        
        onSubmit(query);
        setQuery('');
    };

    const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
    }
    
    return (<header className="Searchbar">
            <form className="SearchForm"
                  onSubmit={onSubmitQuery}>
                <button type="submit"
                        className="SearchForm-button">
                    <Search width="30" height="30" />
                </button>
                <input 
                    value={query}
                    onChange={handleChange}
                    name="query"
                    type="text"
                    className="SearchForm-input"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos" />
            </form>
            </header>
        )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
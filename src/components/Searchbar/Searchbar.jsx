import React from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

import { ReactComponent as Search } from "./Search.svg";

export default class Searchbar extends React.Component {
    state = {
        query: '',
    };

    handleChange = e => {

        this.setState({
            query: e.currentTarget.value.toLowerCase()
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.query.trim() === '') {
            Notify.warning('Enter text');
            return;
        }
        
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' })
    };

    render() { 
        const { query } = this.state;

        return (<header className="Searchbar">
            <form className="SearchForm"
                  onSubmit={this.handleSubmit}>
                <button type="submit"
                        className="SearchForm-button">
                    <Search width="30" height="30" />
                </button>
                <input 
                    value={query}
                    onChange={this.handleChange}
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
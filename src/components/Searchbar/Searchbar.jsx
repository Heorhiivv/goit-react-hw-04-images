import { useState } from 'react';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputValueChange = e => {
    setSearchQuery(e.currentTarget.value);
  };
  const onSearchFormSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warn('Enter word to search');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSearchFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="searchQuery"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputValueChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

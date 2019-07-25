import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Countries from './components/Countries';

const App = () => {
  // App states
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [countriesFound, setCountriesFound] = useState([]);

  // Data fetching
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  // Event handlers
  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  // Find countries matching search term
  const searchCountries = searchTerm => {
    let countriesFound = [];
    if (searchTerm.trim()) {
      countriesFound = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }
    return countriesFound;
  };

  //console.log('rendered', countries.length, 'countries');
  //console.log('found', searchCountries(searchTerm));

  return (
    <div>
      <Search onChange={handleSearchTermChange} />
      <Countries countriesFound={searchCountries(searchTerm)} />
    </div>
  );
};

export default App;

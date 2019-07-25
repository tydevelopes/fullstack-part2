import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Countries from './components/Countries';

const App = () => {
  // App states
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = useState({});

  // event handler
  const handleShowCountry = newCountry => {
    setShowCountry(true);
    setCountry(newCountry);
  };

  // Data fetching
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  // Event handlers
  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
    setShowCountry(false);
    setCountry({});
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

  return (
    <div>
      <Search onChange={handleSearchTermChange} />
      <Countries
        countriesFound={searchCountries(searchTerm)}
        handleShowCountry={handleShowCountry}
        showCountry={showCountry}
        country={country}
      />
    </div>
  );
};

export default App;

import React from 'react';

const Countries = ({ countriesFound }) => {
  const numberOfCountriesFound = countriesFound.length;
  if (numberOfCountriesFound > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (numberOfCountriesFound > 1 && numberOfCountriesFound <= 10) {
    return (
      <div>
        {countriesFound.map(({ name, numericCode }) => (
          <div key={numericCode}>{name}</div>
        ))}
      </div>
    );
  }
  if (numberOfCountriesFound === 1) {
    const [{ name, capital, population, languages, flag }] = countriesFound; // array of objects destructuring
    console.log(countriesFound);

    return (
      <div>
        <h2>{name}</h2>
        <div>Capital: {capital}</div>
        <div>Population: {population}</div>
        <h4>Languages</h4>
        <ul>
          {languages.map(({ name, iso639_1 }) => (
            <li key={iso639_1}>{name}</li>
          ))}
        </ul>
        <img src={flag} width="80px" />
      </div>
    );
  }
  return <div>Type a country in the search above to see its details</div>;
};

export default Countries;

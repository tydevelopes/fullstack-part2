import React from 'react';

const Countries = props => {
  // Show a country details
  const renderCountry = ({ name, capital, population, languages, flag }) => {
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
        <img src={flag} width="80px" alt="" />
      </div>
    );
  };

  const numberOfCountriesFound = props.countriesFound.length;

  if (numberOfCountriesFound > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (numberOfCountriesFound > 1 && numberOfCountriesFound <= 10) {
    return props.showCountry ? (
      renderCountry(props.country)
    ) : (
      <div>
        {props.countriesFound.map(country => (
          <div key={country.numericCode}>
            {country.name}{' '}
            <button onClick={() => props.handleShowCountry(country)}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
  if (numberOfCountriesFound === 1) {
    const [country] = props.countriesFound;
    return renderCountry(country);
  }
  return <div>Type a country in the search above to see its details</div>;
};

export default Countries;

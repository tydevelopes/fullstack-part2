import React from 'react';

const Countries = props => {
  // Show a country details
  const renderCountry = (country, weatherData) => {
    let renderCapital,
      renderTemp,
      renderText,
      renderIcon,
      windSpeed,
      windDirection;
    const { name, capital, population, languages, flag } = country;

    if (weatherData) {
      const {
        location: { name: countryCapital },
        current: {
          temp_f,
          condition: { text, icon },
          wind_mph,
          wind_dir
        }
      } = weatherData;

      renderCapital = countryCapital;
      renderTemp = temp_f;
      renderText = text;
      renderIcon = icon;
      windSpeed = wind_mph;
      windDirection = wind_dir;
    }

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
        <div>
          <h4>Weather in {renderCapital}</h4>
          <p>
            <b>Temperature: </b>
            {renderTemp} &deg;F
          </p>
          <div>{renderText}</div>
          <img src={renderIcon} alt="" />
          <div>
            <b>Wind: </b>
            {windSpeed} mph {windDirection}
          </div>
        </div>
      </div>
    );
  };

  const numberOfCountriesFound = props.countriesFound.length;

  if (numberOfCountriesFound > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (numberOfCountriesFound > 1 && numberOfCountriesFound <= 10) {
    return props.showCountry ? (
      renderCountry(props.country, props.countryCapitalWeather)
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
    props.handleShowCountry(country);
    return renderCountry(country, props.countryCapitalWeather);
  }
  return <div>Type a country in the search above to see its details</div>;
};

export default Countries;

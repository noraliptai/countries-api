import './CountryData.css'

function CountryData({selectedCountry, setSelectedCountry}) {

  return (
    <div className="countryDetails">
      <h1>{selectedCountry.name.common}</h1>
      <h3>Capital: {selectedCountry.capital}</h3>
      <img src={selectedCountry.flags.png} alt='flag'/>
      <h4>Area: {selectedCountry.area} km2</h4>
      <h4>Population: {selectedCountry.population}</h4>
      <p>Continent: {selectedCountry.continents.map(continent => continent).join(", ")}</p>
      <p>Region: {selectedCountry.region}</p>
      <p>Timezones: {selectedCountry.timezones.map(timezone => timezone).join(", ")}</p>
      <p>Languages: {Object.values(selectedCountry.languages).join(", ")}</p>
      <p>Currencies: {Object.keys(selectedCountry.currencies).map(key => selectedCountry.currencies[key].name).join(", ")}</p>
      <button onClick={() => {
        setSelectedCountry(null)
      }}>Back</button>
    </div>
  )
}

export default CountryData
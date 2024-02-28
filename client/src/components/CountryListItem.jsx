import { useState } from "react"

function CountryListItem({ country, setSelectedCountry, favoriteCountries }) {
  const [addedToFavs, setAddedToFavs] = useState(Boolean(favoriteCountries.find(listItem => country.name.common === listItem.name.common)))

  const addToFavs = (country) => {
    fetch('/favorites/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(country)
    })
      .then(res => res.json())
      .then(console.log)
    setAddedToFavs(true)
  }

  const deleteFromFavs = (country) => {
    fetch('/favorites/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(country)
    })
      .then(res => res.json())
      .then(console.log)
    setAddedToFavs(false)
  }

  return (
    <div className="countryName">
      <h2>{country.name.common}</h2>
      
      <button onClick={() => {
        setSelectedCountry(country)
      }}>Learn more</button>
      
      <button onClick={addedToFavs
        ?
        () => deleteFromFavs(country)
        :
        () => addToFavs(country)
      }>{addedToFavs ? '-' : '+'}</button>
    </div>
  )
}

export default CountryListItem
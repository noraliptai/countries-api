import { useEffect, useState } from "react"
import './Countries.css'
import CountryListItem from "./CountryListItem"
import FavoriteCountries from "./FavoriteCountries"

function Countries({countries, setSelectedCountry, welcome }) {
  const [sort, setSort] = useState("")
  const [filteredCountries, setFilteredCountries] = useState("")
  const [searchString, setSearchString] = useState("")
  const [favoriteCountries, setFavoriteCountries] = useState(null)
  const [clickedOnFavs, setClickedOnFavs] = useState(false)

  useEffect(() => {
    fetch('/favorites')
      .then(res => res.json())
      .then(data => {
        setFavoriteCountries(data)
        console.log(data)
      })
  }, [])

  useEffect(() => {
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(searchString.toLowerCase())))
  }, [searchString, countries])

  return (
    <>
      <h1 className="title">{welcome}</h1>
      <div className="sortButtons">
        
        <button onClick={() => {
          setSort("asc")
        }}>sort A-Z</button>
        
        <button onClick={() => {
          setSort("desc")
        }}>sort Z-A</button>

        <button onClick={() => setClickedOnFavs(true)}>Show favorites</button>
      </div>

      <input className="searchInput" type="text" placeholder="search countries" onChange={(event) => {
        setSearchString(event.target.value)
      }}/>

      {favoriteCountries
      &&
      <div className="countryList">
        {
        clickedOnFavs
        ?
        <FavoriteCountries favoriteCountries={favoriteCountries} setSelectedCountry={setSelectedCountry} setFavoriteCountries={setFavoriteCountries} setClickedOnFavs={setClickedOnFavs} />
        :
        searchString === ""
        ?
          (sort === "asc"
          ? 
          [...countries]
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country, index) => <CountryListItem country={country} key={index} setSelectedCountry={setSelectedCountry} favoriteCountries={favoriteCountries} />)
          :
          sort === "desc"
          ?
          [...countries]
          .sort((a, b) => b.name.common.localeCompare(a.name.common))
          .map((country, index) => <CountryListItem country={country} key={index} setSelectedCountry={setSelectedCountry} favoriteCountries={favoriteCountries} />)
          :
          countries.map((country, index) => <CountryListItem country={country} key={index} setSelectedCountry={setSelectedCountry} favoriteCountries={favoriteCountries} />))
        :
          (sort === "asc"
          ? 
          [...filteredCountries]
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country, index) => <CountryListItem country={country} key={index} setSelectedCountry={setSelectedCountry} favoriteCountries={favoriteCountries} />)
          :
          sort === "desc"
          ?
          [...filteredCountries]
          .sort((a, b) => b.name.common.localeCompare(a.name.common))
          .map((country, index) => <CountryListItem country={country} key={index} setSelectedCountry={setSelectedCountry} favoriteCountries={favoriteCountries} />)
          :
          filteredCountries.map((country, index) => <CountryListItem country={country} key={index} setSelectedCountry={setSelectedCountry} favoriteCountries={favoriteCountries} />)) 
        }
      </div>
      }
    </>
  )
}

export default Countries
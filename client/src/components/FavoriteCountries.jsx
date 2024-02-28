import { useEffect } from "react"
import CountryListItem from "./CountryListItem"

function FavoriteCountries({ favoriteCountries, setSelectedCountry, setFavoriteCountries, setClickedOnFavs }) {
  useEffect(() => {
    fetch('/favorites')
      .then(res => res.json())
      .then(data => {
        setFavoriteCountries(data)
        console.log(data)
      })
  }, [])
  
  return (
    <div>
      <button onClick={() => setClickedOnFavs(false)}>Back to main</button>
      
      {favoriteCountries.map((country, index) => <CountryListItem country={country} key={index} setSelectedCountry={setSelectedCountry} favoriteCountries={favoriteCountries} />)}
    </div>
  )
}

export default FavoriteCountries
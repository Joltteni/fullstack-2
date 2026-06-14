import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const VITE_API_KEY = import.meta.env.VITE_API_KEY

const Search = (props) => {
return(
  <div>
  <input value={props.filtered} onChange={props.filterUpdate}></input>
  </div>
)
}
const CountryInformationButton = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <div>
      <button onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? 'hide' : 'show'}
      </button>
      {showInfo && <CountryInfo country={country} />}
    </div>
  )
}
const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: country.capital[0],
        appid: VITE_API_KEY,
        units: 'metric'
      }
    })
    .then(response => setWeather(response.data))
  }, [])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png}/>
      <h2>Weather in {country.capital[0]}</h2>
      {weather && <p>Temperature: {weather.main.temp}°C</p>}
      {weather && <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />}
      {weather && <p>Wind: {weather.wind.speed} m/s</p>}
    </div>
  )
}
const Results = ({ filter }) => {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const filterResults = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filterResults.length<10 && filterResults.length!=1){
  return (
    <div>
      {filterResults.map(country => (
        <div key={country.capital}>{country.name.common} <CountryInformationButton country={country}/></div>
      ))}
    </div>
  )
}
else if (filterResults.length==1){
  return <CountryInfo country={filterResults[0]} />

}
else if (filterResults.length>10 && filter!=null && filter!=''){
  return (
    <div>Too many matches, specify another filter</div>
  )
}
}

const App = () => {
  const [filtered, setFilter] = useState('')
  const filterUpdate = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      find countries <Search filtered={filtered} filterUpdate={filterUpdate}/>
      <Results filter={filtered}/>
    </div>
  )
}

export default App
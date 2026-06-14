import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const Search = (props) => {
return(
  <div>
  <input value={props.filtered} onChange={props.filterUpdate}></input>
  </div>
)
}
const CountryInformationButton = (props) => {
  const [showInfo, setShowInfo] = useState(false)
  const country = props.country

  return (
    <div>
      <button onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? 'hide' : 'show'}
      </button>
      {showInfo &&
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
        </div>
      }
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
    return (
      <div>
        <h2>{filterResults[0].name.common}</h2>
        <p>Capital: {filterResults[0].capital}</p>
        <p>Area: {filterResults[0].area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(filterResults[0].languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={filterResults[0].flags.png}/>
      </div>
    )
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
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })  
}, [])

  const addPhoneNumber = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name === newName)) { //nimi listassa?
    const phoneBookObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1 //id +1 jokasee
    }
    personsService.create(phoneBookObject)
    setPersons(persons.concat(phoneBookObject))
  }
    else {
      alert(`${newName} has already been added to phonebook`)
    }
    setNewName('') //input tyhjäks
    setNewNumber('') //input tyhjäks
  }

    const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
    const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
      const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtered={filtered} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addPhoneNumber={addPhoneNumber} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filtered={filtered}/>
    </div>
  )
}

export default App
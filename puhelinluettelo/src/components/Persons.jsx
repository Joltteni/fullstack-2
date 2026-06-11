import axios from "axios"

const Persons = (props) => {
const personDeletor = (person) => {
  if (!window.confirm(`are you sure you want to delete ${person.name}?`)) return
  axios.delete(`http://localhost:3001/persons/${person.id}`)
    .then(() => { //confirmed so show new list of people
      props.setPersons(persons => persons.filter(p => p.id !== person.id))
    })
}

  return (
    <div>
      {props.persons
        .filter(person => person.name.toUpperCase().includes(props.filtered.toUpperCase()))
        .map(person => (
          <p key={person.id}>
            {person.name} {person.number} <button onClick={() => personDeletor(person)}>delete</button>
           </p>
        ))
      }
    </div>
  )
}

export default Persons
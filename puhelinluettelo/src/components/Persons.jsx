  const Persons = (props) => {
 return (
    <div>
            {props.persons.filter(person => person.name.toUpperCase().includes(props.filtered.toUpperCase())).map(person => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))
    }
    </div>
 )
}
export default Persons
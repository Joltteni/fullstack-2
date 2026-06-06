const Header = (props) => {

return (
  <div>
<h2>{props.title}</h2>
  </div>
)
}

const Part = (props) => {

return (
  <div>
    <p>{props.name} {props.exercises}</p>
  </div>
)
}
const TotalExercises = (props) => {
  const exercises = props.course.parts.map(part=> part.exercises);

  const total = exercises.reduce((s,t) => s+t,0); //(sum & totals) summa yhteensä :D
return (
  <div>
    <strong>total of {total} exercises</strong>
  </div>
)
}

const Course = (props) => {
return (
  <div>
    <Header title={props.course.name}/>
    {props.course.parts.map((part) => (
      <Part name={part.name} exercises={part.exercises} key={part.id} />
    ))
    }
    <TotalExercises course={props.course}/>
  </div>
)
}

export default Course
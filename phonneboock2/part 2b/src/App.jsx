import { useState } from 'react'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewFilter] = useState('')

  const addpersons = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber,
      id: Date.now(),
    }
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName}is alredy added to phonebook`)
      return
    }

    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }
  const personfilter =
    newfilter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newfilter.toLowerCase()),
        )

  const handleChangePersons = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberpersons = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterpersons = (event) => {
    console.log(handleFilterpersons, event)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newfilter={newfilter} handleFilterpersons={handleFilterpersons} />
      <h1>ADD A NEW </h1>
      <Personform
        onSubmit={addpersons}
        newName={newName}
        handleChangePersons={handleChangePersons}
        newnumber={newNumber}
        handleNumberpersons={handleNumberpersons}
      />

      <h2>Numbers</h2>
      <Person persons={persons} />
    </div>
  )
}
export default App

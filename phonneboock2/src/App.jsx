import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Person from './components/Person'
import personServices from './services/persons'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [erroMessage, setErroMessage] = useState(null)
  useEffect(() => {
    console.log('effect')

    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addpersons = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newName)

    const person = {
      name: newName,
      number: newNumber,
    }

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const changePerson = { ...existingPerson, number: newNumber }

        personServices
          .update(existingPerson.id, changePerson)
          .then((returnPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnPerson,
              ),
            )
            setNotification(`updated ${returnPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.log(error)
            setErroMessage(
              `Information of ${existingPerson.name} has already been removed from server`,
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      personServices.create(person).then((returnPerson) => {
        setPersons(persons.concat(returnPerson))
        setNotification(`added ${returnPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
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
  const deletePerson = (id, name) => {
    if (window.confirm(`delete ${name}`)) {
      personServices.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type='success' />
      <Notification message={erroMessage} type='error' />

      <Filter newfilter={newfilter} handleFilterpersons={handleFilterpersons} />
      <h1>ADD A NEW </h1>
      <Personform
        addpersons={addpersons}
        newName={newName}
        newNumber={newNumber}
        handleChangePersons={handleChangePersons}
        handleNumberpersons={handleNumberpersons}
      />

      <h2>Numbers</h2>
      <Person persons={personfilter} deletePerson={deletePerson} />
    </div>
  )
}
export default App

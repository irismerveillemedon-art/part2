import React from 'react'

function Person({ persons, deletePerson }) {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name}
          {person.number}{' '}
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

export default Person

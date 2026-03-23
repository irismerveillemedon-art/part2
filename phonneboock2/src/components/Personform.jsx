import React from 'react'

function Personform({
  addpersons,
  newName,
  newNumber,
  handleNumberpersons,
  handleChangePersons,
}) {
  return (
    <div>
      <form onSubmit={addpersons}>
        <div>
          name: <input value={newName} onChange={handleChangePersons} />
        </div>

        <div>
          Number:
          <input value={newNumber} onChange={handleNumberpersons} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default Personform

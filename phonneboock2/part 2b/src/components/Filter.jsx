import React from 'react'

function Filter({ newfilter, handleFilterpersons }) {
  return (
    <div>
      filter shown with:
      <input value={newfilter} onChange={handleFilterpersons} />
    </div>
  )
}

export default Filter

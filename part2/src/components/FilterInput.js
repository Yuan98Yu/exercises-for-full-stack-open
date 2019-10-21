import React from 'react'

const FilterInput = ({filter, changeFilter}) => {
  return (
  <>
    filter shown with<input value={filter} onChange={changeFilter} /> 
  </>
  )
}

export default FilterInput
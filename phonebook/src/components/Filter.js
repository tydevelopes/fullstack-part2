import React from 'react';

const Filter = props => {
  return (
    <div>
        filter shown with{' '}
        <input onChange={props.handleSearchTermChange} value={props.searchTerm} />
      </div>
  )
}

export default Filter;
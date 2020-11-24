import React from 'react'

const Search = ({ searchName, handleSearchChange }) => {
    return (
        <div>
            <h2>Search</h2>
            Filter names with <input value={searchName} onChange={handleSearchChange} />
        </div>
    )
}

export default Search
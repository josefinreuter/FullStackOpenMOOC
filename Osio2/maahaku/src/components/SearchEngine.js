import React from 'react';

const SearchEngine = ({text, handleFilter, filter}) => {

    return (
        <div>
            {text} <input
            value={filter}
            onChange={handleFilter}
        />
        </div>
    )

};


export default SearchEngine
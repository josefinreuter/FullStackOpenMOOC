import React from 'react';

const SearchEngine = (props) => {

    return (
        <input
            value={props.filter}
            onChange={props.handleFilter}
        />
    )

}


export default SearchEngine
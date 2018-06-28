import React from 'react';

const Countries = ({filteredCountries, choose}) => {

    return (
        <ul>
            {filteredCountries.map(country => <li className="countries" onClick={() => choose(country)}
                                                  key={country.name}> {country.name} </li>)}
        </ul>
    )
};

export default Countries
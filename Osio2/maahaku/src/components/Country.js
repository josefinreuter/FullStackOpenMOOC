import React from 'react';

const Country = ({country, capital, population}) => {
    const url = "https://restcountries.eu/data/" + country.alpha3Code.toLowerCase() + ".svg"
    return (


        <div>
            <h2>{country.name}</h2>
            {capital}: {country.capital}
            <br/>
            <br/>
            {population}: {country.population}
            <br/>
            <br/>
            <img src={url} alt="flag"/>
        </div>

    )

};


export default Country
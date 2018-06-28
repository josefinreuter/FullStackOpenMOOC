import React from 'react';
import Person from './Person';

const Persons = ({text, filteredNames}) => {

    return (
        <div>
            <h2>{text}</h2>
        <table>
            <tbody>
            {filteredNames.map(person => <Person key={person.id} person={person}/>)}
            </tbody>
        </table>
        </div>
    )
}

export default Persons

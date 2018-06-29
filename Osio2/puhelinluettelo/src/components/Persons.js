import React from 'react';
import Person from './Person';

const Persons = ({text, filteredNames, deletePerson}) => {

    return (
        <div>
            <h2>{text}</h2>
        <table>
            <tbody>
            {filteredNames.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
            </tbody>
        </table>
        </div>
    )
}

export default Persons

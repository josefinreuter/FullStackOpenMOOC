import React from 'react';

const AddPersonForm = (props) => {

    return (
        <form onSubmit={props.addPerson}>
            <table>
                <tbody>
                <tr>
                    <th>Lisää uusi</th>
                </tr>
                <tr>
                    <td>
                        Nimi:
                    </td>
                    <td>
                        <input
                            value={props.newName}
                            onChange={props.handleNameInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Numero:
                    </td>
                    <td>
                        <input
                            value={props.newNumber}
                            onChange={props.handleNumberInput}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <br/>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )

}


export default AddPersonForm
import React from 'react';

const AddPersonForm = ({text, name, number, addPerson, newName, handleNameInputChange, newNumber, handleNumberInputChange, add}) => {

    return (
        <div>
            <form onSubmit={addPerson}>
                <table>
                    <tbody>
                    <tr>
                        <th>{text}</th>
                    </tr>
                    <tr>
                        <td>
                            {name}
                        </td>
                        <td>
                            <input
                                value={newName}
                                onChange={handleNameInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {number}
                        </td>
                        <td>
                            <input
                                value={newNumber}
                                onChange={handleNumberInputChange}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <div>
                    <button type="submit">{add}</button>
                </div>
            </form>
        </div>
    )

}

export default AddPersonForm

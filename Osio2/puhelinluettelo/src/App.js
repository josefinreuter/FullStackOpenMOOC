import React, {Component} from 'react';
import Person from './components/Person';
import SearchEngine from './components/SearchEngine'
import AddPersonForm from "./components/AddPersonForm";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: props.persons,
            newName: '',
            newNumber: '',
            filter: '',
            filteredList: []
        }
    }

    handleNameInputChange = (event) => {
        this.setState({newName: event.target.value})
    };

    handleNumberInputChange = (event) => {
        this.setState({newNumber: event.target.value})
    };

    handleFilter = (event) => {
        const fullList = this.state.persons;
        const filter = event.target.value;
        const filteredList = [];
        for (let i = 0; i < fullList.length; i++) {
            if (fullList[i].name.toLowerCase().includes(filter.toLowerCase())) {
                filteredList.push(fullList[i])
            }

        }

        this.setState({
            filter: filter,
            filteredList: filteredList
        })

    };

    addPerson = (event) => {
        event.preventDefault();

        for (let i = 0; i < this.state.persons.length; i++) {

            if (this.state.newName === '' || this.state.newNumber === '') {
                alert("Nimi ja/tai numero puuttuu");
                return
            }

            if (this.state.persons[i].name === this.state.newName) {
                alert("Nimi löytyy jo luettelosta");
                this.setState({
                    newName: '',
                    newNumber: ''
                });
                return
            }


        }


        const newPerson = {
            id: this.state.persons.length + 1,
            name: this.state.newName,
            number: this.state.newNumber

        };

        const persons = this.state.persons.concat(newPerson);

        this.setState({
            persons,
            newName: '',
            newNumber: ''
        })


    };


    render() {

        const filteredNames =
            this.state.filter === '' ?
                this.state.persons.sort(function (a, b) {
                    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                }) :
                this.state.filteredList.sort(function (a, b) {
                    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                });


        return (
            <div>
                <h2>Puhelinluettelo</h2>

                <div>
                    Etsi nimellä <SearchEngine handleFilter={this.handleFilter} filter={this.state.filter}/>
                </div>
                <br/>

                <AddPersonForm addPerson={this.addPerson} newName={this.state.newName}
                               handleNameInput={this.handleNameInputChange}
                               newNumber={this.state.newNumber} handleNumberInput={this.handleNumberInputChange}
                />

                <h2>Luettelosta löytyvät nimet ja numerot</h2>
                <table>
                    <tbody>
                    {filteredNames.map(person => <Person key={person.id} person={person}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App;

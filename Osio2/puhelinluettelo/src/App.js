import React, {Component} from 'react';
import Persons from './components/Persons';
import SearchEngine from './components/SearchEngine'
import AddPersonForm from "./components/AddPersonForm";
import personService from './services/personService'
import Notification from "./components/Notification";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            filteredList: [],
            message: null
        }
    }

    componentDidMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({persons: response})
            })
            .catch(error => {
                alert("Puhelinluettelotietojen haku epäonnistui.");
            })

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

            if (this.state.persons[i].name.toLowerCase() === this.state.newName.toLowerCase()) {

                if (window.confirm(`${this.state.persons[i].name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                    const person = this.state.persons[i];
                    const changedPerson = {...person, number: this.state.newNumber};

                    personService
                        .update(person.id, changedPerson)
                        .then(changedPerson => {
                            const persons = this.state.persons.filter(p => p.id !== person.id);
                            this.setState({
                                persons: persons.concat(changedPerson),
                                newName: '',
                                newNumber: '',
                                message: `${this.state.persons[i].name} numeroa päivitettiin onnistuneesti.`
                            });
                            setTimeout(() => {
                                this.setState({message: null})
                            }, 5000)
                        }).catch(error => {
                        const newPersonObject = {
                            name: this.state.persons[i].name,
                            number: this.state.newNumber
                        };

                        personService
                            .create(newPersonObject)
                            .then(newPerson => {
                                const persons = this.state.persons.filter(p => p.id !== person.id);
                                this.setState({
                                    persons: persons.concat(newPerson),
                                    newName: '',
                                    newNumber: '',
                                    message: `${this.state.persons[i].name} numeroa päivitettiin onnistuneesti.`
                                });
                                setTimeout(() => {
                                    this.setState({message: null})
                                }, 5000)
                            })
                    });
                    return
                }
                return
            }

        }

        const newPersonObject = {
            name: this.state.newName,
            number: this.state.newNumber
        };

        personService
            .create(newPersonObject)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newName: '',
                    newNumber: '',
                    message: `${this.state.newName} lisätty luetteloon.`
                });
                setTimeout(() => {
                    this.setState({message: null})
                }, 5000)
            })
    };

    deletePerson = (person) => {
        const newPersons = this.state.persons.filter(p => p.id !== person.id)

        if (window.confirm(`Poistetaanko ${person.name}?`)) {
            personService
                .deletePerson(person.id)
                .then(response => {
                    this.setState({
                        persons: newPersons,
                        message: `${person.name} poistettu luettelosta.`
                    });
                    setTimeout(() => {
                        this.setState({message: null})
                    }, 5000)
                })
                .catch(error => {
                    this.setState({
                        persons: newPersons,
                        message: `${person.name} poistettu luettelosta.`
                    });
                    setTimeout(() => {
                        this.setState({message: null})
                    }, 5000)

                })
        }

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
                <SearchEngine
                    text="Etsi nimellä"
                    handleFilter={this.handleFilter}
                    filter={this.state.filter}
                />
                <br/>
                <AddPersonForm
                    text="Lisää uusi / muuta olemassaolevan numeroa"
                    name="Nimi"
                    number="Numero"
                    addPerson={this.addPerson}
                    newName={this.state.newName}
                    handleNameInputChange={this.handleNameInputChange}
                    newNumber={this.state.newNumber}
                    handleNumberInputChange={this.handleNumberInputChange}
                    add="Lisää"
                />
                <br/>
                <Notification message={this.state.message}/>
                <Persons
                    text="Luettelosta löytyvät nimet ja numerot"
                    filteredNames={filteredNames}
                    deletePerson={this.deletePerson}
                />
            </div>
        )
    }
}

export default App;

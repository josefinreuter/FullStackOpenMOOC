import React, {Component} from 'react';
import axios from 'axios';
import './index.css';
import SearchEngine from './components/SearchEngine'
import Country from "./components/Country";
import Countries from "./components/Countries";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            country: [],
            filter: '',
            filteredList: [],
            chosen: false
        }
    }

    componentDidMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({countries: response.data})
            })
    }

    handleFilter = (event) => {
        const fullList = this.state.countries;
        const filter = event.target.value;
        const filteredList = [];

        for (let i = 0; i < fullList.length; i++) {
            if (fullList[i].name.toLowerCase().includes(filter.toLowerCase())) {
                filteredList.push(fullList[i])
            }
        }

        this.setState({
            filter: filter,
            filteredList: filteredList,
            chosen: false,
            country: []
        })

    };


    choose = (country) => {
        this.setState({
            chosen: true,
            country: country
        })

    }

    checkAmount = (filteredCountries) => {
        if (filteredCountries.length === 250 || filteredCountries.length === 0) {
            return (
                <div>
                    Start by typing.
                </div>
            )
        } else if (filteredCountries.length <= 9 && filteredCountries.length > 1) {
            return (
                <Countries
                    filteredCountries={filteredCountries}
                    choose={this.choose}
                />
            )
        } else if (filteredCountries.length === 1) {
            return (
                <Country
                    country={filteredCountries[0]}
                    capital="Capital"
                    population="Population"
                />
            )
        }
        return (
            <div>
                Too many matches, please specify.
            </div>
        )
    };


    render() {
        const filteredCountries =
            this.state.filter === '' ?
                this.state.countries :
                this.state.filteredList

        const oneChosen =
            this.state.chosen ?
                <Country
                    country={this.state.country}
                    capital="Capital"
                    population="Population"
                /> :
                this.checkAmount(filteredCountries);

        return (
            <div>
                <h1>Find Countries</h1>
                <SearchEngine
                    text="Search country by name"
                    handleFilter={this.handleFilter}
                    filter={this.state.filter}
                />
                <br/>
                {oneChosen}
            </div>
        );
    }
}

export default App;

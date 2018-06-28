import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Josefin Reuter',
        number: '040-123456'
    },
    {
        id: 3,
        name: 'Arto Järvinen',
        number: '040-123456'
    },
    {
        id: 4,
        name: 'Lea Kutvonen',
        number: '040-123456'
    },
    {
        id: 5,
        name: 'Martti Tienari',
        number: '040-123456'
    },
    {
        id: 6,
        name: 'Anna Jokinen',
        number: '040-123456'
    },
    {
        id: 7,
        name: 'Matti Herranen',
        number: '040-123456'
    }

]

ReactDOM.render(<App persons={persons}/>, document.getElementById('root'));


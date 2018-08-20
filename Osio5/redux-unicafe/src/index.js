import React from 'react'
import ReactDOM from 'react-dom'
import feedbackReducer from './feedbackReducer'
import {createStore} from "redux";


const store = createStore(feedbackReducer)

const Statistiikka = ({click}) => {


    if (store.getState().feedback === 0) {
        return (
            <div>
                <h2>stataistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                <tr>
                    <td>hyvä</td>
                    <td>{store.getState().good}</td>
                </tr>
                <tr>
                    <td>neutraali</td>
                    <td>{store.getState().ok}</td>
                </tr>
                <tr>
                    <td>huono</td>
                    <td>{store.getState().bad}</td>
                </tr>
                <tr>
                    <td>keskiarvo</td>
                    <td>{store.getState().average}</td>
                </tr>
                <tr>
                    <td>positiivisia</td>
                    <td>{store.getState().positive} %</td>
                </tr>
                </tbody>
            </table>

            <button onClick={click('ZERO')}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {
    click = (type) => () => {
        store.dispatch({type: type})

    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.click('GOOD')}>hyvä</button>
                <button onClick={this.click('OK')}>neutraali</button>
                <button onClick={this.click('BAD')}>huono</button>
                <Statistiikka click={this.click}/>
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)


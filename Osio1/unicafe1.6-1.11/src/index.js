import React from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({arvot}) => {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>Hyvä:</td>
                    <td><Statistic arvo={arvot.hyva}/></td>
                </tr>
                <tr>
                    <td>Neutraali:</td>
                    <td><Statistic arvo={arvot.neutraali}/></td>
                </tr>
                <tr>
                    <td>Huono:</td>
                    <td><Statistic arvo={arvot.huono}/></td>
                </tr>
                <tr>
                    <td>Keskiarvo:</td>
                    <td><Statistic arvo={arvot.keskiarvo}/></td>
                </tr>
                <tr>
                    <td>Positiivisia:</td>
                    <td><Statistic arvo={arvot.positiivisia + "%"}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({arvo}) => {
    return (
        <div>
            {arvo}
        </div>
    )
}


const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


class App extends React.Component {
    constructor() {

        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            keskiarvo: 0,
            positiivisia: 0,
            yhteensa: 0
        }


    }

    laske = (hyva, neutraali, huono, yhteensa) => {
        const keskiarvo = (((hyva * 1) + (neutraali * 0) + (huono * -1)) / yhteensa).toFixed(1)
        const positiivisia = (hyva * 100 / yhteensa).toFixed(1)

        return () => {
            this.setState({
                hyva: hyva,
                neutraali: neutraali,
                huono: huono,
                yhteensa: yhteensa,
                keskiarvo: keskiarvo,
                positiivisia: positiivisia

            })
        }
    }

    render() {
        const hyva = this.state.hyva
        const neutraali = this.state.neutraali
        const huono = this.state.huono
        const yhteensa = this.state.yhteensa
        const arvot = this.state

        const statistiikka = () => {
            if (yhteensa === 0) {
                return (
                    <p>Palautetta ei ole vielä annettu</p>
                )
            }
            return (
                <Statistics arvot={arvot}/>
            )
        }

        return (
            <div>
                <h1>Anna Palautetta</h1>

                <Button
                    handleClick={this.laske(hyva + 1, neutraali, huono, yhteensa + 1)}
                    text="Hyvä"
                />
                <Button
                    handleClick={this.laske(hyva, neutraali + 1, huono, yhteensa + 1)}
                    text="Neutraal"
                />
                <Button
                    handleClick={this.laske(hyva, neutraali, huono + 1, yhteensa + 1)}
                    text="Huono"
                />

                <h1>Statistiikka</h1>
                <div>{statistiikka()}</div>
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));


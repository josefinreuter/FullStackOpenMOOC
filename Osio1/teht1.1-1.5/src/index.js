import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    const nimi = props.kurssi.nimi

    return (
        <div>
            <h1>{nimi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    const osa1 = props.kurssi.osat[0]
    const osa2 = props.kurssi.osat[1]
    const osa3 = props.kurssi.osat[2]

    return (
        <div>
            <Osa osa={osa1}/>
            <Osa osa={osa2}/>
            <Osa osa={osa3}/>
        </div>
    )
}
const Osa = (props) => {
    const nimi = props.osa.nimi
    const tehtavia = props.osa.tehtavia

    return (
        <div>
            <p>{nimi} {tehtavia}</p>
        </div>
    )
}

const Yhteensa = (props) => {
    const tehtavia1 = props.kurssi.osat[0].tehtavia
    const tehtavia2 = props.kurssi.osat[1].tehtavia
    const tehtavia3 = props.kurssi.osat[2].tehtavia

    return (
        <div>
            <p>Yhteensä {tehtavia1 + tehtavia2 + tehtavia3} tehtävää.</p>
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }


    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto kurssi={kurssi}/>
            <Yhteensa kurssi={kurssi}/>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)

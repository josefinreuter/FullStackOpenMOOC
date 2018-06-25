import React from 'react';

const Yhteensa = ({kurssi}) => {
    const tehtavia = kurssi.osat.map(osa => osa.tehtavia)
    const reducer = (laskuri, nykyinenArvo) => laskuri + nykyinenArvo;

    return (
        <p>Kurssi sisältää yhteensä {tehtavia.reduce(reducer)} tehtävää</p>
    )
}

export default Yhteensa
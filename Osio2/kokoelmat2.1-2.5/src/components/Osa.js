import React from 'react';
import './Style.css';

const Osa = ({osa}) => <p>Osio {osa.id}: {osa.nimi} <br/>
    <span className="Tehtavia">Sisältää {osa.tehtavia} tehtävää</span></p>

export default Osa
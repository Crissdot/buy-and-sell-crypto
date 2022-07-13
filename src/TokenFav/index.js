import React from 'react';
import './TokenFav.css';

function TokenFav(props) {
    return (
        <section className='fav-tokens'>
            <h2 className='fav-tokens__title'>Tus Tokens Favoritos</h2>
            <p className='fav-tokens__info'>Algunos de los beneficios que obtienes al agregar un token a favoritos son:</p>
            <ul className='fav-tokens__benefits'>
                <li className='fav-tokens-benefits__text'><p>El precio se actualiza cada 30 segundos (en desarrollo)</p></li>
                <li className='fav-tokens-benefits__text'><p>Obtienes un promedio de las últimas cinco lecturas (en desarrollo)</p></li>
            </ul>
        </section>
    );
}

export { TokenFav };

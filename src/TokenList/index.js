import React from 'react';
import './TokenList.css';

function TokenList(props) {
    const back = () => {
        props.setOpenModal(false);
    };

    return (
        <section className='token-list'>
            <h2 className='token-list__title'>Lista de Tokens</h2>
            <article className='token-list__items'>
                {props.tokens.records.map(token => (
                    <div className='token-item' key={token.symbol}>
                        <p className='token-item__name'>
                            <span className='token-item__symbol'>{token.symbol}: </span>
                            {token.name}
                        </p>
                    </div>
                ))}
            </article>
            <button className='token-list__button' type='button' onClick={back}>Volver</button>
        </section>
    );
}

export { TokenList };

import React from 'react';
import './TokenList.css';

function TokenList(props) {
    const back = () => {
        props.setOpenModal(false);
    };

    const tokenSelected = (token) => {
        props.setselectedToken(token);
        props.setOpenModal(false);
    }

    return (
        <section className='token-list'>
            <h2 className='token-list__title'>Lista de Tokens</h2>
            <article className='token-list__items'>
                {props.loading && props.onLoading()}
                {props.error && props.onError()}

                {!props.loading && !props.error && props.tokens.records?.map((token, index) => (
                    <div className='token-item' key={index}>
                        <p className='token-item__name'>
                            <span className='token-item__symbol'>{token.symbol}: </span>
                            {token.name}
                        </p>
                        <button className='token-item__button' type='button' onClick={() => tokenSelected(token)}>
                            <svg className="w-6 h-6" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                ))}
            </article>
            <button className='token-list__button' type='button' onClick={back}>Volver</button>
        </section>
    );
}

export { TokenList };

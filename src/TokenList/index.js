import React from 'react';
import './TokenList.css';

function TokenList(props) {
    const back = () => {
        props.setOpenModal(false);
    };

    const tokenSelected = (token) => {
        props.fetchTokenDetail(token);
        props.setOpenModal(false);
    }

    return (
        <section className='token-list'>
            <h2 className='token-list__title'>Lista de Tokens</h2>
            <ul className='token-list__items'>
                {props.loading && props.onLoading()}
                {props.error && props.onError()}

                {!props.loading && !props.error && props.tokens.records?.map((token, index) => (
                    <li key={index}>
                        <button className='token-item' type='button' onClick={tokenSelected}>
                            <strong className='token-item__symbol'>{token.symbol}</strong>
                            <p className='token-item__name'>{token.name}</p>
                        </button>
                    </li>
                ))}
            </ul>
            <button className='token-list__close' type='button' onClick={back}>
                <svg className="w-6 h-6" fill="var(--primary-color)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
        </section>
    );
}

export { TokenList };

import React from 'react';
import './TokenSelect.css'

function TokenSelect(props) {
    const selectToken = () => {
        props.setOpenModal(true);
        props.fetchTokens();
    }

    return (
        <section className='token-select'>
            <h2 className='token-select__title'>Selecciona un token crypto</h2>
            <button className='token-select__button' type='button' onClick={selectToken}>
                {props.selectedTokenSymbol}
                <svg className="w-6 h-6" fill="var(--primary-color)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
        </section>
    );
}

export { TokenSelect };

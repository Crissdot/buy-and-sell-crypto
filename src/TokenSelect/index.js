import React from 'react';
import './TokenSelect.css'

function TokenSelect(props) {
    const selectToken = () => {
        props.setOpenModal(true);
    }

    return (
        <section className='token-select'>
            <h2 className='token-select__title'>Selecciona un token crypto</h2>
            <button className='token-select__button' type='button' onClick={selectToken}>{props.selectedToken.symbol}</button>
        </section>
    );
}

export { TokenSelect };

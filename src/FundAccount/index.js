import React from 'react';
import './FundAccount.css';

function FundAccount(props) {
    const [ creditCardNumber, setCreditCardNumber ] = React.useState('');
    const [ creditCardDate, setCreditCardDate ] = React.useState('');
    const [ creditCardCCV, setCreditCardCCV ] = React.useState('');

    const back = () => {
        props.setOpenModal(false);
        props.setOpenFundAccount(false);
    };

    const onCreditCardNumberChange = (event) => {
        const ccnum = event.target.value;
        setCreditCardNumber(ccnum);
    }

    const onCreditCardDateChange = (event) => {
        const ccdate = event.target.value;
        setCreditCardDate(ccdate);
    }

    const onCreditCardCCVChange = (event) => {
        const ccv = event.target.value;
        setCreditCardCCV(ccv);
    }

    return (
        <section className='fund-account'>
            <h2 className='fund-account__title'>Ingresa una tarjeta de crédito</h2>
            <form>
                <label>
                    Número tarjeta de crédito
                    <input type="text" value={creditCardNumber} onChange={onCreditCardNumberChange} />
                </label>
                <label>
                    Fecha de vencimiento
                    <input type="text" value={creditCardDate} onChange={onCreditCardDateChange} />
                </label>
                <label>
                    CCV
                    <input type="text" value={creditCardCCV} onChange={onCreditCardCCVChange} />
                </label>
            </form>
            <button className='fund-account__close' type='button' onClick={back}>
                <svg className="w-6 h-6" fill="var(--primary-color)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
        </section>
    );
}

export { FundAccount };

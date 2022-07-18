import React from 'react';
import './FundAccount.css';

function FundAccount(props) {
    const [ creditCardNumber, setCreditCardNumber ] = React.useState('');
    const [ creditCardNumberError, setCreditCardNumberError ] = React.useState('Debe llenar este campo');
    const [ creditCardDate, setCreditCardDate ] = React.useState('');
    const [ creditCardDateError, setCreditCardDateError ] = React.useState('Debe llenar este campo');
    const [ creditCardCCV, setCreditCardCCV ] = React.useState('');
    const [ creditCardCCVError, setCreditCardCCVError ] = React.useState('Debe llenar este campo');
    const [ amount, setAmount ] = React.useState('');
    const [ amountError, setAmountError ] = React.useState('Debe llenar este campo');

    const back = () => {
        props.setOpenModal(false);
        props.setOpenFundAccount(false);
    };

    const addSeparator = (event, text, distance, separator, setFunction) => {
        const mult = parseInt(text.length / distance);
        const newDistance = distance*mult+mult-1;
        if(event.nativeEvent.inputType === "insertText" ){
            if(text.length === newDistance) {
                setFunction(text + separator);
            } else if(text.length === newDistance+1) {
                setFunction(text.substr(0, newDistance) + separator + text.substr(newDistance));
            }
        } else if(event.nativeEvent.inputType === "deleteContentBackward" && text.length === newDistance+1) {
            setFunction(text.substr(0, newDistance));
        }
    }

    const onCreditCardNumberChange = (event) => {
        const ccnum = event.target.value;
        const myRe = /^\d{0,4}-?\d{0,4}-?\d{0,4}-?\d{0,4}$/g;
        const isValid = myRe.exec(ccnum);
        if(ccnum.length <= 19 && isValid) {
            setCreditCardNumber(ccnum);
            addSeparator(event, ccnum, 4, '-', setCreditCardNumber);
            if(ccnum.length === 19) {
                setCreditCardNumber(ccnum.substr(0, 19));

                const isCreditCard = parseInt(ccnum.substr(0, 4));
                if(isCreditCard >= 4200) {
                    setCreditCardNumberError(null);
                } else {
                    setCreditCardNumberError('Tarjetas de débito no son válidas');
                }
            } else {
                setCreditCardNumberError('Debe llenar este campo');
            }
        }
    }

    const onCreditCardDateChange = (event) => {
        const ccdate = event.target.value;
        const myRe = /^\d{0,2}\/?\d{0,2}$/g;
        const isValid = myRe.exec(ccdate);
        if(ccdate.length <= 5 && isValid) {
            setCreditCardDate(ccdate);
            addSeparator(event, ccdate, 2, '/', setCreditCardDate);
            if (ccdate.length === 5) {
                setCreditCardDate(ccdate.substr(0, 5));

                const month = ccdate.substr(0, 2);
                const year = '20' + ccdate.substr(3);
                const expDate = new Date(year + '/' + month);

                if(expDate.toString() !== 'Invalid Date') {
                    const today = new Date();
                    if(expDate > today) {
                        setCreditCardDateError(null);
                    } else {
                        setCreditCardDateError('Su tarjeta ya ha expirado');
                    }
                } else {
                    setCreditCardDateError('Debe ingresar una fecha válida');
                }
            } else {
                setCreditCardDateError('Debe llenar este campo');
            }
        }
    }

    const onCreditCardCCVChange = (event) => {
        const ccv = event.target.value;
        const myRe = /^\d*$/g;
        const isValid = myRe.exec(ccv);
        if(ccv.length <= 3 && isValid) {
            setCreditCardCCV(ccv);
            if (ccv.length === 3) {
                setCreditCardCCVError(null);
            } else {
                setCreditCardCCVError('Debe llenar este campo');
            }
        }
    }

    const onAmounthange = (event) => {
        const usd = event.target.value;
        const myRe = /^\d*$/g;
        const isValid = myRe.exec(usd);
        if(isValid) {
            setAmount(usd);
            if (usd >= 1) {
                setAmountError(null);
            } else {
                setAmountError('Debe ingresar almenos 1 dólar');
            }
        } else {
            setAmountError('Solo puede ingresar números enteros');
        }
        if(usd.length === 0) setAmountError('Debe llenar este campo');
    }

    const onSubmit = (event) => {
        event.preventDefault();
        back();
    };

    return (
        <section className='fund-account'>
            <h2 className='fund-account__title'>Ingresa una tarjeta de crédito</h2>
            <form className='fund-account__form' onSubmit={onSubmit}>
                <label className='fund-account-form__number'>
                    Número tarjeta de crédito:
                    {creditCardNumberError &&
                        <span className='input--error'>*{creditCardNumberError}</span>
                    }
                    <input 
                        type="text"
                        className={`${!creditCardNumberError ? "valid" : ""}`}
                        value={creditCardNumber}
                        onChange={onCreditCardNumberChange}
                        placeholder="4200-XXXX-XXXX-XXXX"
                    />
                </label>
                <label className='fund-account-form__date'>
                    Fecha de vencimiento:
                    {creditCardDateError &&
                        <span className='input--error'>*{creditCardDateError}</span>
                    }
                    <input
                        type="text"
                        className={`${!creditCardDateError ? "valid" : ""}`}
                        value={creditCardDate}
                        onChange={onCreditCardDateChange}
                        placeholder="12/22"
                    />
                </label>
                <label className='fund-account-form__ccv'>
                    CCV:
                    {creditCardCCVError &&
                        <span className='input--error'>*{creditCardCCVError}</span>
                    }
                    <input 
                        type="text" 
                        className={`${!creditCardCCVError ? "valid" : ""}`} 
                        value={creditCardCCV} 
                        onChange={onCreditCardCCVChange}
                        placeholder="123"
                    />
                </label>
                <label className={`fund-account-form__usd${(creditCardNumberError || creditCardDateError || creditCardCCVError) ? "--disabled" : ""}`}>
                    Ingrese el monto en $USD:
                    {amountError &&
                        <span className='input--error'>*{amountError}</span>
                    }
                    <input 
                        type="text" 
                        className={`${!amountError ? "valid" : ""}`} 
                        value={amount} 
                        onChange={onAmounthange}
                        placeholder="$1000000"
                        disabled={creditCardNumberError || creditCardDateError || creditCardCCVError}
                    />
                </label>
                <button className="fund-account-form__submit" type="submit" disabled={creditCardNumberError || creditCardDateError || creditCardCCVError || amountError}>
                    Fondear
                </button>
            </form>
            <button className='fund-account__close' type='button' onClick={back}>
                <svg className="w-6 h-6" fill="var(--primary-color)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
        </section>
    );
}

export { FundAccount };

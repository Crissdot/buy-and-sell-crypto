import React from 'react';
const API_URL = 'http://127.0.0.1:8000/swap/v1';

function useTokens() {
    const [ openModal, setOpenModal ] = React.useState(true);
    const [ tokens, setTokens ] = React.useState([]);
    const [ selectedToken, setselectedToken ] = React.useState({symbol: '---'});

    const fetchTokens = async () => {
        const url = API_URL + '/tokens';
        try {
            const tokensResponse = await fetch(url);
            const tokensJSON = await tokensResponse.json();
            
            setTokens(tokensJSON);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        openModal,
        setOpenModal,
        tokens,
        fetchTokens,
        selectedToken,
        setselectedToken,
    };
}

export { useTokens };

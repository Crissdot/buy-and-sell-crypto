import React from 'react';
const API_URL = 'http://127.0.0.1:8000/swap/v1';

function useTokens() {
    const [ openModal, setOpenModal ] = React.useState(false);
    const [ tokens, setTokens ] = React.useState([]);
    const [ selectedToken, setselectedToken ] = React.useState({symbol: '---'});
    const [ loading, setLoading ] = React.useState(true);
    const [ error, setError ] = React.useState(false);

    const fetchTokens = async () => {
        const url = API_URL + '/tokens';
        try {
            setLoading(true);
            const tokensResponse = await fetch(url);
            const tokensJSON = await tokensResponse.json();
            
            setTokens(tokensJSON);
            setError(false);
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const fetchTokenDetail = async (token) => {
        const url = API_URL + `/price?sellToken=${token.symbol}&buyToken=DAI&sellAmount=1000000000000000000`;
        try {
            const tokenDetailResponse = await fetch(url);
            const tokenDetailJSON = await tokenDetailResponse.json();
            const tokenDetail = {...token, ...tokenDetailJSON}
            console.log(tokenDetail);
            setselectedToken(tokenDetail);
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
        fetchTokenDetail,
        loading,
        error,
    };
}

export { useTokens };

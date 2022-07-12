import React from 'react';
const API_URL = 'http://127.0.0.1:8000/swap/v1';

function useTokens() {
    const [ openModal, setOpenModal ] = React.useState(false);
    const [ tokens, setTokens ] = React.useState([]);
    const [ selectedToken, setselectedToken ] = React.useState({symbol: '---'});
    const [ favoriteTokens, setFavoriteTokens ] = React.useState([]);
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
            const tokenDetail = {...token};
            if(tokenDetailJSON.code === 100) tokenDetail.error = {...tokenDetailJSON};
            else tokenDetail.details = {...tokenDetailJSON};

            setselectedToken(tokenDetail);
        } catch (error) {
            console.error(error);
        }
    }

    const addTokenToFavorites = (tokenDetail) => {
        return new Promise((res, rej) => {
            if(favoriteTokens.length === 3) return rej('Ya has alcanzado el máximo de favoritos');

            if(isTokenAlreadyAddedToFavs(tokenDetail.symbol)) return rej('Ya has añadido este token a favoritos');

            setFavoriteTokens(prevFavoriteTokens => [...prevFavoriteTokens, tokenDetail]);
            return res('Token añadido a favoritos correctamente');
        });
    }

    const removeTokenFromFavorites = (tokenDetailSymbol) => {
        return new Promise((res, rej) => {
            if(!isTokenAlreadyAddedToFavs(tokenDetailSymbol)) return rej('No puedes eliminar un token que no has añadido aún');

            setFavoriteTokens(prevFavoriteTokens => prevFavoriteTokens.filter(favToken => favToken.symbol !== tokenDetailSymbol));
            return res('Token eliminado de favoritos correctamente');
        });
    }

    const isTokenAlreadyAddedToFavs = (tokenDetailSymbol) => {
        return favoriteTokens.some(favToken => {
            return favToken.symbol === tokenDetailSymbol;
        });
    }

    return {
        openModal,
        setOpenModal,
        tokens,
        fetchTokens,
        selectedToken,
        fetchTokenDetail,
        addTokenToFavorites,
        removeTokenFromFavorites,
        isTokenAlreadyAddedToFavs,
        loading,
        error,
    };
}

export { useTokens };

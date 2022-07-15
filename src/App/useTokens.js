import React from 'react';
import { useLocalStorage } from './useLocalStorage';
const API_URL = 'https://api.0x.org/swap/v1';

function useTokens() {
    const [ openModal, setOpenModal ] = React.useState(false);
    const [ tokens, setTokens ] = React.useState([]);
    const [ selectedToken, setselectedToken ] = React.useState({symbol: '---'});
    const [ loading, setLoading ] = React.useState(true);
    const [ error, setError ] = React.useState(false);
    const { item: favTokens, saveItem: saveFavToken } = useLocalStorage('FAV_TOKENS_V1', []);

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
        const sellToken = token.symbol === 'BUSD' ? 'DAI' : 'BUSD';
        const url = API_URL + `/quote?buyToken=${token.symbol}&sellToken=${sellToken}&sellAmount=100000000000000000`;
        try {
            const tokenDetailResponse = await fetch(url);
            const tokenDetailJSON = await tokenDetailResponse.json();
            const tokenDetail = {...token};
            if(tokenDetailJSON.code === 100) tokenDetail.error = {...tokenDetailJSON};
            else {
                tokenDetail.details = {...tokenDetailJSON};
                tokenDetail.details.price = (1 / tokenDetail.details.price).toString();
            }

            setselectedToken(tokenDetail);
        } catch (error) {
            console.error(error);
        }
    }

    const addTokenToFavorites = (tokenDetail) => {
        return new Promise((res, rej) => {
            if(favTokens.length === 3) return rej('Ya has alcanzado el máximo de favoritos');

            if(isTokenAlreadyAddedToFavs(tokenDetail.symbol)) return rej('Ya has añadido este token a favoritos');

            const newFavTokens = [...favTokens, tokenDetail];
            saveFavToken(newFavTokens);
            return res('Token añadido a favoritos correctamente');
        });
    }

    const removeTokenFromFavorites = (tokenDetailSymbol) => {
        return new Promise((res, rej) => {
            if(!isTokenAlreadyAddedToFavs(tokenDetailSymbol)) return rej('No puedes eliminar un token que no has añadido aún');

            const newFavTokens = favTokens.filter(favToken => favToken.symbol !== tokenDetailSymbol);
            saveFavToken(newFavTokens);
            return res('Token eliminado de favoritos correctamente');
        });
    }

    const isTokenAlreadyAddedToFavs = (tokenDetailSymbol) => {
        return favTokens.some(favToken => {
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
        favTokens,
        loading,
        error,
    };
}

export { useTokens };

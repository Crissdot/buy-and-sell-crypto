import React from 'react';
import { useLocalStorage } from './useLocalStorage';
const API_URL = 'https://api.0x.org/swap/v1';

function useTokens() {
    const [ openModal, setOpenModal ] = React.useState(false);
    const [ tokens, setTokens ] = React.useState([]);
    const [ selectedToken, setselectedToken ] = React.useState({symbol: '---'});
    const [ loading, setLoading ] = React.useState(true);
    const [ error, setError ] = React.useState(false);
    const { item: favTokens, saveItem: saveFavToken, getItem: getFavTokens } = useLocalStorage('FAV_TOKENS_V2', []);
    const { item: priceFavTokens, saveItem: savePriceFavToken, getItem: getPriceFavTokens } = useLocalStorage('PRICES_FAV_TOKENS_V2', {});

    React.useEffect(() => {
        savePriceFavToken({});

        const lSFavTokens = getFavTokens();
        const tokenIntervals = lSFavTokens.map((token) => {
            fetchTokenDetail(token, true);
            const tokenInterval = _updateFavToken(token);
            return tokenInterval;
        });

        return () => {
            tokenIntervals.forEach(tokenInterval => {
                clearInterval(tokenInterval);
            });
        }
    }, []);

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

    const fetchTokenDetail = async (token, isFav = false) => {
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

            if(isFav) _updateOnlyPriceFavToken(tokenDetail);
            else setselectedToken(tokenDetail);
        } catch (error) {
            console.error(error);
        }
    }

    const _updateOnlyPriceFavToken = (tokenDetail) => {
        const lSPriceFavTokens = getPriceFavTokens();
        const newPrices = {...lSPriceFavTokens};
        if(!lSPriceFavTokens[tokenDetail.symbol]) {
            newPrices[tokenDetail.symbol] = {prices: []};
        } 
        let pricesLength = newPrices[tokenDetail.symbol].prices.length;
        if(pricesLength === 5) {
            newPrices[tokenDetail.symbol].prices = newPrices[tokenDetail.symbol].prices.splice(1);
            pricesLength--;
        }
        newPrices[tokenDetail.symbol].prices.push(tokenDetail.details.price);

        const average = newPrices[tokenDetail.symbol].prices.reduce((price, sum) => parseFloat(sum) + parseFloat(price), 0) / (pricesLength+1);
        newPrices[tokenDetail.symbol].average = average.toString();

        savePriceFavToken(newPrices);
    }

    const _updateFavToken = (tokenDetail) => {
        _updateOnlyPriceFavToken(tokenDetail);
        tokenDetail.interval = setInterval(() => {
            console.log('Getting price of', tokenDetail.symbol);
            fetchTokenDetail(tokenDetail, true);
        }, 30000);
        return tokenDetail.interval;
    }

    const addTokenToFavorites = (tokenDetail) => {
        return new Promise((res, rej) => {
            if(favTokens.length === 3) return rej('Ya has alcanzado el máximo de favoritos');

            if(isTokenAlreadyAddedToFavs(tokenDetail.symbol)) return rej('Ya has añadido este token a favoritos');

            const favTokenInterval = _updateFavToken(tokenDetail);
            tokenDetail.interval = favTokenInterval;

            const newFavTokens = [...favTokens, tokenDetail];
            saveFavToken(newFavTokens);

            return res('Token añadido a favoritos correctamente');
        });
    }

    const removeTokenFromFavorites = (tokenDetail) => {
        return new Promise((res, rej) => {
            if(!isTokenAlreadyAddedToFavs(tokenDetail.symbol)) return rej('No puedes eliminar un token que no has añadido aún');

            const lSFavTokens = getFavTokens();
            const tokenInterval = lSFavTokens.find(token => token.symbol === tokenDetail.symbol);
            clearInterval(tokenInterval.interval);

            const newFavTokens = favTokens.filter(favToken => favToken.symbol !== tokenDetail.symbol);
            saveFavToken(newFavTokens);

            const lSPriceFavTokens = getPriceFavTokens();
            delete lSPriceFavTokens[tokenDetail.symbol];
            savePriceFavToken(lSPriceFavTokens);

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
        priceFavTokens,
        loading,
        error,
    };
}

export { useTokens };

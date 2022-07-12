import React from 'react';
import './TokenItemDetail.css';

function TokenItemDetail(props) {
    const [ addedToFavs, setAddedToFavs ] = React.useState(false);

    React.useEffect(() => {
        setAddedToFavs(props.isTokenAlreadyAddedToFavs(props.selectedToken.symbol));
    }, [props.selectedToken]);

    const toggleFav = async (tokenDetail) => {
        if(!addedToFavs) {
            try {
                setAddedToFavs(true);
                await props.addTokenToFavorites(tokenDetail);
            } catch(error) {
                console.error(error);
                setAddedToFavs(false);
            }
        } else {
            try {
                setAddedToFavs(false);
                await props.removeTokenFromFavorites(tokenDetail.symbol);
            } catch(error) {
                console.error(error);
                setAddedToFavs(true);
            }
        }
    }

    return (
        <article className="token-item-detail">
            <h3 className="token-item-detail__symbol">{props.selectedToken.symbol}</h3>
            <p className="token-item-detail__name">{props.selectedToken.name}</p>
            <span className="token-item-detail__price">
                {props.selectedToken.error 
                    ? props.selectedToken.error.validationErrors[0].reason.toLowerCase().replaceAll('_', ' ')
                    : `$${props.selectedToken.details.price.slice(0, 10)}`
                }
                </span>
            <button className="token-item-detail__fav" type="button" disabled={props.selectedToken.error} onClick={() => toggleFav(props.selectedToken)}>
                <svg className="w-6 h-6" fill={addedToFavs ? "var(--red-color)" : "transparent"} stroke="var(--red-color)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>
        </article>
    );
}

export { TokenItemDetail };

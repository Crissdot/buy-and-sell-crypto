import React from 'react';
import { useTokens } from './useTokens';
import { TokenSelect } from '../TokenSelect';
import { TokenItemDetail } from '../TokenItemDetail';
import { TokenList } from '../TokenList';
import { Modal } from '../Modal';

function App() {
  const {
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
  } = useTokens();

  return (
    <React.Fragment>
      <main>
        <TokenSelect 
          setOpenModal={setOpenModal} 
          selectedTokenSymbol={selectedToken.symbol} 
          fetchTokens={fetchTokens}
        />
        {!selectedToken.symbol.includes('---') && (
          <TokenItemDetail 
            selectedToken={selectedToken} 
            addTokenToFavorites={addTokenToFavorites}
            removeTokenFromFavorites={removeTokenFromFavorites}
            isTokenAlreadyAddedToFavs={isTokenAlreadyAddedToFavs}
          />
        )}
      </main>
      {openModal && (
        <Modal>
          <TokenList 
            setOpenModal={setOpenModal}
            tokens={tokens}
            fetchTokenDetail={fetchTokenDetail}
            loading={loading}
            error={error}
            onLoading={() => <p>Estamos cargando, por favor espere</p>}
            onError={() => <p>No pudimos cargar, ocurrió un error</p>}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { App };

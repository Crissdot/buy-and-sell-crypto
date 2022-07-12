import React from 'react';
import { useTokens } from './useTokens';
import { useToast } from './useToast';
import { TokenSelect } from '../TokenSelect';
import { TokenItemDetail } from '../TokenItemDetail';
import { TokenList } from '../TokenList';
import { Modal } from '../Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const {
    createToast,
  } = useToast();

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
            createToast={createToast}
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
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </React.Fragment>
  );
}

export { App };

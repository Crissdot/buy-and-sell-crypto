import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTokens } from './useTokens';
import { useToast } from './useToast';
import { Header } from '../Header';
import { TokenSelect } from '../TokenSelect';
import { TokenItemDetail } from '../TokenItemDetail';
import { TokenList } from '../TokenList';
import { TokenFav } from '../TokenFav';
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
    favTokens,
    loading,
    error,
  } = useTokens();

  const {
    createToast,
  } = useToast();

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={
            <main>
              <TokenSelect 
                setOpenModal={setOpenModal} 
                selectedTokenSymbol={selectedToken.symbol} 
                fetchTokens={fetchTokens}
              />
              {!selectedToken.symbol.includes('---') && (
                <TokenItemDetail 
                  token={selectedToken} 
                  addTokenToFavorites={addTokenToFavorites}
                  removeTokenFromFavorites={removeTokenFromFavorites}
                  isTokenAlreadyAddedToFavs={isTokenAlreadyAddedToFavs}
                  createToast={createToast}
                />
              )}
            </main>
          } />
          <Route exact path="/favoritos" element={
            <main>
              <TokenFav />
              {favTokens.map((favToken, index) => (
                <TokenItemDetail 
                  key={index}
                  token={favToken} 
                  addTokenToFavorites={addTokenToFavorites}
                  removeTokenFromFavorites={removeTokenFromFavorites}
                  isTokenAlreadyAddedToFavs={isTokenAlreadyAddedToFavs}
                  createToast={createToast}
                  />
              ))}
            </main>
          } />
        </Routes>
      </BrowserRouter>
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

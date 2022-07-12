import React from 'react';
import { useTokens } from './useTokens';
import { TokenSelect } from '../TokenSelect';
import { TokenList } from '../TokenList';
import { Modal } from '../Modal';

function App() {
  const {
    openModal,
    setOpenModal,
    tokens,
    fetchTokens,
    selectedToken,
    setselectedToken,
    loading,
    error,
  } = useTokens();

  return (
    <React.Fragment>
      <main>
        <TokenSelect 
          setOpenModal={setOpenModal} 
          selectedToken={selectedToken} 
          fetchTokens={fetchTokens}
        />
      </main>
      {openModal && (
        <Modal>
          <TokenList 
            setOpenModal={setOpenModal}
            tokens={tokens}
            setselectedToken={setselectedToken}
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

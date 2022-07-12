import React from 'react';
import { useTokens } from './useTokens';
import { TokenSelect } from '../TokenSelect';
import { Modal } from '../Modal';

function App() {
  const {
    openModal,
    setOpenModal,
  } = useTokens();

  return (
    <React.Fragment>
      <main>
        <TokenSelect setOpenModal={setOpenModal}/>
      </main>
      {openModal && (
        <Modal>
          <h1>Hola Mundo</h1>
        </Modal>
      )}
    </React.Fragment>
  );
}

export { App };

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
  } = useTokens();

  return (
    <React.Fragment>
      <main>
        <TokenSelect setOpenModal={setOpenModal}/>
      </main>
      {openModal && (
        <Modal>
          <TokenList setOpenModal={setOpenModal} tokens={tokens}/>
        </Modal>
      )}
    </React.Fragment>
  );
}

export { App };

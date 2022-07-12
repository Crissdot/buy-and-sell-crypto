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
  } = useTokens();

  return (
    <React.Fragment>
      <main>
        <TokenSelect setOpenModal={setOpenModal} selectedToken={selectedToken} fetchTokens={fetchTokens}/>
      </main>
      {openModal && (
        <Modal>
          <TokenList setOpenModal={setOpenModal} tokens={tokens} setselectedToken={setselectedToken}/>
        </Modal>
      )}
    </React.Fragment>
  );
}

export { App };

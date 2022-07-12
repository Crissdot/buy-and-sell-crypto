import React from 'react';

function useTokens() {
    const [ openModal, setOpenModal ] = React.useState(false);

    return {
        openModal,
        setOpenModal,
    };
}

export { useTokens };

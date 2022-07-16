import React from 'react';

function useLocalStorage(lSName, lSInitialValue) {
    const [item, setItem] = React.useState(lSInitialValue);

    React.useLayoutEffect(() => {
        getItem();
    }, []);

    const getItem = () => {
        try {
            const lSItem = localStorage.getItem(lSName);
            let parsedItem;

            if (!lSItem) {
                localStorage.setItem(lSName, JSON.stringify(lSInitialValue));
                parsedItem = lSInitialValue;
            } else {
                parsedItem = JSON.parse(lSItem);
            }

            setItem(parsedItem);
            return parsedItem;
        } catch (error) {
            console.error(error);
        }
    }

    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(lSName, stringifiedItem);
            setItem(newItem);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        item,
        getItem,
        saveItem,
    };
}

export { useLocalStorage }

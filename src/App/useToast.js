import { toast } from 'react-toastify';

function useToast() {
    const toastConfig = {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const createToast = (text, type = null) => {
        if(!type) toast(text, toastConfig);
        toast[type](text, toastConfig);
    }

    return {
        createToast,
    }
}

export { useToast };

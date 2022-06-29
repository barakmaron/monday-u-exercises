import { useState } from "react";

export const useError = () => {
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    function setAnError(message){
        setError(true);
        setMessage(message);
        setTimeout(unsetError, 5000);
    }
    function unsetError()
    {
        setError(false);
        setMessage('');
    }
    return {setAnError, message, error};
};
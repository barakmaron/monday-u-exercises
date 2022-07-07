import { useState } from "react";

export const useSuccessful = () => {
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    function setASuccessful(message){
        setSuccessful(true);
        setMessage(message);
        setTimeout(unsetSuccessful, 5000);
    }
    function unsetSuccessful()
    {
        setSuccessful(false);
        setMessage('');
    }
    return {setASuccessful, message, successful};
};
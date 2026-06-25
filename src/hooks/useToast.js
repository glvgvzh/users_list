import { useState } from "react";

function useToast() {
    const [toast, setToast] = useState(null)

    function showToast(message, type) {
        setToast({ message, type })
        setTimeout(() => {
            setToast(null)
        }, 2000);
    }

    return {
        toast,
        showToast
    }
}

export default useToast
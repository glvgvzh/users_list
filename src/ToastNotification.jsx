import { Check } from "lucide-react"

function ToastNotification({ message, type }) {
    return (
        <div className="toast">
            <div className="toast-icon">
                <Check />
            </div>
            <div className="toast-message">
                {message}
            </div>
        </div>
    )
}

export default ToastNotification
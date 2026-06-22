import { useState } from "react"

const fields = [
    { key: 'name', label: 'Имя', required: true },
    { key: 'email', label: 'Email', required: true },
    { key: 'city', label: 'Город', required: false },
    { key: 'company', label: 'Компания', required: false },
    { key: 'phone', label: 'Телефон', required: false },
    { key: 'username', label: 'Юзернейм', required: true },
    { key: 'website', label: 'Сайт', required: false },
]

function EditModal({ userToEdit, setUserToEdit, setIsEditModalOpen, handleEditUser }) {

    const [formData, setFormData] = useState({
        name: userToEdit.name,
        email: userToEdit.email,
        city: userToEdit.address.city,
        company: userToEdit.company.name,
        phone: userToEdit.phone,
        username: userToEdit.username,
        website: userToEdit.website,
    })

    function handleSave() {
        const editedUser = {
            ...userToEdit,
            name: formData.name,
            email: formData.email,
            address: {
                ...userToEdit.address,
                city: formData.city,
            },
            company: {
                ...userToEdit.company,
                name: formData.company
            },
            phone: formData.phone,
            username: formData.username,
            website: formData.website,
        }

        handleEditUser(editedUser)
        setIsEditModalOpen(false)
        setUserToEdit(null)
    }

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <div className="edit-modal-info">Редактирование пользователя {userToEdit.name}</div>
                <div className="edit-form">
                    {fields.map(field => {
                        return (
                            <div className="edit-row" key={field.key}>
                                <div className="edit-key">{field.label}</div>
                                <input type="text"
                                    className="edit-input"
                                    value={formData[field.key]}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        [field.key]: e.target.value
                                    }))}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="edit-modal-buttons">
                    <button
                        className="close-edit"
                        onClick={() => {
                            setUserToEdit(null)
                            setIsEditModalOpen(false)
                        }}
                    >
                        Отмена
                    </button>
                    <button
                        className="save-button"
                        onClick={handleSave}>
                        Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal
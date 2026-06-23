import { useState } from "react"

import { fields } from "./userFields"

function EditModal({ userToEdit, setUserToEdit, setIsEditModalOpen, handleEditUser, showToast }) {

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
        showToast('Пользователь сохранен', 'success')
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal-info">Редактирование пользователя {userToEdit.name}</h2>
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
                <div className="modal-buttons">
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
import { useState } from "react"

function Modal({ setIsModalOpen, createUser, onCreateUser }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        company: '',
        phone: '',
        username: '',
        website: '',
    })

    const fields = [
        { key: 'name', label: 'Имя', required: true },
        { key: 'email', label: 'Email', required: true },
        { key: 'city', label: 'Город', required: false },
        { key: 'company', label: 'Компания', required: false },
        { key: 'phone', label: 'Телефон', required: false },
        { key: 'username', label: 'Юзернейм', required: true },
        { key: 'website', label: 'Сайт', required: false },
    ]

    const [errors, setErrors] = useState({})

    async function handleSubmit() {
        const newErrors = {}

        fields.forEach(field => {
            if (field.required && formData[field.key].trim() === '') {
                newErrors[field.key] = 'Обязательное поле'
            }
        })

        if (formData.email.trim() !== '' && !formData.email.includes('@')) {
            newErrors.email = 'Email должен содержать @'
        }

        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) {
            return
        }

        const createdUser = await createUser({ ...formData })
        onCreateUser(createdUser)
        setIsModalOpen(false)
    }

    function handleChange(fieldName, value) {
        setFormData(prev => ({ ...prev, [fieldName]: value }))
        setErrors(prev => ({ ...prev, [fieldName]: '' }))
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1>Создание пользователя</h1>
                <div className="form">
                    {
                        fields.map(element => {
                            return (
                                <div key={element.key}
                                    className="field">
                                    <div className="field-label">{element.label}</div>
                                    <input type="text"
                                        style={{ border: errors[element.key] ? '1px solid red' : null }}
                                        value={formData[element.key]}
                                        onChange={e => handleChange(element.key, e.target.value)}
                                    />
                                    {errors[element.key] ? <div className="field-error">{errors[element.key]}</div> : null}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="modal-buttons">
                    <button className="cancel-create" onClick={() => setIsModalOpen(false)}>Отмена</button>
                    <button className="submit-create" onClick={handleSubmit}>Создать</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
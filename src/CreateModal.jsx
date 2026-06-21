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

function CreateModal({ setIsCreateModalOpen, createUser, onCreateUser }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        company: '',
        phone: '',
        username: '',
        website: '',
    })

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
        setIsCreateModalOpen(false)
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
                        fields.map(field => {
                            return (
                                <div key={field.key}
                                    className="field">
                                    <div className="field-label">{field.label} {field.required && <span className="required-star">*</span>}</div>
                                    <input className={errors[field.key] ? 'field-input field-input-error' : 'field-input'}
                                        type="text"
                                        value={formData[field.key]}
                                        onChange={e => handleChange(field.key, e.target.value)}
                                    />
                                    {errors[field.key] ? <div className="field-error-info">{errors[field.key]}</div> : null}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="modal-buttons">
                    <button className="cancel-create" onClick={() => setIsCreateModalOpen(false)}>Отмена</button>
                    <button className="submit-create" onClick={handleSubmit}>Создать</button>
                </div>
            </div>
        </div>
    )
}

export default CreateModal
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

    const labels = {
        name: 'Имя',
        email: 'Email',
        city: 'Город',
        company: 'Компания',
        phone: 'Телефон',
        username: 'Юзернейм',
        website: 'Сайт',
    }

    const [errors, setErrors] = useState({})

    async function handleSubmit() {
        const newErrors = {}
        if (formData.name.trim() === '') {
            newErrors.name = 'Заполните имя'
        }
        if (formData.email.trim() === '') {
            newErrors.email = 'Заполните email'
        } else if (!formData.email.includes('@')) {
            newErrors.email = 'Email должен содержать @'
        }
        if (formData.username.trim() === '') {
            newErrors.username = 'Заполните юзернейм'
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
                        Object.keys(formData).map(element => {
                            return (
                                <div key={element}
                                    className="field">
                                    <div className="field-label">{labels[element]}</div>
                                    <input type="text"
                                        style={{ border: errors[element] ? '1px solid red' : null }}
                                        value={formData[element]}
                                        onChange={e => handleChange(element, e.target.value)}
                                    />
                                    {errors[element] ? <div className="field-error">{errors[element]}</div> : null}
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
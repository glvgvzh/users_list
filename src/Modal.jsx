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

        const createdUser = await createUser({...formData})
        onCreateUser(createdUser)
        setIsModalOpen(false)
    }

    function handleChange(fieldName, value) {
        setFormData(prev => ({...prev, [fieldName]: value}))
        setErrors(prev => ({...prev, [fieldName]: ''}))
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1>Создание пользователя</h1>
                <div className="form">
                    <div className="field">
                        <div>Имя:</div>
                        <input type="text"
                            style={{ border: errors.name ? '1px solid red' : null }}
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </div>

                    {errors.name ? <div className="field-error">{errors.name}</div> : null}

                    <div className="field">
                        <div>Email:</div>
                        <input type="text"
                            style={{ border: errors.email ? '1px solid red' : null }}
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </div>

                    {errors.email ? <div className="field-error">{errors.email}</div> : null}

                    <div className="field">
                        <div>Город:</div>
                        <input type="text"
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <div>Компания:</div>
                        <input type="text"
                            value={formData.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <div>Телефон:</div>
                        <input type="text"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <div>Юзернейм:</div>
                        <input type="text"
                            style={{ border: errors.username ? '1px solid red' : null }}
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                        />
                    </div>

                    {errors.username ? <div className="field-error">{errors.username}</div> : null}

                    <div className="field">
                        <div>Сайт:</div>
                        <input type="text"
                            value={formData.website}
                            onChange={(e) => handleChange('website', e.target.value)}
                        />
                    </div>

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
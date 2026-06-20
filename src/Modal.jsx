import { useState } from "react"

function Modal({ setIsModalOpen, createUser, onCreateUser }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')

    const [errors, setErrors] = useState({})

    async function handleSubmit() {
        const newUser = {
            name,
            email,
            city,
            company,
            phone,
            username,
            website,
        }

        const newErrors = {}

        if (name.trim() === '') {
            newErrors.name = 'Заполните имя'
        }
        if (email.trim() === '') {
            newErrors.email = 'Заполните email'
        } else if (!email.includes('@')) {
            newErrors.email = 'Email должен содержать @'
        }
        if (username.trim() === '') {
            newErrors.username = 'Заполните юзернейм'
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        } 


        const createdUser = await createUser(newUser)
        onCreateUser(createdUser)
        setIsModalOpen(false)
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
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setErrors(prev => ({...prev, name: ''}))
                            }}
                        />
                    </div>

                    {errors.name ? <div className="field-error">{errors.name}</div> : null}

                    <div className="field">
                        <div>Email:</div>
                        <input type="text"
                            style={{ border: errors.email ? '1px solid red' : null }}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErrors(prev => ({...prev, email: ''}))
                            }}
                        />
                    </div>

                    {errors.email ? <div className="field-error">{errors.email}</div> : null}

                    <div className="field">
                        <div>Город:</div>
                        <input type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <div>Компания:</div>
                        <input type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <div>Телефон:</div>
                        <input type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <div>Юзернейм:</div>
                        <input type="text"
                            style={{ border: errors.username ? '1px solid red' : null }}
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setErrors(prev => ({...prev, username: ''}))
                            }}
                        />
                    </div>

                    {errors.username ? <div className="field-error">{errors.username}</div> : null}

                    <div className="field">
                        <div>Сайт:</div>
                        <input type="text"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
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
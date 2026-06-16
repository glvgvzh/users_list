import { useState, useEffect } from "react"
import './App.css'
import {
  Users, CircleUserRound, MapPin, BrushCleaning, BriefcaseBusiness,
  Mail, Phone, Globe, AtSign, Loader
} from 'lucide-react'

function User({ name, email, city, company, phone, username, website }) {

  return (

    <div className="user-card">
      <div className="circle-user-pic"><CircleUserRound strokeWidth={0.3} /></div>
      <h3>{name}</h3>

      <div className="user-email">
        <div className="icon"><Mail /></div>
        <div className="info">{email}</div>
      </div>

      <div className="user-city">
        <div className="icon"><MapPin /></div>
        <div className="info">{city}</div>
      </div>

      <div className="user-company">
        <div className="icon"><BriefcaseBusiness /></div>
        <div className="info">{company}</div>
      </div>

      <div className="user-phone">
        <div className="icon"><Phone /></div>
        <div className="info">{phone}</div>
      </div>
      <div className="user-username">
        <div className="icon"><AtSign /></div>
        <div className="info">{username}</div>
      </div>
      <div className="user-website">
        <div className="icon"><Globe /></div>
        <div className="info">{website}</div>
      </div>
    </div>
  )
}

function App() {

  const [apiUsers, setApiUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error('Ошибка загрузки :(')
        }
        const data = await response.json()
        setApiUsers(data)
        setLoading(false)
      }
      catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    loadUsers()
  }, [])


  const [searchQuery, setSearchQuery] = useState('')

  //фильтр пользователей
  let filteredUsers = apiUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="app">

      <header className="header">

        <div className="header-icon">
          <Users />
        </div>
        <div className="header-info">
          <h1>Users Dashboard</h1>
          <div>Всего пользователей: {error ? '-' : loading ? '...' : apiUsers.length}</div>
        </div>

      </header>

      <div className="controls">
        <div className="search-panel">
          <input
            className="search-input"
            type="text"
            placeholder="Поиск пользователя..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="clear-search-button"
            onClick={() => setSearchQuery('')}>
            <BrushCleaning className="clean-icon" strokeWidth={2.5} />
            Очистить
          </button>
        </div>

      </div>

      <div className="users-list">
        {loading ? (
          <div className="loader-wrapper">
            <div className="loader"><Loader /></div>
          </div>
        ) : error !== null ? (
          <p className="empty-message">{error}</p>
        ) :
          filteredUsers.length === 0
            ? <p className="empty-message">Нет пользователей по выбранным фильтрам</p>
            : (filteredUsers.map(user => (<User
              key={user.id}
              name={user.name}
              email={user.email}
              city={user.address.city}
              company={user.company.name}
              phone={user.phone}
              username={user.username}
              website={user.website}
            />)))
        }
      </div>

      <footer className="footer">

        <div className="footer-icon">
          <Users />
        </div>

        <div className="footer-info">
          Всего пользователей: {error ? '-' : loading ? '...' : apiUsers.length}
        </div>

      </footer>

    </div>
  )
}

export default App
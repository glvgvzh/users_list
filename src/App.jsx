import { useState, useEffect } from "react"
import './App.css'
import {
  Users, BrushCleaning, Loader
} from 'lucide-react'
import User from "./User"

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
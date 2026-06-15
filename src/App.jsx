import { useState, useEffect } from "react"
import './App.css'
import { Users, CircleUserRound, MapPin, BrushCleaning } from 'lucide-react'

function User({ name, email, city, company, phone, username, website }) {

  return (

    <div className="user-card">
      <div className="circle-user-pic"><CircleUserRound strokeWidth={0.3} /></div>
      <h3>{name}</h3>

      <div className="user-age">
        <div className="user-age-info">{email}</div>
        <div></div>
      </div>

      <div className="user-city">
        <div className="user-city-icon"><MapPin strokeWidth={1.5} /></div>
        <div className="user-city-info">{city}</div>
      </div>

      <div className="user-role">
        {company}
      </div>

      <div>{phone}</div>
      <div>{username}</div>
      <div>{website}</div>
    </div>
  )
}

function App() {

  const [apiUsers, setApiUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setApiUsers(data)
      })
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
        {
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
          Всего пользователей: {apiUsers.length}
        </div>

      </footer>

    </div>
  )
}

export default App
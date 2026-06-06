import { useState } from "react"
import './App.css'

const users = [
  {
    name: 'Arina',
    age: 26,
    city: 'Krasnodar',
    isOnline: true,
    role: 'support',
  },
  {
    name: 'Kate',
    age: 30,
    city: 'Moscow',
    isOnline: true,
    role: 'manager',
  },
  {
    name: 'Max',
    age: 20,
    city: 'Berlin',
    isOnline: false,
    role: 'developer',
  }
]

function User(props) {

  const [showAge, setShowAge] = useState(false)

  return (

    <div className="user-card">
      <h3>{props.name}</h3>
      <p className="user-age">{showAge ? `Возраст: ${props.age}` : 'Возраст скрыт'}</p>
      <p className="user-city">{props.city}</p>
      <p className="user-role">Роль: {props.role === 'developer' ? props.role + ' 💻' : props.role}</p>
      <p className="user-status">Статус: {props.isOnline ? '🟢 онлайн' : '⚪ офлайн'}</p>

      <button className="show-age-button" onClick={() => setShowAge(!showAge)}>{showAge ? 'Скрыть' : 'Показать'} возраст</button>
    </div>
  )
}

function App() {

  const onlineCount = users.reduce((sum, user) => user.isOnline ? sum + 1 : sum, 0)

  const [onlyOnline, setOnlyOnline] = useState(false)
  const [onlyDev, setOnlyDev] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')

  //фильтр пользователей
  let filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase())) 
  if (onlyOnline) {
    filteredUsers = filteredUsers.filter(user => user.isOnline)
  }
  if (onlyDev) {
    filteredUsers = filteredUsers.filter(user => user.role === 'developer')
  }
  


  return (
  <div className="app">
    
    <header className="header">
      <h1>Users Dashboard</h1>
      <div className="stats">
          Онлайн: <span className="online-count">{onlineCount}</span>{' '} из {users.length}
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
          onClick={() => setSearchQuery('')}>Очистить
        </button>
      </div>

      <div className="filters">
        <button 
          className={onlyOnline ? 'filter-button-on' : 'filter-button-off'} 
          onClick={() => setOnlyOnline(!onlyOnline)}>Показать {onlyOnline ? 'всех' : 'только онлайн'}
        </button>
        
        <button 
          className={onlyDev ? 'filter-button-on' : 'filter-button-off'} 
          onClick={() => setOnlyDev(!onlyDev)}>Показать {onlyDev ? 'всех' : 'только разработчиков'}
        </button>
      </div>
    
    </div>
    
    <div className="users-list">
      {
      filteredUsers.length === 0 
      ? <p className="empty-message">Нет пользователей по выбранным фильтрам</p> :
      (filteredUsers.map(user => (<User 
        key={user.name}
        name={user.name} 
        age={user.age} 
        city={user.city}
        isOnline={user.isOnline}
        role={user.role} 
      />)))
     }
    </div>

    <footer className="total-users">Всего пользователей: {users.length}</footer>

  </div>
  )
}

export default App
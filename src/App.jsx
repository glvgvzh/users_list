import { useState } from "react"
import './App.css'
import { Users, CircleUserRound, CalendarDays, MapPin, Circle, Eye, CodeXml, BrushCleaning } from 'lucide-react'


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
    isOnline: false,
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
      <div className="top-status-icon"><Circle fill={props.isOnline ? "#4fb653" : "#8e919b"} strokeWidth={0} /></div>
      <div className="circle-user-pic"><CircleUserRound strokeWidth={0.3} /></div>
      <h3>{props.name}</h3>

      <div className="user-age">
        <div className="user-age-icon"><CalendarDays strokeWidth={1.5} /></div>
        <div className="user-age-info">Возраст: {showAge ? props.age : 'скрыт'}</div>
      </div>

      <div className="user-city">
        <div className="user-city-icon"><MapPin strokeWidth={1.5} /></div>
        <div className="user-city-info">{props.city}</div>
      </div>

      <div className="user-role"
      style={{ 
        backgroundColor: props.role === 'support' ? '#262445' : props.role === 'developer' ? '#252e4e' : '#332825',
        color: props.role === 'support' ? '#b08de0' : props.role === 'developer' ? '#799ae6' : '#ffa418'
      }}>
        {props.role === 'developer' ? props.role + ' 💻' : props.role}
      </div>

      <div className="user-status">
        <div className="user-status-icon"><Circle fill={props.isOnline ? "#4fb653" : "#8e919b"} strokeWidth={0} /></div>
        <div className="user-status-info">Статус: {props.isOnline ? 'онлайн' : 'офлайн'}</div>
      </div>

      <button className="show-age-button" onClick={() => setShowAge(!showAge)}><Eye strokeWidth={1.5} />{showAge ? 'Скрыть' : 'Показать'} возраст</button>
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

      <div className="header-icon">
        <Users />
      </div>
      <div className="header-info">
        <h1>Users Dashboard</h1>
        <div className="stats">
            Онлайн: <span className="online-count">{onlineCount}</span>{' '} из {users.length}
        </div>
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

      <div className="filters">
        <button 
          className={onlyOnline ? 'filter-button-on' : 'filter-button-off'} 
          onClick={() => setOnlyOnline(!onlyOnline)}>
            <Circle className="filter-online-icon" fill="#4fb653" strokeWidth={0} />
            Показать {onlyOnline ? 'всех' : 'только онлайн'}
        </button>
        
        <button 
          className={onlyDev ? 'filter-button-on' : 'filter-button-off'} 
          onClick={() => setOnlyDev(!onlyDev)}>
            <CodeXml className="dev-filter-icon" strokeWidth={2.5} />
            Показать {onlyDev ? 'всех' : 'только разработчиков'}
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

    <footer className="footer">

      <div className="footer-icon">
        <Users />
      </div>

      <div className="footer-info">
        Всего пользователей: {users.length}
      </div>
      
    </footer>

  </div>
  )
}

export default App
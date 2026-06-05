import { useState } from "react"

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

    <div>
      <h3>Пользователь</h3>
      {props.name}<br/>
      {showAge ? props.age : 'Возраст скрыт'}<br/>
      {props.city}<br/>
      Роль: {props.role === 'developer' ? props.role + ' 💻' : props.role}<br/>
      Статус: {props.isOnline ? '🟢 онлайн' : '⚪ офлайн'}
      <p></p>
      <button onClick={() => setShowAge(!showAge)}>{showAge ? 'Скрыть' : 'Показать'} возраст</button><br/>
    </div>
  )
}

function App() {

  const onlineCount = users.reduce((sum, user) => user.isOnline ? sum + 1 : sum, 0)

  const [onlyOnline, setOnlyOnline] = useState(false)
  const [onlyDev, setOnlyDev] = useState(false)

  let filteredUsers = users 
  if (onlyOnline) {
    filteredUsers = filteredUsers.filter(user => user.isOnline)
  }
  if (onlyDev) {
    filteredUsers = filteredUsers.filter(user => user.role === 'developer')
  }
  

  return (
  <>
    Онлайн: {onlineCount} из {users.length}<br/>

    {
    filteredUsers.length === 0 
    ? 'Нет пользователей по выбранным фильтрам' :
    (filteredUsers.map(user => (<User 
      key={user.name}
      name={user.name} 
      age={user.age} 
      city={user.city}
      isOnline={user.isOnline}
      role={user.role} 
    />)))
    }
    <p></p>

    <button onClick={() => setOnlyOnline(!onlyOnline)}>Показать {onlyOnline ? 'всех' : 'только онлайн'}</button>
    <p></p>

    <button onClick={() => setOnlyDev(!onlyDev)}>Показать {onlyDev ? 'всех' : 'только разработчиков'}</button>
  </>
  )
}

export default App
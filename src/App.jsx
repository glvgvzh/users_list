import { useState, useEffect } from "react"
import './App.css'
import Header from "./Header"
import Controls from "./Controls"
import UsersList from "./UsersList"
import Footer from "./Footer"

function App() {

  const [apiUsers, setApiUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadUsers() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error('Ошибка загрузки :(')
      }
      const data = await response.json()
      setApiUsers(data)
    }
    catch (error) {
      setError(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [])


  const [searchQuery, setSearchQuery] = useState('')

  //фильтр пользователей
  let filteredUsers = apiUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="app">

      <Header error={error} loading={loading} apiUsersLength={apiUsers.length} />

      <Controls searchQuery={searchQuery} setSearchQuery={setSearchQuery} loadUsers={loadUsers} />

      <UsersList loading={loading} error={error} filteredUsers={filteredUsers} />

      <Footer error={error} loading={loading} apiUsersLength={apiUsers.length} />

    </div>
  )
}

export default App
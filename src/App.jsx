import { useState, useEffect } from "react"
import './App.css'
import Header from "./Header"
import Controls from "./Controls"
import Modal from "./Modal"
import UsersList from "./UsersList"
import Footer from "./Footer"

function App() {

  const [searchQuery, setSearchQuery] = useState('')

  const [apiUsers, setApiUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)


  async function createUser(user) {
    try {
      const newUser = {
        name: user.name,
        email: user.email,
        address: {
          city: user.city
        },
        company: {
          name: user.company
        },
        phone: user.phone,
        username: user.username,
        website: user.website,
      }
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(newUser)
      })
      if (!response.ok) {
        throw new Error('Ошибка')
      }
      const data = await response.json()
      return data
    }
    catch (error) {
      console.log(error.message)
    }
  }

  function handleCreateUser(newUser) {
    setApiUsers(prev => [...prev, { ...newUser, id: Date.now() }])
  }

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

  useEffect(() => {
    const localStorageUsers = JSON.parse(localStorage.getItem('users'))
    if (localStorageUsers === null) {
      loadUsers()
      return
    }
    setApiUsers(localStorageUsers)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (loading) return
    localStorage.setItem('users', JSON.stringify(apiUsers))
  }, [apiUsers, loading])


  let filteredUsers = apiUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function deleteUser(userId) {
    setApiUsers(prev => prev.filter(user => user.id !== userId))
  }

  return (
    <div className="app">

      <Header error={error} loading={loading} apiUsersLength={apiUsers.length} />

      <Controls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loadUsers={loadUsers}
      />

      <button className="create-user"
        onClick={() => setIsModalOpen(true)}>
        Создать пользователя
      </button>

      {isModalOpen &&
        <Modal
          setIsModalOpen={setIsModalOpen}
          createUser={createUser}
          onCreateUser={handleCreateUser}
        />
      }

      {isDeleteModalOpen && userToDelete !== null &&
        <div className='delete-modal-overlay'>
          <div className='delete-modal'>

            <div className="confirm-message">Удалить пользователя {userToDelete.name}?</div>

            <div className="delete-modal-buttons">
              <button
                className="confirm-no"
                onClick={() => {
                  setUserToDelete(null)
                  setIsDeleteModalOpen(false)
                }}>No</button>

              <button
                className="confirm-yes"
                onClick={() => {
                  deleteUser(userToDelete.id)
                  setUserToDelete(null)
                  setIsDeleteModalOpen(false)
                }}>Yes</button>
            </div>

          </div>
        </div>
      }

      <UsersList
        loading={loading}
        error={error}
        filteredUsers={filteredUsers}
        setUserToDelete={setUserToDelete}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />

      <Footer error={error} loading={loading} apiUsersLength={apiUsers.length} />

    </div>
  )
}

export default App
import UsersLoader from "./UsersLoader"
import User from "./User"

function UsersList({ loading, error, filteredUsers, setIsDeleteModalOpen, setUserToDelete, setUserToEdit, setIsEditModalOpen }) {
    return (
        <>
            <div className="users-list">
                {loading ? (
                    <UsersLoader />
                ) : error !== null ? (
                    <p className="empty-message">{error}</p>
                ) :
                    filteredUsers.length === 0
                        ? <p className="empty-message">Нет пользователей по выбранным фильтрам</p>
                        : (filteredUsers.map(user => (
                            <User
                                key={user.id}
                                user={user}
                                setIsDeleteModalOpen={setIsDeleteModalOpen}
                                setUserToDelete={setUserToDelete}
                                setUserToEdit={setUserToEdit}
                                setIsEditModalOpen={setIsEditModalOpen}
                            />))
                        )
                }
            </div>
        </>
    )
}

export default UsersList
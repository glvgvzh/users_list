
function DeleteModal({ userToDelete, setUserToDelete, setIsDeleteModalOpen, deleteUser }) {
    return (
        <>
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
        </>
    )
}

export default DeleteModal
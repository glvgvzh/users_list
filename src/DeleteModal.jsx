
function DeleteModal({ userToDelete, setUserToDelete, setIsDeleteModalOpen, deleteUser }) {
    return (
        <>
                <div className='modal-overlay'>
                    <div className='modal'>

                        <h2 className="confirm-message">Удалить пользователя {userToDelete.name}?</h2>

                        <div className="modal-buttons">
                            <button
                                className="confirm-no"
                                onClick={() => {
                                    setUserToDelete(null)
                                    setIsDeleteModalOpen(false)
                                }}>No</button>

                            <button
                                className="confirm-yes"
                                onClick={() => {
                                    deleteUser(userToDelete.id, userToDelete.name)
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
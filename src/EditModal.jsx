
function EditModal({ userToEdit, setUserToEdit, setIsEditModalOpen }) {
    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <div className="edit-modal-info">Редактирование пользователя {userToEdit.name}</div>
                <div className="edit-modal-buttons">
                    <button
                        className="close-edit"
                        onClick={() => {
                            setUserToEdit(null)
                            setIsEditModalOpen(false)
                        }}
                    >
                        Отмена
                    </button>
                    <button className="save-edit">Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal
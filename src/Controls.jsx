import { BrushCleaning, RefreshCcw, UserRoundPlus } from 'lucide-react'

function Controls({ searchQuery, setSearchQuery, loadUsers, setIsCreateModalOpen }) {
    return (
        <>
            <div className="controls">
                <div className="search-panel">
                    <input
                        id="user-search"
                        className="search-input"
                        type="text"
                        placeholder="Поиск пользователя..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="clear-search-button"
                        onClick={() => setSearchQuery('')}>
                        <BrushCleaning />
                        Очистить поиск
                    </button>

                    <button className='refresh-users-list'
                        onClick={loadUsers}>
                        <RefreshCcw />
                        Обновить из API
                    </button>

                    <button className="create-user"
                        onClick={() => setIsCreateModalOpen(true)}>
                        <UserRoundPlus />
                        Создать пользователя
                    </button>
                </div>
            </div>
        </>
    )
}

export default Controls
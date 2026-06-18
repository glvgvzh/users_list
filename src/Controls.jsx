import { BrushCleaning } from 'lucide-react'

function Controls({ searchQuery, setSearchQuery }) {
    return (
        <>
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
            </div>
        </>
    )
}

export default Controls
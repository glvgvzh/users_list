import { Users } from 'lucide-react'

function Header({ error, loading, apiUsersLength }) {
    return (
        <>
            <header className="header">
                <div className="header-icon">
                    <Users />
                </div>
                <div className="header-info">
                    <h1>Users Dashboard</h1>
                    <div className="header-count">Всего пользователей: {error ? '-' : loading ? '...' : apiUsersLength}</div>
                </div>
            </header>
        </>
    )
}
export default Header
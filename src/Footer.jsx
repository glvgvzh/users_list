import { Users } from 'lucide-react'

function Footer({ error, loading, apiUsersLength }) {
    return (
        <>
        <footer className="footer">

        <div className="footer-icon">
          <Users />
        </div>

        <div className="footer-info">
          Всего пользователей: {error ? '-' : loading ? '...' : apiUsersLength}
        </div>

      </footer>
        </>
    )
}

export default Footer
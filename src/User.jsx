import {
  CircleUserRound, MapPin, Mail, Phone, Globe, AtSign, BriefcaseBusiness, EllipsisVertical,
  SquarePen, Trash2
} from 'lucide-react'
import { useState } from 'react'

function User({ user, setIsDeleteModalOpen, setUserToDelete, setUserToEdit, setIsEditModalOpen }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (

    <div className="user-card">

      <div className='card-options'>
        <button className='button-options'
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <EllipsisVertical />
        </button>
        {isMenuOpen &&
          <div className='dropdown-menu'>
            <button className='dropdown-edit'
              onClick={() => {
                setUserToEdit(user)
                setIsEditModalOpen(true)
                setIsMenuOpen(false)
              }}
            >
              <SquarePen />
              Редактировать
            </button>
            <button className='dropdown-delete'
              onClick={() => {
                setUserToDelete({ id: user.id, name: user.name })
                setIsDeleteModalOpen(true)
                setIsMenuOpen(false)
              }}
            >
              <Trash2 />
              Удалить
            </button>
          </div>
        }
      </div>

      <div className="circle-user-pic"><CircleUserRound strokeWidth={0.3} /></div>
      <h2>{user.name}</h2>

      <div className="user-info-row">
        <div className="icon"><Mail /></div>
        <div className="info">{user.email}</div>
      </div>

      <div className="user-info-row">
        <div className="icon"><MapPin /></div>
        <div className="info">{user.address.city}</div>
      </div>

      <div className="user-info-row">
        <div className="icon"><BriefcaseBusiness /></div>
        <div className="info">{user.company.name}</div>
      </div>

      <div className="user-info-row">
        <div className="icon"><Phone /></div>
        <div className="info">{user.phone}</div>
      </div>
      <div className="user-info-row">
        <div className="icon"><AtSign /></div>
        <div className="info">{user.username}</div>
      </div>
      <div className="user-info-row">
        <div className="icon"><Globe /></div>
        <div className="info">{user.website}</div>
      </div>
    </div>
  )
}

export default User
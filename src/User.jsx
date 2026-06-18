import {
    CircleUserRound, MapPin, Mail, Phone, Globe, AtSign, BriefcaseBusiness
} from 'lucide-react'

function User({ user }) {

  return (

    <div className="user-card">
      <div className="circle-user-pic"><CircleUserRound strokeWidth={0.3} /></div>
      <h3>{user.name}</h3>

      <div className="user-email">
        <div className="icon"><Mail /></div>
        <div className="info">{user.email}</div>
      </div>

      <div className="user-city">
        <div className="icon"><MapPin /></div>
        <div className="info">{user.address.city}</div>
      </div>

      <div className="user-company">
        <div className="icon"><BriefcaseBusiness /></div>
        <div className="info">{user.company.name}</div>
      </div>

      <div className="user-phone">
        <div className="icon"><Phone /></div>
        <div className="info">{user.phone}</div>
      </div>
      <div className="user-username">
        <div className="icon"><AtSign /></div>
        <div className="info">{user.username}</div>
      </div>
      <div className="user-website">
        <div className="icon"><Globe /></div>
        <div className="info">{user.website}</div>
      </div>
    </div>
  )
}

export default User
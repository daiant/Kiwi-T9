export function ContactCard({user}: any) {
    return (
        <li className="user-item">
            <div className="avatar"><img src={user.picture.medium} alt="" /></div>
            <div className="info">
                <div className="name">{user.name.first} {user.name.last}</div>
                <div className="phone">{user.phone}</div>
            </div>
            <div className="call">
                <img src="/phone.png" alt="Call" />
            </div>
        </li>
    )
}
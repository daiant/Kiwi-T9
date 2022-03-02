export function ContactCard({user, handleCalling, handleUserCalling}: any) {
    
    function call() {
        handleUserCalling(user);
        setTimeout(() => {
            handleCalling(true);
        }, 300)
    }
    return (
        <li className="user-item">
            <div className="avatar" data-testid="img"><img src={user.picture.medium} alt="" /></div>
            <div className="info">
                <div className="name" data-testid="full-name">{user.name.first} {user.name.last}</div>
                <div className="phone" data-testid="phone">{user.phone}</div>
            </div>
            <div className="call" onClick={call}>
                <img src="/phone.png" alt="Call" />
            </div>
        </li>
    )
}
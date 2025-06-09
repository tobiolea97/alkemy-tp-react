import './styles.css';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-card__name">
        {user.nombre} {user.apellido}
      </div>
      <div className="user-card__email">{user.email}</div>
      <div className="user-card__location">
        {user.ciudad}, {user.pais}
      </div>
      <div className="user-card__actions">
        <button className="btn btn-link">Detalle</button>
        <button className="btn btn-link">Editar</button>
        <button className="btn btn-link">Eliminar</button>
      </div>
    </div>
  );
}

export default UserCard;


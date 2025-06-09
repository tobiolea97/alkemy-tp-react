import "./styles.css";

function UserDetail({ user, onClose }) {
  if (!user) return null;
  return (
    <div className="user-detail-view">
      <div className="user-detail-modal">
        <button className="user-detail-close" onClick={onClose}>
          &times;
        </button>
        <h2>Detalle de Usuario</h2>
        <div className="user-detail-info">
          <div>
            <strong>Nombre:</strong> {user.nombre}
          </div>
          <div>
            <strong>Apellido:</strong> {user.apellido}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Ciudad:</strong> {user.ciudad}
          </div>
          <div>
            <strong>País:</strong> {user.pais}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;


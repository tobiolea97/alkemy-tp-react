import "./styles.css";
import { useNavigate } from "react-router-dom";
import React from "react";

function UserCard({ user }) {
  const navigate = useNavigate();
  const id = user.id;
  const [error, setError] = React.useState(null);

  const handleDelete = async () => {
    if (!window.confirm("¿Eliminar este usuario definitivamente?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("No se pudo eliminar el usuario");
      alert("Usuario eliminado con éxito");
    } catch (err) {
      setError(err.message);
    }
    window.location.reload();
  };

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
        <button
          className="btn btn-link"
          onClick={() => navigate(`/users/detail/${user.id}`)}
        >
          Detalle
        </button>
        <button
          className="btn btn-link"
          onClick={() => navigate(`/users/edit/${user.id}`)}
        >
          Editar
        </button>
        <button className="btn btn-link" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default UserCard;


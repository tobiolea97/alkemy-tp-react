import "./styles.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SpinnerComponent from "../../components/ui/spinner/SpinnerComponent.jsx";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`http://localhost:3000/api/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Usuario no encontrado");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <SpinnerComponent />;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return null;

  return (
    <div className="view-main-container">
      <div className="user-detail-modal">
        <button className="user-detail-close" onClick={() => navigate(-1)}>
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
          <div>
            <strong>Altura:</strong> {user.altura} cm
          </div>
          <div>
            <strong>Edad:</strong> {user.edad} años
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;


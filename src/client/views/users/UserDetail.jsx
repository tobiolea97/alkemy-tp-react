import "./styles.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SpinnerComponent from "../../components/ui/spinner/SpinnerComponent.jsx";

function UserDetail({ mode }) {
  const isEdit = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    ciudad: "",
    pais: "",
    altura: "",
    edad: "",
  });
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
        setForm({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          email: data.email || "",
          ciudad: data.ciudad || "",
          pais: data.pais || "",
          altura: data.altura || "",
          edad: data.edad || "",
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer el fetch para actualizar el usuario si lo deseas
    // Por ejemplo:
    // fetch(`http://localhost:3000/api/users/${id}`, { method: "PUT", ... })
    //   .then(...)
    //   .catch(...);
    alert("Datos guardados (simulado)");
    navigate(-1);
  };

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
        <form className="user-detail-info" onSubmit={handleSubmit}>
          <div>
            <strong>Nombre:</strong>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div>
            <strong>Apellido:</strong>
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div>
            <strong>Ciudad:</strong>
            <input
              type="text"
              name="ciudad"
              value={form.ciudad}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div>
            <strong>País:</strong>
            <input
              type="text"
              name="pais"
              value={form.pais}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div>
            <strong>Altura:</strong>
            <input
              type="number"
              name="altura"
              value={form.altura}
              onChange={handleChange}
              disabled={!isEdit}
            />{" "}
            cm
          </div>
          <div>
            <strong>Edad:</strong>
            <input
              type="number"
              name="edad"
              value={form.edad}
              onChange={handleChange}
              disabled={!isEdit}
            />{" "}
            años
          </div>
          {isEdit && (
            <div>
              <button className="btn btn-primary" type="submit">
                Guardar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserDetail;
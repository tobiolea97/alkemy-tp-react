import "./styles.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SpinnerComponent from "../../components/ui/spinner/SpinnerComponent.jsx";

function UserDetail({ mode }) {
  const isEdit = mode === "edit";
  const isNew = mode === "new";

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
    if (isNew) {
      setUser(null);
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        ciudad: "",
        pais: "",
        altura: "",
        edad: "",
      });
      setIsLoading(false);
      return;
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const url = isNew
      ? "http://localhost:3000/api/users"
      : `http://localhost:3000/api/users/${id}`;

    const method = isNew ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message =
          errorData?.error ||
          (isNew
            ? "Error al crear el usuario"
            : "Error al actualizar el usuario");
        throw new Error(message);
      }

      const userData = await response.json();
      setUser(userData);

      alert(isNew ? "Usuario creado correctamente" : "Datos actualizados");
      navigate(-1);
    } catch (err) {
      setError(err.message);
      alert(err.message); // <--- Mostramos el error como alert
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <SpinnerComponent />;

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
              disabled={!isEdit && !isNew}
            />
          </div>
          <div>
            <strong>Apellido:</strong>
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              disabled={!isEdit && !isNew}
            />
          </div>
          <div>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!isEdit && !isNew}
            />
          </div>
          <div>
            <strong>Ciudad:</strong>
            <input
              type="text"
              name="ciudad"
              value={form.ciudad}
              onChange={handleChange}
              disabled={!isEdit && !isNew}
            />
          </div>
          <div>
            <strong>País:</strong>
            <input
              type="text"
              name="pais"
              value={form.pais}
              onChange={handleChange}
              disabled={!isEdit && !isNew}
            />
          </div>
          <div>
            <strong>Altura:</strong>
            <input
              type="number"
              name="altura"
              value={form.altura}
              onChange={handleChange}
              disabled={!isEdit && !isNew}
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
              disabled={!isEdit && !isNew}
            />{" "}
            años
          </div>
          {(isEdit || isNew) && (
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


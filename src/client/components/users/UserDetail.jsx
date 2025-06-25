import "./styles.css";

// ...existing code...
function UserDetail({ user, onClose, mode }) {
  const isDetail = mode === "detail";
  const [form, setForm] = React.useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    email: user?.email || "",
    ciudad: user?.ciudad || "",
    pais: user?.pais || "",
  });

  React.useEffect(() => {
    setForm({
      nombre: user?.nombre || "",
      apellido: user?.apellido || "",
      email: user?.email || "",
      ciudad: user?.ciudad || "",
      pais: user?.pais || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="user-detail-view">
      <div className="user-detail-modal">
        <button className="user-detail-close" onClick={onClose}>
          &times;
        </button>
        <h2>Detalle de Usuario</h2>
        <form className="user-detail-info">
          <div>
            <strong>Nombre:</strong>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
          <div>
            <strong>Apellido:</strong>
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
          <div>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
          <div>
            <strong>Ciudad:</strong>
            <input
              type="text"
              name="ciudad"
              value={form.ciudad}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
          <div>
            <strong>País:</strong>
            <input
              type="text"
              name="pais"
              value={form.pais}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
// ...existing code...

export default UserDetail;


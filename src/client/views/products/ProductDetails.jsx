import "./styles.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SpinnerComponent from "../../components/ui/spinner/SpinnerComponent.jsx";

function ProductDetails({ mode }) {
  const isEdit = mode === "edit";
  const isNew = mode === "new";

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    id: "",
    descripcion: "",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (isNew) {
      setProduct(null);
      setForm({
        id: "",
        descripcion: "",
        precio: "",
      });
      setIsLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setForm({
          id: data.id || "",
          descripcion: data.descripcion || "",
          precio: data.precio || "",
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Endpoint y verbo HTTP según modo
    const url = isNew
      ? "http://localhost:3000/api/products"
      : `http://localhost:3000/api/products/${id}`;

    const method = isNew ? "POST" : "PUT";

    // (Paso opcional) Sanitizar/convertir campos numéricos
    const payload = {
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio), // evita que vaya como string
      // Si tu API acepta más campos, agrégalos aquí
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Intentamos leer un posible mensaje de la API
        const errorData = await response.json().catch(() => ({}));
        const message =
          errorData?.error ||
          (isNew
            ? "Error al crear el producto"
            : "Error al actualizar el producto");
        throw new Error(message);
      }

      // Guardamos el producto devuelto (útil si debes refrescar el estado global)
      const productData = await response.json();
      setProduct(productData); // o setProductos(prev => …) según tu caso

      alert(isNew ? "Producto creado correctamente" : "Datos actualizados");
      navigate(-1); // volvemos a la vista anterior
    } catch (err) {
      setError(err.message);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    if (isNew) {
      setProduct(null);
      setIsLoading(false);
      return;
    }
    fetch(`http://localhost:3000/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        if (!found) throw new Error("Producto no encontrado");
        setProduct(found);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <SpinnerComponent />;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return null;

  return (
    <div className="view-main-container">
      <div className="product-detail-modal">
        <button className="user-detail-close" onClick={() => navigate(-1)}>
          &times;
        </button>
        <h2>Detalle de Producto</h2>
        <form className="user-detail-info" onSubmit={handleSubmit}>
          <div>
            <strong>ID:</strong>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              disabled={true} // el ID no suele editarse
            />
          </div>
          <div>
            <strong>Descripción:</strong>
            <input
              type="text"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              disabled={!isEdit && !isNew}
            />
          </div>
          <div>
            <strong>Precio:</strong>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              disabled={!isEdit && !isNew}
            />{" "}
            ARS
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

export default ProductDetails;


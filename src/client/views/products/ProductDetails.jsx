import "./styles.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SpinnerComponent from "../../components/ui/spinner/SpinnerComponent.jsx";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
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
        <div className="user-detail-info">
          <div>
            <strong>ID:</strong> {product.id}
          </div>
          <div>
            <strong>Descripción:</strong> {product.descripcion}
          </div>
          <div>
            <strong>Precio:</strong>{" "}
            {product.precio.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;


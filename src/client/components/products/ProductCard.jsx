import "./styles.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Producto eliminado correctamente");
            window.location.reload(); // Recargar la página para reflejar los cambios
          } else {
            alert("Error al eliminar el producto");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el producto:", error);
          alert("Error al eliminar el producto");
        });
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__id">ID: {product.id}</div>
      <div className="product-card__desc">{product.descripcion}</div>
      <div className="product-card__price">
        {product.precio.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 0,
        })}
      </div>
      <div className="product-card__actions">
        <button
          className="btn btn-link"
          onClick={() => navigate(`/products/detail/${product.id}`)}
        >
          Detalle
        </button>
        <button
          className="btn btn-link"
          onClick={() => navigate(`/products/edit/${product.id}`)}
        >
          Editar
        </button>
        <button
          className="btn btn-link"
          onClick={() => {
            handleDelete();
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;


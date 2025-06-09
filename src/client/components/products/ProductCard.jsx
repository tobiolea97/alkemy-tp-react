import './styles.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();
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
        <button className="btn btn-link" onClick={() => navigate(`/products/detail/${product.id}`)}>Detalle</button>
        <button className="btn btn-link">Editar</button>
        <button className="btn btn-link">Eliminar</button>
      </div>
    </div>
  );
}

export default ProductCard;


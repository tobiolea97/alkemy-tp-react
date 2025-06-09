import "./styles.css";
import "../../styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import TitleComponent from "../../components/layout/TitleComponent.jsx";
import ButtonComponent from "../../components/layout/ButtonComponent.jsx";
import ProductCard from "../../components/products/ProductCard.jsx";
import CardBoard from "../../components/ui/cardboard/CardBoard.jsx";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => setProducts(response.data.slice(0, 10)))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="view-main-container">
      <TitleComponent>Productos</TitleComponent>
      {/* <ProductGrid products={products} /> */}
      <CardBoard>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CardBoard>
      <div className="buttons-bar">
        <ButtonComponent text="Nuevo Producto" buttonType="primary" />
      </div>
    </div>
  );
}

export default Products;

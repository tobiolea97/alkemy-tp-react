import "./styles.css";
import "../../styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import TitleComponent from "../../components/layout/TitleComponent.jsx";
import ButtonComponent from "../../components/layout/ButtonComponent.jsx";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => setProducts(response.data.slice(0, 10)))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="view-main-container">
      <TitleComponent>Productos</TitleComponent>
      <ProductGrid products={products} />
      <div className="buttons-bar">
        <ButtonComponent text="Nuevo Producto" buttonType="primary" />
      </div>
    </div>
  );
}

export default Products;

import "./styles.css";
import "../../styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import TitleComponent from "../../components/layout/TitleComponent.jsx";
import ButtonComponent from "../../components/layout/ButtonComponent.jsx";
import ProductCard from "../../components/products/ProductCard.jsx";
import CardBoard from "../../components/ui/cardboard/CardBoard.jsx";
import SpinnerComponent from "../../components/ui/spinner/SpinnerComponent.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        setTimeout(() => {
          setProducts(response.data.slice(0, 10));
          setIsLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="view-main-container">
      <TitleComponent>Productos</TitleComponent>
      {/* <ProductGrid products={products} /> */}
      <CardBoard>
        {isLoading && <SpinnerComponent />}
        {!isLoading &&
          products.map((product) => (
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

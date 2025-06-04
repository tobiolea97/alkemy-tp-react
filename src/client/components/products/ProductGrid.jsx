function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }
  return (
    <>
      <table className="grid-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.descripcion}</td>
                <td>
                  {product.precio.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td>View | Edit | Delete</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      ;
    </>
  );
}

export default ProductGrid;

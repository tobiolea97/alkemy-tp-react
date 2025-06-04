

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
              <th>URL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>${product.url}</td>
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
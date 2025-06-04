

function UserGrid({ users }) {
    if (!users || users.length === 0) {
      return <p>No hay usuarios disponibles.</p>;
    }
    return (
      <>
        <table className="grid-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Ubicacion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.email}</td>
                  <td>{user.ciudad + ", " + user.pais}</td>
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


export default UserGrid;
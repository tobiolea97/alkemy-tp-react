

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
              const [nombre, apellido] = user.name.split(" ");
              return (
                <tr key={user.id}>
                  <td>{nombre || user.name}</td>
                  <td>{apellido || ""}</td>
                  <td>{user.email}</td>
                  <td>{user.address?.city}</td>
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
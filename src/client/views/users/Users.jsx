import './styles.css'
import '../../styles.css';

function Users() {
  return (
    <div className="view-main-container">
      <h2>Usuarios</h2>
      <table className="grid-table" style={{ margin: "2rem 0" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Ubicacion</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>jperez@mail.com</td>
            <td>Buenos Aires</td>
            <td>View | Edit | Delete</td>
          </tr>
          <tr>
            <td>Maria</td>
            <td>Gomez</td>
            <td>mgomez@mail.com</td>
            <td>Madrid</td>
            <td>View | Edit | Delete</td>
          </tr>
          <tr>
            <td>Pedro</td>
            <td>Lopez</td>
            <td>plopez@mail.com</td>
            <td>Ciudad de Mexico</td>
            <td>View | Edit | Delete</td>
          </tr>
        </tbody>
      </table>
      <div className="buttons-bar">
        <button className="btn btn-primary" style={{ margin: "1rem 0" }}>
          Crear
        </button>
      </div>
    </div>
  );
}

export default Users;

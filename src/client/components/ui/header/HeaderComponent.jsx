import { useNavigate } from "react-router-dom";
import './styles.css';

export const HeaderComponent = () => {
    const navigate = useNavigate();

    return (
      <>
        <header>
            <ul className="header-links">
              <li>
                <a onClick={() => navigate(`/home`)}>Inicio</a>
              </li>
              <li>|</li>
              <li>
                <a onClick={() => navigate("/users")}>Usuarios</a>
              </li>
              <li>|</li>
              <li>
                <a onClick={() => navigate("/products")}>Productos</a>
              </li>
            </ul>
        </header>
      </>
    );
}

export default HeaderComponent;
import "./styles.css";
import "../../styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserGrid from "../../components/users/UserGrid.jsx";
import TitleComponent from "../../components/layout/TitleComponent.jsx";
import ButtonComponent from "../../components/layout/ButtonComponent.jsx";
import CardBoard from "../../components/ui/cardboard/CardBoard.jsx";
import UserCard from "../../components/users/UserCard.jsx";
import SpinnerComponent from "../../components/ui/spinner/SpinnerComponent.jsx";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        setTimeout(() => {
          setUsers(response.data);
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error al cargar los usuarios.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="view-main-container">
      <TitleComponent>Usuarios</TitleComponent>
      {error && <div className="error-message">{error}</div>}
      <CardBoard>
        {isLoading && <SpinnerComponent />}
        {users.map((user) => (
          <UserCard key={user.email} user={user} />
        ))}
      </CardBoard>
      <div className="buttons-bar">
        <ButtonComponent text="Nuevo Usuario" buttonType="primary" />
      </div>
    </div>
  );
}

export default Users;

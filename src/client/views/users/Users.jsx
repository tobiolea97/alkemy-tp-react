import "./styles.css";
import "../../styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserGrid from "../../components/users/UserGrid.jsx";
import TitleComponent from "../../components/layout/TitleComponent.jsx";
import ButtonComponent from "../../components/layout/ButtonComponent.jsx";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="view-main-container">
      <TitleComponent>Usuarios</TitleComponent>
      <UserGrid users={users} />
      <div className="buttons-bar">
        <ButtonComponent text="Nuevo Usuario" buttonType="primary" />
      </div>
    </div>
  );
}

export default Users;

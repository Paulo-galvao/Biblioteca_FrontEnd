import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../context/UserContext";

const url_api = import.meta.env.VITE_API_URL;

function DestroyUser() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user_id } = useParams();
  console.log(user_id)
  const { data, fetchUser } = useContext(UserContext);
//   const userLogged = data.user;

  async function destroy(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${url_api}/users/${user_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        navigate("/dashboard");
        return;
      }

      localStorage.removeItem("token");
      fetchUser();
      alert(data.message);
      navigate("/");
      return;
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div>
      <form onSubmit={destroy}>
        <button className="cursor-pointer m-2" type="submit">
          Excluir Conta
        </button>
      </form>
    </div>
  );
}

export default DestroyUser;

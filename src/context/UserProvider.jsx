import { UserContext } from "./UserContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const url_api = import.meta.env.VITE_API_URL;

export function UserProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchUser() {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setData(null);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${url_api}/users/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Não autorizado");

      const data = await response.json();
      setData(data);
    } catch  {
      
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setData(null);
    navigate("/login");
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ data, fetchUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

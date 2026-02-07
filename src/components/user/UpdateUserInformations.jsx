import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import Error from "../../components/form/Error";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBorder from "../FormBorder";

const url_api = import.meta.env.VITE_API_URL;

const userSchema = z.object({
  username: z.string().nonempty("Preencha este campo"),
  email: z.email("Email inválido").nonempty("Preencha este campo"),
});

function UpdateUserInformations() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user_id } = useParams();
  const { data, fetchUser } = useContext(UserContext);
  const userLogged = data.user;
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  function onSubmit(data) {
    fetchApi(data);
  }

  async function fetchApi(body) {
    console.log(body);
    try {
      const response = await axios.patch(
        `${url_api}/users/${user_id}`,
        {
          ...body,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        },
      );

      
      alert(response.data.data.message);
      fetchUser();
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response.data.message;
      setError(errorMessage);
    }
  }

  
  return (
    <FormBorder title="Atualizar seus dados">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <Input
            label="Nome"
            register={register("username")}
            defaultValue={userLogged.username}
          />
          <Error errors={errors} name="username" ></Error>
        </div>

        <div className="relative">
          <Input
            label="Email"
            register={register("email")}
            defaultValue={userLogged.email}
          />
          <Error errors={errors} name="email" >{error}</Error>
        </div>

        <Button>Atualizar</Button>
      </form>
    </FormBorder>
  );
}

export default UpdateUserInformations;

import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import Error from "../../components/form/Error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import z from "zod";
import FormBorder from "../FormBorder";

const url_api = import.meta.env.VITE_API_URL;

const passwordSchema = z
  .object({
    oldPassword: z.string().nonempty("Preencha este campo"),
    password: z.string().nonempty("Preencha este campo"),
    passwordConfirmation: z.string().nonempty("Preencha este campo"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    error: "As senhas precisam ser iguais",
    path: ["passwordConfirmation"],
  });

function UpdateUserPassword() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user_id } = useParams();
  const { fetchUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  async function fetchApi(body) {
    try {
      const response = await axios.patch(
        `${url_api}/users/resetPassword/${user_id}`,
        {
          ...body,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data.message);
      alert(response.data.message);
      fetchUser();
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response.data.message;
      setError(errorMessage);
    }
  }

  function onSubmit(data) {
    fetchApi(data);
  }

  return (
    <FormBorder title="Atualizar sua senha">

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <Input
            label="Senha atual"
            type="password"
            register={register("oldPassword")}
          />
          <Error errors={errors} name="password">{error}</Error>
        </div>

        <div className="relative">
          <Input
            label="Nova senha"
            type="password"
            register={register("password")}
          />
          <Error errors={errors} name="password" />
        </div>

        <div className="relative">
          <Input
            label="Confirme a senha"
            type="password"
            register={register("passwordConfirmation")}
          />
          <Error errors={errors} name="passwordConfirmation" />
        </div>

        <Button>Atualizar</Button>
      </form>
    </FormBorder>
  );
}

export default UpdateUserPassword;

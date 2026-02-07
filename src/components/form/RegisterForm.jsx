import FormContainer from "./FormContainer";
import Button from "./Button";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../../schemas/userSchema";

const url_api = import.meta.env.VITE_API_URL;

function RegisterForm() {
  const navigate = useNavigate();
  const { fetchUser } = useContext(UserContext);


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
    const response = await fetch(`${url_api}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });


    const data = await response.json();
    
    if (!data.success) {
      alert(data.message);
      return;
    }


    localStorage.setItem("token", data.token);
    fetchUser();
    navigate("/dashboard");
    alert(data.message);
  }
  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="relative">
            <Input 
              label="Nome" 
              register={register("username")} />
            <p className="absolute -bottom-6 text-red-600">
              {errors.username?.message}
            </p>
          </div>

          <div className="relative">
            <Input 
              label="Email" 
              register={register("email")} />
            <p className="absolute -bottom-6 text-red-600">
              {errors.email?.message}
            </p>
          </div>

          <div className="relative">
            <Input
              label="Senha"
              
              type="password"
              register={register("password")}
            />
            <p className="absolute -bottom-6 text-red-600">
              {errors.password?.message}
            </p>
          </div>

          <div className="relative">
            <Input
              label="Confirme a sua senha"
              type="password"
              register={register("passwordConfirmation")}
            />
            <p className="absolute -bottom-6 text-red-600">
              {errors.passwordConfirmation?.message}
            </p>
          </div>

          <div>
            <Button>Registrar</Button>
          </div>
        </form>
      </FormContainer>
    </div>
  );
}

export default RegisterForm;

import FormContainer from "./FormContainer";
import Button from "./Button";
import Input from "./Input";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const url_api = import.meta.env.VITE_API_URL;

const loginSchema = z.object({
  email: z.string().nonempty("Preencha este campo"),
  password: z.string().nonempty("Preencha este campo"),
});

function LoginForm() {
  const navigate = useNavigate();
  const { fetchUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  function onSubmit(data) {
    fetchApi(data);
  }

  async function fetchApi(body) {
    const response = await fetch(url_api+"/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    
    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    fetchUser();
    alert(data.message);
    navigate("/dashboard");
  }

  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="relative">
            <Input 
              label="Email"                
              register={register("email")} />
            <p className="absolute -bottom-6 text-red-600">
              {errors.username?.message}
            </p>
          </div>

          <div className="relative">
            <Input
              label="Password"
              
              type="password"
              register={register("password")}
            />
            <p className="absolute -bottom-6 text-red-600">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <Button>Entrar</Button>
          </div>
        </form>
      </FormContainer>
    </div>
  );
}

export default LoginForm;

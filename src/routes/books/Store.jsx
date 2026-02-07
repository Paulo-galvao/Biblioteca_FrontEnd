import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import Error from "../../components/form/Error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bookSchema from "../../schemas/bookSchema";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { storeBook } from "../../services/book-store.service";
import DashPath from "../../components/dashboard/DashPath";
import FormBorder from "../../components/FormBorder";
import DashFrame from "../../components/dashboard/DashFrame";

function Store() {
  const navigate = useNavigate();
  const { fetchUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
  });

  function onSubmit(data) {
    storeBook(data);
    fetchUser();
    navigate("/dashboard");
  }

  return (
    <DashFrame>
      <DashPath path={"> Adicionar novo livro"} />
      <FormBorder title="Adicionar novo livro">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <Input label="Título" register={register("title")} />
            <Error errors={errors} name="title" />
          </div>

          <div className="relative">
            <Input label="Autor" register={register("written_by")} />
            <Error errors={errors} name="written_by" />
          </div>

          <div className="relative">
            <Input label="Descrição" register={register("description")} />
            <Error errors={errors} name="description" />
          </div>

          <div className="relative">
            <Input
              label="Data de publicação"
              register={register("first_published")}
            />
            <Error errors={errors} name="first_published" />
          </div>

          <div className="relative">
            <Input label="URL da imagem" register={register("url_img")} />
            <Error errors={errors} name="url_img" />
          </div>

          <Button>Enviar</Button>
        </form>
      </FormBorder>
    </DashFrame>
  );
}

export default Store;

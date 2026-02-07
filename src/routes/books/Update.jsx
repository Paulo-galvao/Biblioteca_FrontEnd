import { useParams, useNavigate } from "react-router";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import Error from "../../components/form/Error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bookSchema from "../../schemas/bookSchema";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { updateBook } from "../../services/book-update.service";
dayjs.extend(customParseFormat);

const url_api = import.meta.env.VITE_API_URL;

function Update() {
  const token = localStorage.getItem("token");
  const { book_id } = useParams();
  const navigate = useNavigate();
  const { data, fetchUser } = useContext(UserContext);
  const book = data.user.books.find((book) => book.id == book_id);
  const newDate = dayjs(book.first_published).format("DD/MM/YYYY");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
  });

  function onSubmit(data) {
    updateBook(data, book_id);
    fetchUser();
    navigate(-1);
  }

  async function destroy(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${url_api}/books/${book_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        navigate("/dashboard");
        return;
      }

      fetchUser();
      alert(data.message);
      navigate("/dashboard");
      return;
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <h2>Atualizar Livro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <Input
            label="Título"
            register={register("title")}
            defaultValue={book.title}
          />
          <Error errors={errors} name="title" />
        </div>

        <div className="relative">
          <Input
            label="Autor"
            register={register("written_by")}
            defaultValue={book.written_by}
          />
          <Error errors={errors} name="written_by" />
        </div>

        <div className="relative">
          <Input
            label="Descrição"
            register={register("description")}
            defaultValue={book.description}
          />
          <Error errors={errors} name="description" />
        </div>

        <div className="relative">
          <Input
            label="Data de publicação"
            register={register("first_published")}
            defaultValue={newDate}
          />
          <Error errors={errors} name="first_published" />
        </div>

        <div className="relative">
          <Input
            label="URL da imagem"
            register={register("url_img")}
            defaultValue={book.url_img}
          />
          <Error errors={errors} name="url_img" />
        </div>

        <Button>Enviar</Button>
      </form>

      <form onSubmit={destroy}>
        <button type="submit" className="cursor-pointer ">
          Excluir
        </button>
      </form>
    </div>
  );
}

export default Update;

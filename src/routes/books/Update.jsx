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
import DashFrame from "../../components/dashboard/DashFrame";
import TextArea from "../../components/form/TextArea";
dayjs.extend(customParseFormat);

function Update() {
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

  return (
    <div>
      <h2>Atualizar Livro</h2>
      <DashFrame>
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
            <TextArea 
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
      </DashFrame>
    </div>
  );
}

export default Update;

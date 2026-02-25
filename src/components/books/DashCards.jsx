import { NavLink } from "react-router";
import DashCardButton from "./DashCardButton";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const api_url = import.meta.env.VITE_API_URL;


function DashCards({ userBooks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const { fetchUser } = useContext(UserContext);

    async function destroyBook(book_id) {
        try {
            const response = await axios.delete(`${api_url}/books/${book_id}`, 
                {headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }}
            )

            fetchUser();
            setIsOpen(false);
            
        } catch (error) {
            setIsOpen(false);
            setError(error.message);
            console.log(error.message);

        }
    }

  return (
    <div className="flex flex-col">
        {error}
      {userBooks.map((book) => (
        <div key={book.id} className="m-2 border border-gray-400 p-1 text-sm">
          <p className="font-semibold text-[16px]">{book.title}</p>
          <p className="text-gray-900 mb-2">{book.written_by}</p>
          <div className="flex flex-col gap-2">
            <DashCardButton option="edit">
              <NavLink to={`/books/update/${book.id}`}>Editar</NavLink>
            </DashCardButton>
            <DashCardButton onClick={() => setIsOpen(true)} option="destroy">
              Excluir
            </DashCardButton>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50"
            >
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                  <DialogTitle className="font-bold">
                    Remover Postagem
                  </DialogTitle>
                  <p>
                    Tem certeza que deseja remover permanentemente esse livro da coleção?
                  </p>
                  <div className="flex gap-4">
                    <button className="cursor-pointer" onClick={() => setIsOpen(false)}>Cancelar</button>
                    <button className="cursor-pointer" onClick={() => destroyBook(book.id)}>Quero Excluir</button>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashCards;

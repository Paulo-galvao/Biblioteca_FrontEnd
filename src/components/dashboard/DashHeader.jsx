import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CgProfile } from "react-icons/cg";
import DashButton from "../../components/dashboard/DashButton";

function DashHeader() {
  const { data, logout } = useContext(UserContext);
  const userLogged = data.user;
  return (
    <header className="flex flex-col items-center border border-gray-400 p-4 text-gray-600">
      <div className="flex  items-center gap-2 mb-2 border-b border-gray-400 pb-4">
        <CgProfile className="text-7xl " />
        <div className="text-black ">Olá {userLogged.username}!</div>
      </div>

      <nav className="flex flex-col ">
        <DashButton route={`/users/update/${userLogged.id}`}>
          Atualizar seus dados
        </DashButton>
        <DashButton route={"/books/store"}>Adicionar novo item</DashButton>
        <DashButton route={`/users/${userLogged.id}/posts/`}>
          Suas postagens
        </DashButton>
        <button
          onClick={logout}
          className="cursor-pointer my-1.5 hover:text-gray-800 hover:underline text-sm"
        >
          Sair
        </button>
      </nav>
    </header>
  );
}

export default DashHeader;

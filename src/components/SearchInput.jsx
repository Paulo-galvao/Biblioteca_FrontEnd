import { useState } from "react";
import { useNavigate } from "react-router";

function SearchInput() {
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      setError("Por favor digite algum valor de pesquisa");
      return;
    }
    navigate(`/search/books?title=${query}`);
  }

  return (
    <div className="sm:flex justify-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o título de um livro aqui para buscá-lo"
          className="border w-full my-2 px-4 py-2 outline-0 rounded-2xl sm:w-120 "
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={() => setError(null)}
        />
        <span>{error && error}</span>
      </form>
    </div>
  );
}

export default SearchInput;

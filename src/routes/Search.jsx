import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { searchBook } from "../services/search.service";

function Search() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");
  
  useEffect(() => {
    async function getBooks() {
        try {
            const data = await searchBook(title);
            setBooks(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    getBooks();
  }, [title]);
  
  if (loading) return <p>...</p>;
  if (error) return <p>{error}</p>;
  if(books.length === 0) return <div>Nenhum resultado encotrado</div>

  return (
    <div>
      
      <h2>Resultados encontrados</h2>
      {books.map((book) => (
        <>
          <p>{book.title}</p>
          <p>{book.written_by}</p>
        </>
      ))}
      <div>{console.log(books)}</div>
    </div>
  );
}
export default Search;

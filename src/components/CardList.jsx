import { NavLink } from "react-router";
import Rate from "./Rate";
import { useEffect, useState } from "react";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

function Card({ title, path }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchApi() {
    try {
      const response = await axios.get(`${api_url}/books/${path}`);
      setBooks(response.data.data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  });

  if (loading) return <p>...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
        <h2 className="">{title}</h2>
        <div className="flex gap-2 md:grid grid-cols-5 overflow-x-scroll ">
        {books.map((book) => (
            <div key={book.id} className="min-w-25 h-62.5">
            <NavLink to={`/books/${book.id}`}>
                <img src={book.url_img} alt={book.title} className="h-35 " />
                <p className="h-12.5 overflow-y-hidden border-b border-blue-900 ">
                {book.title}
                </p>
                <p className="text-gray-800 text-sm">{book.written_by}</p>
                <Rate rate={book.rate} />
            </NavLink>
            </div>
        ))}
        </div>
        <div>

        
      </div>
    </div>
  );
}

export default Card;

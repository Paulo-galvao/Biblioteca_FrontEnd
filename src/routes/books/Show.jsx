import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const api_url = import.meta.env.VITE_API_URL;

function Show() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rated, setRated] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(0);
  const { data } = useContext(UserContext);
  const navigate = useNavigate();

  
  async function show(id) {
    try {
      const response = await axios.get(`${api_url}/books/${id}`);
      
      
      const book = response.data.data[0];
      setBook(book);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function rate(value) {
    try {
      if(!data) {
        navigate("/login"); 
        return;
      }
      
      const body = {
        rate: value * 10
      }
      
      const response = await axios.post(
        `${api_url}/rates/${book.id}`, body, {        
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      setRated("Avaliado com sucesso");


    } catch (error) {
      console.log(error.response.data[0].message);
      setRated(error.response.data[0].message);
    }
  }

  useEffect(() => {
    show(id);
  }, [id]);

  

  if (loading) return <p>...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mx-2">
      <img className="max-w-50 mx-auto mt-10" src={book.url_img} alt="" />
      <h2 className="text-center mt-4 text-2xl font-bold">{book.title}</h2>
      <p className="text-center text-[1.1rem] ">{book.written_by}</p>
      <p>Lançamento: {dayjs(book.first_published).format("DD/MM/YYYY")}</p>
      <div>
        <p>Avaliar</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => rate(star)}
              className="cursor-pointer text-2xl transition-colors"
            >
              <FaStar
                className={`text-2xl cursor-pointer transition-colors
                ${star <= hoveredStar ? "text-yellow-400" : "text-gray-300"}`}
              />
            </span>
          ))}
        </div>
        <span>{rated}</span>
      </div>
      <p>{book.description}</p>
    </div>
  );
}

export default Show;

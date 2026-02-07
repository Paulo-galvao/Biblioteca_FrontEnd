import { NavLink, useLocation } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { MdMenuBook } from 'react-icons/md';
import { FaUserAlt } from "react-icons/fa";




import { CiSearch } from "react-icons/ci";



function Header() {
  const { pathname } = useLocation();
  const hiddenRoutes = ["/login", "/register"];
  const { data } = useContext(UserContext);

  return (
    <>
      {
        !hiddenRoutes.includes(pathname) && (
        <header className="flex justify-between items-center border-b h-16">
          <NavLink className="p-2" to="/">
            <MdMenuBook className="text-[2rem] text-blue-900"/>
          </NavLink>
          {data? (<span className="p-2">
            <NavLink to="/dashboard" className='flex items-center gap-2'>
              <FaUserAlt />{data.user.username}
            </NavLink>
            </span>) : (
            <div>
              <NavLink className="p-2" to="/register">
                Crie sua conta
              </NavLink>
              <NavLink className="p-2" to="/login">
                Login
              </NavLink>
            </div>
          )}
        </header> 
        ) 
      } 
    </>
  );
}

export default Header;

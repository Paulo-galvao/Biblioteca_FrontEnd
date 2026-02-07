import { NavLink } from "react-router";

function DashButton({ children, route }) {
  return (
    <button className="my-1.5 hover:text-gray-800 hover:underline text-sm">
      <NavLink to={route}>
        { children }
      </NavLink>
    </button>
  );
}

export default DashButton;

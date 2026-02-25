function DashCardButton({ option, children, onClick }) {
  let buttonColor;
  if (option === "edit") {
    buttonColor = "bg-indigo-600 hover:bg-indigo-500";
  } else {
    buttonColor = "bg-red-800 hover:bg-red-700";
  }
  return (
    <button onClick={onClick}
      className={`${buttonColor}  flex cursor-pointer w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-xs  `}
    >
      {children}
    </button>
  );
}

export default DashCardButton;

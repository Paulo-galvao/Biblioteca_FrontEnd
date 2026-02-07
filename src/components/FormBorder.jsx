
function FormBorder({ children, title }) {
  return (
    <div className="border border-gray-400 p-2 m-4 text-sm">
      <h2 className="text-[18px] mb-4">{title}</h2>
      { children }
    </div>
  )
}

export default FormBorder;

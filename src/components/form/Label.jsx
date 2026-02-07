function Label(props) {
  return (
    <label htmlFor={props.for} className="block mb-1">
        {props.children}
    </label>
  )
}
export default Label

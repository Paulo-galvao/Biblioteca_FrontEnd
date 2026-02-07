function Input({ label, type, placeholder, defaultValue, register }) {
  return (
    <div className="text-sm">
      <label className="block mb-1">
        {label}
      </label>
      <input
        className="block w-full rounded-md px-3 py-1.5 mb-6  text-gray-900 outline-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:max-w-100"
        type={type || "text"}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register}
      />
      
    </div>
  );
}

export default Input;

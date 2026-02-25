function TextArea({ label, placeholder, defaultValue, register }) {
  return (
    <div>
      <label className="block mb-1" htmlFor="description">
        { label }
      </label>
      <textarea
        className="block w-full rounded-md px-3 py-1.5 mb-6 min-h-25 text-gray-900 outline-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:max-w-100"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register}
      />
    </div>
  );
}

export default TextArea;

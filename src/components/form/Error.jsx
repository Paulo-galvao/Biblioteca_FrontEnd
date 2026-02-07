import React from "react";

function Error({ errors, name, children }) {
  return (
    <p className="absolute -bottom-6 text-red-600 text-sm">
        {errors[name]?.message}
        {children}
    </p>
  );
}

export default Error;

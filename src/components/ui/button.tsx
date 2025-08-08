import * as React from "react";

export function Button({ children, onClick, className, ...props }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

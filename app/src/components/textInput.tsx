import React, { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  styles?: string;
  error?: string | undefined;
}
export const TextInput: React.FC<TextInputProps> = ({
  labelText,
  styles,
  error,
  ...inputProps
}) => {
  return (
    <span className="flex flex-col mb-2">
      <label htmlFor="" className="text-sm font-medium text-gray-900">
        {labelText}
      </label>
      <input
        className={`border border-500 focus:outline-none px-4 py-3 rounded-md mb-4 ${styles}`}
        {...inputProps}
      />
      {error && (
        <p className="text-red-500 font-medium text-sm -mt-4">{error}</p>
      )}
    </span>
  );
};

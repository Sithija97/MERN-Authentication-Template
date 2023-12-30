import React, { MouseEvent } from "react";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const SignInWithGoogle: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center gap-2 w-full px-1.5 py-2 bg-white text-gray-900 rounded-lg border border-gray-200"
      onClick={onClick}
      type="button"
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <p className="font-semibold">Sign in with Google </p>
    </button>
  );
};

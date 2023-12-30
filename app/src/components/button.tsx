import React, { ReactNode, MouseEvent } from "react";

type ButtonProps = {
  title: string;
  styles?: string;
  iconRight?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
};

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-4 border-t-4 border-t-blue-700" />
    </div>
  );
};

export const Button: React.FC<ButtonProps> = ({
  title,
  styles = "",
  iconRight,
  type = "button",
  onClick,
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full px-1.5 py-2 bg-blue-700 rounded-lg text-white ${styles}`}
      disabled={loading}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <p className="font-semibold">{title}</p>
          {iconRight && <div className="ml-2">{iconRight}</div>}
        </>
      )}
    </button>
  );
};

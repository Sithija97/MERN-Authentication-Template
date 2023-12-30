type IProps = {
  name: string;
  imgUrl?: string | null;
  styles?: string;
  onClick?: () => void;
};

export const Avatar = ({ name, imgUrl = null, styles, onClick }: IProps) => {
  const initials = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-300 ${styles}`}
    >
      {imgUrl ? (
        <img
          className="w-full h-full object-cover rounded-full"
          src={`${imgUrl}`}
          alt={`${name}'s Profile`}
          onClick={onClick}
        />
      ) : (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-gray-500 font-semibold text-white leading-none cursor-pointer ${styles}`}
          onClick={onClick}
        >
          {initials}
        </span>
      )}
    </div>
  );
};

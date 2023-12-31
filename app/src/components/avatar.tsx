type IProps = {
  name: string | undefined;
  imgUrl?: string | null;
  styles?: string;
  onClick?: () => void;
};

export const Avatar = ({ name, imgUrl = null, styles, onClick }: IProps) => {
  const initials = name ? name.charAt(0).toUpperCase() : "";

  const getColor = (name: string): string => {
    const colors = [
      "bg-teal-500",
      "bg-indigo-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-gray-500",
    ];
    // Use a simple hashing function to select a color based on the name
    const hashCode = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = hashCode % colors.length;
    return colors[colorIndex];
  };

  const bgColor = getColor(name!);

  return (
    <div
      className={`flex items-center justify-center rounded-full ${bgColor} `}
    >
      {imgUrl ? (
        <img
          className={`object-cover rounded-full ${styles}`}
          src={imgUrl}
          alt={`${name}'s Profile`}
          onClick={onClick}
        />
      ) : (
        <span
          className={`inline-flex items-center justify-center rounded-full text-white font-semibold leading-none cursor-pointer text-xl ${styles}`}
          onClick={onClick}
        >
          {initials}
        </span>
      )}
    </div>
  );
};

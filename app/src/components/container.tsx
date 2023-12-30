type IProps = {
  bgColor: string;
  title: string;
  titleColor: string;
  subtitle: string;
  subtitleColor: string;
};

export const Container = ({
  bgColor,
  title,
  titleColor,
  subtitle,
  subtitleColor,
}: IProps) => {
  return (
    <div className={`${bgColor} p-4 flex flex-col items-center rounded-lg`}>
      <p className={`leading-tight text-3xl font-extrabold ${titleColor}`}>
        {title}
      </p>
      <p className={`text-base font-normal ${subtitleColor}`}>{subtitle}</p>
    </div>
  );
};

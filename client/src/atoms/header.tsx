type IProps = {
  title: string;
};

export const Header = ({ title }: IProps) => {
  return (
    <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
      {title}
    </h4>
  );
};

import clsx from "clsx";
import LogoIcon from "./icons/logo";

interface CircleProps {
  isActive?: boolean;
}

const Circle: React.FC<CircleProps> = ({ isActive }) => {
  return (
    <div
      className={clsx(
        "w-10 h-10 flex items-center justify-center rounded-full border-4",
        isActive ? "border-blue-500 bg-blue-500" : "border-black "
      )}
    >
      <LogoIcon
        className={clsx({
          "h-[16px] w-[16px]": isActive,
          "h-[10px] w-[10px]": !isActive
        })}
      />
    </div>
  );
};

export default Circle;
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
        isActive ? "border-blue-500" : "border-green-600 bg-blue-600"
      )}
    >
      <LogoIcon
        className={clsx({
          "h-[16px] w-[16px]": 
          "h-[10px] w-[10px]"
        })}
      />
    </div>
  );
};

export default Circle;
import clsx from "clsx";
import LogoIcon from "./icons/logo";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center border bg-white",
        {
          "h-[36px] w-[36px] rounded-xl": !size,
          "h-[10px] w-[10px] rounded-xl": size === "sm",
        }
      )}
    >
      <LogoIcon
        className={clsx({
          "h-[16px] w-[16px]": !size,
          "h-[10px] w-[10px]": size === "sm",
        })}
      />
    </div>
  );
}
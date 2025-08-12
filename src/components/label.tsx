import clsx from "clsx";
import Price from "./price";

export default function Label({
  // title,
  // amount,
  currencyCode,
  position = "bottom",
}: {
  // title: string;
  // amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 srccontainer/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        }
      )}
    >
      <div className="">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none font-extrabold font-mono tracking-tight">
          {/* {title} */}
        </h3>
        {/* <Price
          className="flex-none rounded-full bg-white p-1 text-xl text-black font-bold font-mono"
          // amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden src[275px]/label:inline"
        /> */}
      </div>
    </div>
  );
}
interface Props {
  selected: boolean;
  title: string;
}

export const TabFilterSelector = ({ selected, title }: Props) => {
  return (
    <button
      className={`px-7 py-3 whitespace-nowrap ${
        selected ? "text-custom-text font-bold" : ""
      }`}
    >
      <p className="relative flex">
        {title}
        <span
          className={`bottom-[-20px] bg-custom-alternative rounded-full w-full h-[5px] transition-all ${
            selected ? "absolute" : "hidden"
          }`}
        ></span>
      </p>
    </button>
  );
};

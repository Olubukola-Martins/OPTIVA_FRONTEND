import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { simpleCardProps } from "src/types";

export const SimpleCard = ({
  title,
  count,
  cardColor,
  icon,
  link = false,
  linkPath = "",
}: simpleCardProps) => {
  // Define a color mapping
  const colorMap: Record<string, string> = {
    blue: "var(--card-blue)",
    green: "var(--card-green)",
    yellow: "var(--card-yellow)",
    oxblood: "var(--card-oxblood)",
  };

  // Get the selected color from the mapping
  const selectedColor = colorMap[cardColor];

  return (
    <Link
      to={link ? linkPath : "#"}
      className={` ${
        link ? "cursor-pointer" : "cursor-text"
      } border border-${cardColor}-600 rounded-lg py-3 px-3 relative`}
      style={{ borderColor: selectedColor }}
    >
      <div className="flex gap-x-4">
        <div
          className={`bg-${cardColor}-600 rounded-full h-8 w-8 flex justify-center items-center`}
          style={{ backgroundColor: selectedColor }}
        >
          <Icon icon={icon} className="text-xl text-white" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-accent text-sm pb-12">{title}</h3>
          <h2 className="font-bold text-2xl flex-end absolute bottom-0">
            {count}
          </h2>
        </div>
      </div>
    </Link>
  );
};

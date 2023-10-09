import { Icon } from "@iconify/react";
import { simpleCardProps } from "src/types";

export const SimpleCard = ({
  title,
  count,
  cardColor,
  icon,
}: simpleCardProps) => {
  // Define a color mapping
  const colorMap: Record<string, string> = {
    blue: "#012168",
    green: "#28A745",
    yellow: "#FF9500",
    oxblood: "#801D23",
  };

  // Get the selected color from the mapping
  const selectedColor = colorMap[cardColor];

  return (
    <div
      className={`border border-${cardColor}-600 rounded-lg py-2 px-3 relative`}
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
          <h2 className="font-bold text-2xl flex-end absolute bottom-0">{count}</h2>
        </div>
      </div>
    </div>
  );
};

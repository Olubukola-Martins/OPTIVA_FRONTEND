import { Icon } from "@iconify/react";

export interface simpleCardProps {
  title: string;
  count: number;
  cardColor: "blue" | "green" | "yellow" | "oxblood";
  icon: string;
}

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
      className={`border border-${cardColor}-600 rounded-md py-2 px-3`}
      style={{ borderColor: selectedColor }}
    >
      <div className="flex items-start gap-x-4">
        <div
          className={`bg-${cardColor}-600 rounded-full h-8 w-8 flex justify-center items-center`}
          style={{ backgroundColor: selectedColor }}
        >
          <Icon icon={icon} className="text-xl text-white" />
        </div>
        <div>
          <h3 className="font-medium text-accent">{title}</h3>
          <h2 className="font-bold text-2xl pt-3">{count}</h2>
        </div>
      </div>
    </div>
  );
};

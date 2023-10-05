import { Icon } from "@iconify/react";

// interface simpleCardProps {
//   title: string;
//   figure: number;
//   cardColor: string;
//   icon: string;
// }

export const SimpleCard = () => {
  return (
    <div className="border rounded-md py-2 px-3">
      <div className="flex items-center gap-x-4">
        <div className="bg-blue-600 rounded-full h-8 w-8 flex justify-center items-center">
          <Icon icon="ph:user-list-duotone" className="text-xl text-white" />
        </div>
        <h3 className="font-medium text-accent">Total payment made</h3>
      </div>
      <h2 className="font-extrabold text-2xl pt-3">0</h2>
    </div>
  );
};

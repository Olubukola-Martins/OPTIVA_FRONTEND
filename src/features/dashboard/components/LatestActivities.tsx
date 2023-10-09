import { Icon } from "@iconify/react";
import { AppButton } from "src/components/button/AppButton";

export const LatestActivities = () => {
  return (
    <div className="rounded shadow-sm border p-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <i className="ri-play-fill text-lg"></i>
          <span className="text-sm">Latest Activities</span>
        </div>

        <AppButton variant="transparent" label="View more" />
      </div>
    </div>
  );
};

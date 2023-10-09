import React from "react";
import { AppButton } from "src/components/button/AppButton";

export const AppStatus = () => {
  return (
    <div className="rounded shadow-sm border p-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Application status</h4>
        <AppButton variant="transparent" label="This month" />
      </div>
    </div>
  );
};

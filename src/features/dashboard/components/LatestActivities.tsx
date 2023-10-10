import { Icon } from "@iconify/react";
import { Tabs } from "antd";
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

      <Tabs
        defaultActiveKey="1"
        className="mt-2"
        size="small"
        items={[
          {
            key: "1",
            label: "All",
            children: "Content of Tab Pane 1",
          },
          {
            key: "2",
            label: "1 hour ago",
            children: "Content of Tab Pane 2",
          },
          {
            key: "3",
            label: "10 hours ago",
            children: "Content of Tab Pane 3",
          },
          {
            key: "4",
            label: "24 hours ago",
            children: "Content of Tab Pane 4",
          },
        ]}
      />
    </div>
  );
};

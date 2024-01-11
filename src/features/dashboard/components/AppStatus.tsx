import { Progress } from "antd";
import { AppButton } from "src/components/button/AppButton";

export const AppStatus = () => {
  return (
    <div className="rounded shadow-sm border p-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Application status</h4>
        <AppButton variant="transparent" label="This month" />
      </div>

      <Progress
        type="circle"
        percent={75}
        format={(percent) => (
          <div>
            <span>{percent}</span>
            <span className="block">Good</span>
          </div>
        )}
      />
    </div>
  );
};

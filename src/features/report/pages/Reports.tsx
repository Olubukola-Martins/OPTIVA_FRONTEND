import { Icon } from "@iconify/react/dist/iconify.js";
import { DatePicker, Select } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";

const reportOptions = [
  { label: "Admin Activity", value: "Admin Activity" },
  { label: "CBI Application Reports", value: "CBI Application Reports" },
  { label: "Applicant Status Overview", value: "Applicant Status Overview" },
  { label: "Applicant Interactions", value: "Applicant Interactions" },
  { label: "Applicant Demographics", value: "Applicant Demographics" },
  { label: "Document Uploaded Status", value: "Document Uploaded Status" },
  { label: "Applicant Type Breakdown", value: "Applicant Type Breakdown" },
  { label: "Processing Times", value: "Processing Times" },
];

const Reports = () => {
  const { RangePicker } = DatePicker;

  return (
    <>
      <div className="flex flex-row justify-between">
        <PageIntro
          title="Report"
          linkBack={appRoute.reports}
          description={`Hello Ruth! Welcome to your dashboard `}
        />

        <Icon
          icon="mdi:file-send-outline"
          width={120}
          height={30}
          className=" place-self-center"
        />
          </div>
          
      <div className="border-2 rounded-md py-3 px-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <Select
              placeholder="Select Report"
              style={{ width: 200 }}
              defaultValue={{
                label: "Admin Activity",
                value: "Admin Activity",
              }}
              options={reportOptions}
            />
            <Icon
              icon="icon-park:chart-line"
              width={24}
              height={24}
              className=" place-self-center"
            />
          </div>
          <div className="flex flex-row gap-2">
            <Select placeholder="Lagos Branch" />
            <RangePicker style={{ width: 300 }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;

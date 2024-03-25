import { Icon } from "@iconify/react/dist/iconify.js";
import { DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import AdminActivity from "../components/AdminActivity";
import CBIApplication from "../components/CBIApplication";
import ApplicantStatusOverview from "../components/ApplicantStatusOverview";
import ApplicantInteractions from "../components/ApplicantInteractions";
import ApplicantDemographics from "../components/ApplicantDemographics";
import DocumentReviewStatus from "../components/DocumentReviewStatus";
import ApplicantTypeBreakdown from "../components/ApplicantTypeBreakdown";
import ProcessingTimes from "../components/ProcessingTimes";
import { Tooltip } from "antd";
// import { useGetUserInfo } from "src/hooks/useGetUserInfo";

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
  const [report, setReport] = useState<string>("Admin Activity");
  const [displayTable, setdisplayTable] = useState(true);
  const [changeIcon, setChangeIcon] = useState<
    "icon-park:chart-line" | "tabler:table"
  >("icon-park:chart-line");

  const allReports: Record<string, React.ReactNode> = {
    "Admin Activity": <AdminActivity displayTable={displayTable} />,
    "CBI Application Reports": <CBIApplication displayTable={displayTable} />,
    "Applicant Status Overview": (
      <ApplicantStatusOverview displayTable={displayTable} />
    ),
    "Applicant Interactions": (
      <ApplicantInteractions displayTable={displayTable} />
    ),
    "Applicant Demographics": <ApplicantDemographics />,
    "Document Uploaded Status": (
      <DocumentReviewStatus displayTable={displayTable} />
    ),
    "Applicant Type Breakdown": <ApplicantTypeBreakdown />,
    "Processing Times": <ProcessingTimes />,
  };

  const [selectedReport, setSelectedReport] = useState<React.ReactNode>(
    <AdminActivity displayTable={displayTable} />
  );
  const handleSelectReports = (value: string) => {
    const selectedItem = allReports[value];
    setSelectedReport(selectedItem);
    setReport(value);
  };
  const handleChangeIcon = () => {
    if (changeIcon === "icon-park:chart-line") {
      setChangeIcon("tabler:table");
      setdisplayTable(false);
    } else {
      setChangeIcon("icon-park:chart-line");
      setdisplayTable(true);
    }
    setSelectedReport(<div></div>);
  };

  useEffect(() => {
    setSelectedReport(allReports[report]);
  }, [changeIcon]);

  // const { userInfo } = useGetUserInfo();
  // console.log("user",userInfo)
  return (
    <>
      <div className="flex flex-row justify-between">
        <PageIntro
          title="Report"
          description={`Hello Ruth! Welcome to your dashboard `}
          arrowBack={false}
        />

        <Icon
          icon="mdi:file-send-outline"
          width={120}
          height={30}
          className=" place-self-center"
        />
      </div>

      <div className="border-2 rounded-md  pb-3 pt-4 md:pt-8">
        <div className="flex flex-col sm:flex-row justify-between mb-5  px-4">
          <div className="flex place-self-start pb-2 sm:pb-0 flex-row-reverse sm:flex-row gap-4">
            <Select
              placeholder="Select Report"
              className="place-self-center"
              style={{ width: 200 }}
              defaultValue={"Admin Activity"}
              options={reportOptions}
              onChange={handleSelectReports}
            />
            <Tooltip
              color="rgba(1, 33, 104, 1)"
              title={`${
                changeIcon === "icon-park:chart-line"
                  ? "Click to view the report in a chart presentation"
                  : "Click to access the report in a tabular format"
              }`}
            >
              <Icon
                icon={
                  report === "Processing Times" ||
                  report === "Applicant Demographics" ||
                  report === "Applicant Type Breakdown"
                    ? ""
                    : changeIcon
                }
                width={24}
                height={24}
                className={` place-self-center`}
                onClick={handleChangeIcon}
              />
            </Tooltip>
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <Select
              placeholder="Lagos Branch"
              style={{ width: 300, maxWidth: "80vw" }}
              options={[
                { value: "LagosBranch", label: "Lagos Branch" },
                { value: "AbujaBranch", label: "Abuja Branch" },
              ]}
            />
            <RangePicker
              style={{ width: 300, maxWidth: "80vw" }}
              popupStyle={{
                height: "300px",
                width: "fit",
                maxWidth: "290px",
              }}
            />
          </div>
        </div>

        <div>{selectedReport}</div>
      </div>
    </>
  );
};

export default Reports;

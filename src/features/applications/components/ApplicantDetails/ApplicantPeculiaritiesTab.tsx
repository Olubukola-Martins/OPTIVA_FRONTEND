import { Tabs } from "antd";
import { ImmigrationAndCourtProceedings } from "./ImmigrationAndCourtProceedings";
import { CriminalHistory } from "./CriminalHistory";

export const ApplicantPeculiaritiesTab = () => {
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      children: <ImmigrationAndCourtProceedings />,
      label: "Immigration And Court Proceedings",
      key: "Immigration And Court Proceedings",
    },
    {
      children: <CriminalHistory />,
      label: "Criminal History",
      key: "Criminal History",
    },
  ];
  return (
    <>
      <Tabs items={tabItems} />
    </>
  );
};

import { Tabs } from "antd";
import { NewImmigrationAndCourtProceedings } from "./NewImmigrationAndCourtProceedings";
import { NewCriminalHistory } from "./NewCriminalHistory";

export const NewApplicantPeculiaritiesTab = () => {
  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[] = [
    {
      children: <NewImmigrationAndCourtProceedings />,
      label: "Immigration And Court Proceedings",
      key: "Immigration And Court Proceedings",
    },
    {
      children: <NewCriminalHistory />,
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

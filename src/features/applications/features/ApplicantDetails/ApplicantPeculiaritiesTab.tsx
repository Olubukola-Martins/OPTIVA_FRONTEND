import { Form, Tabs } from "antd";
import { ImmigrationAndCourtProceedings } from "./ImmigrationAndCourtProceedings";
import { CriminalHistory } from "./CriminalHistory";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";

export const ApplicantPeculiaritiesTab = () => {
  
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { id } = useParams();
  const { data, } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectionthreeresponse",
  });

  console.log('data', data)

  const [form] = Form.useForm();
  useEffect(() => {
    if (data && data.length > 0) {
      const initialValues: Record<string, any> = {};
      data.forEach((item) => {
        if (item.subsection_name === tabItems[currentTab].subsectionName) {
          initialValues[item.question.schema_name] = item.response;
        }
      });
      form.setFieldsValue(initialValues);
    }
  }, [data, currentTab]);

  const tabItems: {
    label: string;
    children: React.ReactNode;
    key: string;
    subsectionName: string;
  }[] = [
    {
      children: (
        <ImmigrationAndCourtProceedings
          onNextTabItem={() => setCurrentTab(currentTab + 1)}
          subsectionName="immigrationCourtProcedings"
        />
      ),
      subsectionName: "immigrationCourtProcedings",
      label: "Immigration And Court Proceedings",
      key: "Immigration And Court Proceedings",
    },
    {
      children: (
        <CriminalHistory
        onPrev={() => setCurrentTab(currentTab - 1)}
          subsectionName="criminalHistory"
        />
      ),
      label: "Criminal History",
      key: "Criminal History",
      subsectionName: "criminalHistory",
    },
  ];
  return (
    <>
       <Form form={form} layout="vertical" >
      <Tabs
        tabBarStyle={{ maxWidth: "1200px" }}
        activeKey={currentTab.toString()}
        onChange={(key) => setCurrentTab(Number(key))}
        tabBarGutter={15}
        
      >
        {tabItems.map((tab, index) => (
          <Tabs.TabPane tab={tab.label} key={index.toString()}>
            {tab.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Form>
    </>
  );
};

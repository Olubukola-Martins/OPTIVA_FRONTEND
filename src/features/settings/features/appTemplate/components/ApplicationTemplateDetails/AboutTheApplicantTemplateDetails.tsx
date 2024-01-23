import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  useGetSingleQuestion,
} from "../../hooks/useGetTemplateQuestion";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";
import { Empty, List } from "antd";
import { showInputName } from "./ApplicantBriefTemplateDetails";

export const showSubsectionName = (subSection: string) => {
  if (subSection === "personalDetails") {
    return "Personal Details";
  } else if (subSection === "contactDetails") {
    return "Contact Details";
  } else if (subSection === "marriageDetails") {
    return "Marriage Details";
  } else if (subSection === "childrenDetails") {
    return "Children Details";
  } else if (subSection === "otherDependentsDetails") {
    return "Other Dependents Details";
  } else if (subSection === "PEP") {
    return "PEP";
  } else if (subSection === "employmentDetails") {
    return "Employment Details";
  } else if (subSection === "businessIncomeNetworth") {
    return "Business Income Networth";
  } else if (subSection === "academicHistory") {
    return "Academic History";
  } else if (subSection === "travelDetails") {
    return "Travel Details";
  } else if (subSection === "immigrationCourtProcedings") {
    return "Immigration Court Procedings";
  } else if (subSection === "criminalHistory") {
    return "Criminal History";
  }
};

export const AboutTheApplicantTemplateDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-two",
  });

  const { removeData } = useDelete({
    EndPointUrl: "admin/templates/section-two/",
    queryKey: QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  });
  const [showDeleteModalForItem, setShowDeleteModalForItem] = useState<
    number | null
  >(null);

  return (
    <>
      {data?.length === 0 ? (
        <Empty description="No questions has been created for this section" />
      ) : (
        <List itemLayout="vertical" loading={isLoading}>
          {data?.map((item) => (
            <List.Item key={item.id}>
              <div className="flex justify-between items-center">
                <div className="my-3 p-2">
                  <p className="py-2 text-base">
                  <span className="font-medium">Question:</span>{" "}
                    {item.form_question.charAt(0).toUpperCase() +
                      item.form_question.slice(1)}
                  </p>
                  <p className="py-2 text-base">
                    <span className="font-medium">Input type:</span>
                    {showInputName(item.input_type)}
                  </p>
                  <p className="py-2 text-base">
                    <span className="font-medium">Sub-section:</span>
                    {showSubsectionName(item.subsection_name)}
                  </p>
                </div>
                <div className="flex justify-end  w-[5%]">
                  <i
                    className="ri-delete-bin-line text-xl cursor-pointer mt-10"
                    onClick={() => setShowDeleteModalForItem(item.id)}
                  ></i>
                </div>
              </div>
              {showDeleteModalForItem === item.id && (
                <DeleteModal
                  header="question"
                  text="question"
                  onCancel={() => setShowDeleteModalForItem(null)}
                  open={showDeleteModalForItem !== null}
                  onDelete={() => removeData(item.id)}
                />
              )}
            </List.Item>
          ))}
        </List>
      )}

      {/* <Tabs
          activeKey={currentTab.toString()}
          onChange={(key) => setCurrentTab(Number(key))}
          // className="w-[80%]"
        >
          {tabItems.map((tab, index) => (
            <Tabs.TabPane tab={tab.label} key={index.toString()}>
              {tab.children}
            </Tabs.TabPane>
          ))}
        </Tabs> */}
    </>
  );
};

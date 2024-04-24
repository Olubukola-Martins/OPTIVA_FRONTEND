import { Form, Tabs } from "antd";
import { ImmigrationAndCourtProceedings } from "./ImmigrationAndCourtProceedings";
import { CriminalHistory } from "./CriminalHistory";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
// import { ICreateApplicationResponse, Response } from "../../types/types";
import { AppButton } from "src/components/button/AppButton";
import { IApplicantDetailsProps } from "./ApplicantBrief";

export const ApplicantPeculiaritiesTab: React.FC<IApplicantDetailsProps> = ({
  onNext,
  onPrev,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { id } = useParams();

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateApplicationResponse(
    "sectionthreeresponse"
  );

  const handleTabSubmit = (val: any[]) => {
    // const applicationData: ICreateApplicationResponse = {
    //   application_id: applicationId,
    //   responses: Array.isArray(responses)
    //     ? responses.map(
    //         (response: {
    //           id: number;
    //           schema_name: any;
    //           subsection_name: string;
    //         }) => ({
    //           question_id: response.id,
    //           response: [form.getFieldValue(response.schema_name)],
    //           subsection_name: response.subsection_name,
    //         })
    //       )
    //     : [],
    // };

    // console.log('res three', responses)
    // const applicationData:Response[] = {
    //   responses: responses.map((response) => ({
    //     question_id: response.question_id,
    //     response: [form.getFieldValue(response.schema_name)],
    //     subsection_name: response.subsection_name,
    //   })),

    // };
    // const responsesArray: ICreateApplicationResponse['responses'] = [];
    // // for (const key in responses) {
    // //   if (Object.prototype.hasOwnProperty.call(responses, key)) {
    // //     responsesArray.push({
    // //       // schema_name: key,
    // //       question_id: responses[key].question_id,
    // //       response: [form.getFieldValue(responses[key].schema_name)],
    // //       subsection_name: responses[key].subsection_name,
    // //     });
    // //   }
    // // }
    // for (const key in responses) {
    //   if (Object.prototype.hasOwnProperty.call(responses, key)) {
    //     const response = responses[key];
    //     if (response && response.question_id) {
    //       responsesArray.push({
    //         question_id: response.question_id,
    //         response: [form.getFieldValue(response.schema_name)],
    //         subsection_name: response.subsection_name,
    //       });
    //     }
    //   }
    // }

    // const applicationData: ICreateApplicationResponse = {
    //   application_id: id as unknown as number,
    //   responses: responsesArray,
    // };
    // console.log('application data', applicationData)
    mutate(
      {
        application_id: id as unknown as number,
        responses: val.map((item:any) => ({
          question_id: item.question_id,
          response: [form.getFieldValue(item.schema_name)],
          subsection_name: item.subsection_name,
        })),
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
        },
      }
    );
  };



  // const handleTabSubmit = (responses: any) => {
  //   const applicationId = id as unknown as number;
  //   const applicationData: ICreateApplicationResponse = {
  //     application_id: applicationId,
  //     responses: Array.isArray(responses)
  //       ? responses.map(
  //           (response: {
  //             id: number;
  //             schema_name: any;
  //             subsection_name: string;
  //           }) => ({
  //             question_id: response.id,
  //             response: [form.getFieldValue(response.schema_name)],
  //             subsection_name: response.subsection_name,
  //           })
  //         )
  //       : [],
  //   };
  //   console.log('responses',  Array.isArray(responses)
  //   ? responses.map(
  //       (response: {
  //         id: number;
  //         schema_name: any;
  //         subsection_name: string;
  //       }) => ({
  //         question_id: response.id,
  //         response: [form.getFieldValue(response.schema_name)],
  //         subsection_name: response.subsection_name,
  //       })
  //     )
  //   : [],)
    
  //   console.log('responses 2', responses)
  //   mutate(
  //     {
  //       application_id: id as unknown as number,
  //       responses: Array.isArray(responses)
  //         ? responses.map(
  //             (response: {
  //               id: number;
  //               schema_name: any;
  //               subsection_name: string;
  //             }) => ({
  //               question_id: response.id,
  //               response: [form.getFieldValue(response.schema_name)],
  //               subsection_name: response.subsection_name,
  //             })
  //           )
  //         : [],
        
  //     },
  //     {
  //       onError: (error: any) => {
  //         openNotification({
  //           state: "error",
  //           title: "Error Occurred",
  //           description: error.response.data.message,
  //           duration: 5,
  //         });
  //       },
  //       onSuccess: (res: any) => {
  //         openNotification({
  //           state: "success",
  //           title: "Success",
  //           description: res.data.data.message,
  //         });
  //         queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
  //       },
  //     }
  //   );
  // };


  // const handleTabSubmit = () => {
  //   const subsectionName = tabItems[currentTab].subsectionName; // Define subsectionName here
  
  //   // Retrieve form values
  //   const values = form.getFieldsValue();
    
  //   // Construct the payload object
  //   const responses: ICreateApplicationResponse = {
  //     application_id: id as unknown as number, // Assuming id is defined in the scope
  //     responses: Object.keys(values).map((key) => ({
  //       question_id: key, // Assuming key is the question ID
  //       schema_name: key, // Assuming key is the schema name
  //       subsection_name: subsectionName, // Use the defined subsectionName
  //       response: values[key], // Get the value for the current field
  //     })),
  //   };
    
  //   // Submit the form data
  //   mutate(responses, {
  //     onError: (error: any) => {
  //       openNotification({
  //         state: "error",
  //         title: "Error Occurred",
  //         description: error.response.data.message,
  //         duration: 5,
  //       });
  //     },
  //     onSuccess: (res: any) => {
  //       openNotification({
  //         state: "success",
  //         title: "Success",
  //         description: res.data.data.message,
  //       });
  //       queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
  //     },
  //   });
  // };
  



  
  // const handleTabSubmit = (values: any) => {
  // mutate({
  //     application_id: id as unknown as number, responses: [{
  //       question_id: values.question_id,
  //       subsection_name: values.subsection_name,
  //       response:[form.getFieldValue(values.schema_name)],
  //   }]}, {
  //     onError: (error: any) => {
  //       console.log('err', error)
  //       openNotification({
  //         state: "error",
  //         title: "Error Occurred",
  //         description: error.response.data.message,
  //         duration: 5,
  //       });
  //     },
  //     onSuccess: (res: any) => {
  //       console.log('form response api res', res)
  //       openNotification({
  //         state: "success",
  //         title: "Success",
  //         description: res.data.data.message,
  //       });
  //       queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
  //     },
  //   });
  // };

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
          form={form}
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
          form={form}
        />
      ),
      label: "Criminal History",
      key: "Criminal History",
      subsectionName: "criminalHistory",
    },
  ];

  const lastTab = currentTab === tabItems.length - 1;

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleTabSubmit}
      >
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

        {lastTab && (
          <div className="flex justify-between my-2">
            <AppButton
              label="Previous"
              type="button"
              variant="transparent"
              handleClick={() => {
                onPrev && onPrev();
              }}
            />
            <div className="flex justify-end items-center gap-5">
              <AppButton
                label="Next"
                type="button"
                variant="transparent"
                handleClick={() => {
                  onNext && onNext();
                }}
              />
              <AppButton
                label="Save"
                type="submit"
                isLoading={isLoading}
                // isDisabled={isSuccess}
              />
            </div>
          </div>
        )}
        {!lastTab && (
          <div className="flex justify-end items-center gap-5">
            <AppButton
              label="Prev"
              type="button"
              variant="transparent"
              handleClick={() => {
                onPrev && onPrev();
              }}
            />
            <AppButton
              label="Next"
              type="button"
              handleClick={() => {
                onNext && onNext();
              }}
            />
          </div>
        )}
      </Form>
    </>
  );
};

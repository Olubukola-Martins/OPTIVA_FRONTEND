import { Empty, Form, Input, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import {
  QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  useGetSingleQuestion,
} from "../../hooks/useGetTemplateQuestion";
import { useEffect, useState } from "react";
import { useDelete } from "src/hooks/useDelete";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { renderInput } from "src/features/applications/features/NewApplication/NewApplicantBrief";
import { ISingleQuestion } from "../../types";

export const showInputName = (inputType: string) => {
  if (inputType === "text_input") {
    return "Text Input";
  } else if (inputType === "select") {
    return "Select";
  } else if (inputType === "check_box") {
    return "Checkbox";
  } else if (inputType === "textarea") {
    return "Text Area";
  } else if (inputType === "number_input") {
    return "Number Input";
  } else if (inputType === "date_input") {
    return "Date Picker";
  }
};

export const ApplicantBriefTemplateDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-one",
  });
  const [form] = Form.useForm();
  // useEffect(() => {
  //   if (data) {
  //     const formData: { [key: string]: any } = {};
  //     data.forEach((item: ISingleQuestion) => {
  //       formData[item.schema_name] = item.form_question || ""; 
  //     });
  //     form.setFieldsValue(formData);
  //   }
  // }, [data, form]);
  
  useEffect(() => {
    if (data) {
      const formData: { [key: string]: any } = {};
      data.forEach((item: ISingleQuestion) => {
        formData[item.schema_name] = item.form_question || ""; 
        // Set both values for Input.TextArea and Input
        formData[item.schema_name + "_options"] = item.options?.join(", ") || "";
      });
      form.setFieldsValue(formData);
    }
  }, [data, form]);

  console.log("data ", data);
  const { removeData } = useDelete({
    EndPointUrl: "admin/templates/section-one/",
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
        <Skeleton active loading={isLoading}>
          <Form form={form} layout="vertical">
            {data?.map((item, index) => (
              <>
                <h2 className="mb-2 font-medium">Question {index + 1}:</h2>
                <div className="flex items-center justify-between">
                  {/* <Form.Item
                    key={item.id}
                    name={item.schema_name}
                    className="w-[80%]"
                    // label={item.form_question}
                  >
                    <Input />
                  </Form.Item>
                  {item.options !==null && <Input.TextArea/>} */}
                  <Form.Item
                    name={item.schema_name}
                    className="w-[80%]"
                    label={item.form_question}
                  >
                    {item.options ? (
                      <>
                         <Input />
                        <Input.TextArea
                          // autoSize={{ minRows: 3, maxRows: 6 }}
                          value={item.options.join(", ")}
                          readOnly
                        />
                       
                      </>
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                  {item.template_id !== null && <div className="">
                    <i
                      className="ri-delete-bin-line text-xl cursor-pointer w-[5%]"
                      onClick={() => setShowDeleteModalForItem(item.id)}
                    ></i>
                  </div>}
                  {showDeleteModalForItem === item.id && (
                    <DeleteModal
                      header="question"
                      text="question"
                      onCancel={() => setShowDeleteModalForItem(null)}
                      open={showDeleteModalForItem !== null}
                      onDelete={() => removeData(item.id)}
                    />
                  )}
                </div>
              </>
            ))}
          </Form>
        </Skeleton>
        // <List itemLayout="vertical" loading={isLoading}>
        //   {data?.map((item) => (
        //     <List.Item key={item.id}>
        //       <div className="flex justify-between items-center">
        //         <div className="my-3 p-2">
        //           <p className="py-2 text-base">
        //             <span className="font-medium">Question:</span>{" "}
        //             {item.form_question.charAt(0).toUpperCase() +
        //               item.form_question.slice(1)}
        //           </p>
        //           <p className="py-2 text-base">
        //             <span className="font-medium">Input type:</span>{" "}
        //             {showInputName(item.input_type)}
        //           </p>
        //         </div>
                // {item.template_id !== null && (
                  // <div className="flex justify-end  w-[5%]">
                  //   <i
                  //     className="ri-delete-bin-line text-xl cursor-pointer mt-10"
                  //     onClick={() => setShowDeleteModalForItem(item.id)}
                  //   ></i>
                  // </div>
                // )}
        //       </div>
        // {showDeleteModalForItem === item.id && (
        //   <DeleteModal
        //     header="question"
        //     text="question"
        //     onCancel={() => setShowDeleteModalForItem(null)}
        //     open={showDeleteModalForItem !== null}
        //     onDelete={() => removeData(item.id)}
        //   />
        // )}
        //     </List.Item>
        //   ))}
        // </List>
      )}
    </>
  );
};

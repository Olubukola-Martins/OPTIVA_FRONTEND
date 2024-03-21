// import { useParams } from "react-router-dom";
// import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
// import { Empty, Form, Skeleton } from "antd";
// import { useEffect } from "react";
// import { useQueryClient } from "react-query";
// import { openNotification } from "src/utils/notification";
// import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
// import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
// import { AppButton } from "src/components/button/AppButton";
// import { renderDetailsInput } from "./AcademicHistory";
// import { generalValidationRules } from "src/utils/formHelpers/validations";
// import { renderInput } from "../NewApplication/NewApplicantBrief";

// export const renderPTag = (input_type: string, text: any) => {
//   const formattedText = text ? text.join(", ") : text;
//   if (
//     input_type === "checkbox" ||
//     "text_input" ||
//     "select" ||
//     "number_input" ||
//     "date_input"
//   ) {
//     return <p className="applicantDetailsSinglePTag">{formattedText}</p>;
//   } else if (input_type === "textarea") {
//     return (
//       <p className="applicantDetailsDiv h-24 border rounded-md">
//         {formattedText}
//       </p>
//     );
//   }
// };

// export interface IApplicantDetailsProps {
//   onNext?: () => void;
//   onPrev?: () => void;
// }

// export const ApplicantBrief: React.FC<IApplicantDetailsProps> = ({
//   onNext,
// }) => {
//   const { id } = useParams();
//   const { data, isLoading } = useGetApplicationResponse({
//     id: id as unknown as number,
//     section: "sectiononeresponse",
//   });

//   console.log('data section one', data)

//   const [form] = Form.useForm();
//   useEffect(() => {
//     if (data && data.length > 0) {
//       const initialValues: Record<string, any> = {};
//       data.forEach((item) => {
//         initialValues[item.schema_name] = item.section_one_response;
//       });
//       form.setFieldsValue(initialValues);
//     }
//   }, [data]);
  

//   const { mutate, isLoading: postLoading } =
//     useCreateApplicationResponse("sectiononeresponse");
//   const queryClient = useQueryClient();

//   const handleSubmit = (val: any) => {
//     const payload = {
//       application_id: id as unknown as number,
//       responses:
//         data?.map((item) => ({
//           question_id: item.id,
//           response: Array.isArray(val[item.form_question])
//             ? val[item.form_question]
//             : [val[item.form_question]],
//         })) || [],
//     };
//     mutate(payload, {
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
//           description: res.data.message,
//         });
//         queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
//       },
//     });
//   };


//   return (
//     <>
//       <Skeleton active loading={isLoading}>
//         {data?.length !== 0 ? (
//           <Form
//             onFinish={handleSubmit}
//             form={form}
//             layout="vertical"
//             requiredMark={false}
//           >
//             {data?.map((item) => (
//                <Form.Item
//                name={item.schema_name}
//                // rules={generalValidationRules}
//                label={
//                  item.form_question.charAt(0).toUpperCase() +
//                  item.form_question.slice(1)
//                }
//                key={item.id}
//                className="w-full"
//              >
//                {renderDetailsInput(item.input_type, item.options)}
//              </Form.Item>
          
//             ))}

//             <div className="flex justify-between items-center gap-5">
//               <AppButton
//                 label="Next"
//                 type="button"
//                 handleClick={() => onNext && onNext()}
//                 variant="transparent"
//               />
//               <AppButton label="Save" type="submit" isLoading={postLoading} />
//             </div>
//           </Form>
//         ) : (
//           <Empty />
//         )}
//       </Skeleton>
//     </>
//   );
// };


import { Empty, Form, Skeleton } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { AppButton } from "src/components/button/AppButton";
import { renderDetailsInput } from "./AcademicHistory";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";

export interface IApplicantDetailsProps {
  onNext?: () => void;
  onPrev?: () => void;
}


export const ApplicantBrief: React.FC<IApplicantDetailsProps> = ({ onNext }) => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiononeresponse",
  });
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading: postLoading } = useCreateApplicationResponse("sectiononeresponse");


  useEffect(() => {
    if (data && data.length > 0) {
      const initialValues: Record<string, any> = {};
      data.forEach((item) => {
        initialValues[item.schema_name] = item.response || null;
      });
      form.setFieldsValue(initialValues);
    }
  }, [data]);

 
  const handleSubmit = (values: any) => {
    const payload = {
      application_id: Number(id),
      responses: data?.map((item) => ({
        question_id: item.id,
        response: Array.isArray(values[item.schema_name]) ? values[item.schema_name] : [values[item.schema_name]],
      })) || [],
    };
    mutate(payload, {
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
          description: res.data.message,
        });
        queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
      },
    });
  };

  return (
    <>
      <Skeleton active loading={isLoading}>
        {data?.length !== 0 ? (
          <Form onFinish={handleSubmit} form={form} layout="vertical" requiredMark={false}>
            {data?.map((item) => (
              <Form.Item
                name={item.schema_name}
                label={item.form_question}
                key={item.id}
                className="w-full"
              >
                {renderDetailsInput(item.input_type, )}
              </Form.Item>
            ))}
            <div className="flex justify-between items-center gap-5">
              <AppButton label="Next" type="button" handleClick={onNext} variant="transparent" />
              <AppButton label="Save" type="submit" isLoading={postLoading} />
            </div>
          </Form>
        ) : (
          <Empty />
        )}
      </Skeleton>
    </>
  );
};

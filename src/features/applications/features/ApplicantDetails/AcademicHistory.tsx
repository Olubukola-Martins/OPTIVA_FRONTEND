import {
  Checkbox,
  Empty,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
} from "antd";
import { useParams } from "react-router-dom";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";
import { useEffect } from "react";
import { useGetSectionResponse } from "../../hooks/Application hooks/useGetSectionResponse";

export const renderDetailsInput = (inputType: string, options?: any[]) => {
  if (inputType === "textarea") {
    return <Input.TextArea className="w-full" />;
  } else if (inputType === "text_input") {
    return <Input className="w-1/2" />;
  } else if (inputType === "select") {
    return (
      <div className="w-1/2">
        <Select className="w-1/2" >
          {options?.map((option, ) => (
            <Select.Option key={option.id} value={option} >
              {option.charAt(0).toUpperCase() + option.slice(1)}
              {/* {option} */}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  } else if (inputType === "check_box") {
    return (
      <Checkbox.Group className="w-full">
        {options?.map((option, index) => (
          <Checkbox key={index} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Checkbox>
        ))}
      </Checkbox.Group>
    );
  } else if (inputType === "number_input") {
    return <InputNumber className="w-1/2" />;
  } else if (inputType === "date_input") {
    return <Input className="w-1/2" disabled />;
  }
};

export const AcademicHistory: React.FC<IApplicationFormResponseProps> = ({
  onNextTabItem,
  subsectionName,
  onPrevTabItem,
  form
}) => {
  const { id } = useParams();

  const { data: sectionTwoData } = useGetSectionResponse({
    pagination: {
      subsection_name: subsectionName,
    },
    currentUrl: `${id as unknown as number}/sectiontworesponse`,
  });

  useEffect(() => {
    if (sectionTwoData?.data && sectionTwoData.data.length > 0) {
      const initialValues: Record<string, any> = {};
      sectionTwoData.data.forEach(item => {
        initialValues[item.question.schema_name] = item.response;
      });
      form?.setFieldsValue(initialValues);
    }
  }, [sectionTwoData]);
  
  
  return (
    <>
      {sectionTwoData?.data?.length ? (
       sectionTwoData.data.map(
          (item) =>
            item.subsection_name === subsectionName && (
              <Form.Item
                key={item.id}
                name={item.question.schema_name}
                label={item.question.form_question}
              >
                {renderDetailsInput(
                  item.question.input_type,
                  item.question.options
                 
                )}
              </Form.Item>
            )
        )
      ) : (
        <Empty />
      )}

      <div className="flex justify-between  my-5 py-2">
        <Tooltip title="Click to go to the previous section">
          <i
            className="ri-arrow-left-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onPrevTabItem && onPrevTabItem();
            }}
          ></i>
        </Tooltip>

        <Tooltip title="Click to go to the next section">
          <i
            className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onNextTabItem && onNextTabItem();
            }}
          ></i>
        </Tooltip>
      </div>
    </>
  );
};

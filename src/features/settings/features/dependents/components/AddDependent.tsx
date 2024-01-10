import { Form, Modal, Input, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { dependentsAgeList } from "../contants";
import {
  generalValidationRules,
  textInputValidationRulesOpt,
} from "src/utils/formHelpers/validations";
import { useCreateEligibleDependents } from "../hooks/useCreateEligibleDependents";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

export const AddDependent = ({ handleClose, open }: IdentifierProps) => {
  const { addEligibleDependents } = useCreateEligibleDependents();
 
  const handleNewDependent = (values: { extraConditions: any[]; dependent: any; age: any[]; conditions: string; }) => {
    console.log(values);
    const extraConditions = values.extraConditions ? values.extraConditions.map(
      (item) => ({other_condition:item.value})
    ) : [];

      addEligibleDependents({
        dependant: values.dependent,
        age_dependants: values.age.map((item) => ({ age_bracket: item })),
        dependant_conditions: values.conditions ? [
          { other_condition: values.conditions }, ...extraConditions ] : undefined
    });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add Dependents"
    >
      <Form layout="vertical" className="mt-4" onFinish={handleNewDependent}>
        <Form.Item
          name="dependent"
          label="Dependent"
          rules={generalValidationRules}
        >
          <Input placeholder="Mother" />
        </Form.Item>
        <Form.Item
          name="age"
          label="Dependent Age"
          rules={generalValidationRules}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Select"
            options={dependentsAgeList.map((item: string) => ({
              value: item,
              label: item,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="conditions"
          label="Condition"
          rules={textInputValidationRulesOpt}
        >
          <Input placeholder="2 childless" />
        </Form.Item>

        <Form.List name="extraConditions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div className="flex gap-2 w-full">
                  <Form.Item
                    {...restField}
                    className="w-11/12"
                    key={key}
                    label="Condition"
                    name={[name, "value"]}
                    fieldKey={[fieldKey as number, "value"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input value!",
                      },
                    ]}
                  >
                    <Input placeholder="Unmarried" />
                  </Form.Item>
                  <DeleteOutlined
                    className="text-red-600 text-xl "
                    onClick={() => remove(key)}
                  />
                </div>
              ))}
              <Form.Item>
                <div className="flex gap-2">
                  <PlusCircleOutlined
                    className="text-green-600 text-2xl"
                    onClick={() => add()}
                  />
                  <p className="font-semibold" onClick={() => add()}>
                    Add New Condition
                  </p>
                </div>
              </Form.Item>
            </>
          )}
        </Form.List>

        <AppButton type="submit" label="Save"/>
      </Form>
    </Modal>
  );
};

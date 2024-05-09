import { Form, Modal, Input, Select, Spin } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { dependentsAgeList } from "../contants";
import {
  generalValidationRules,
  textInputValidationRulesOpt,
} from "src/utils/formHelpers/validations";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { AllEligiDependentsDatum } from "src/features/settings/types/settingsType";
import useUpdateEligibleDependents from "../hooks/useUpdateEligibleDependents";
import { useEffect } from "react";
import FormItemCountry from "src/features/payment/components/FormItemCountry";

interface IEditDepOrops extends IdentifierProps {
  itemId: number;
  singleDependent: AllEligiDependentsDatum | undefined;
  singleDependentLoading: boolean;
  editing: (loading: boolean) => void;
}

export const EditDependent = ({
  handleClose,
  open,
  itemId,
  singleDependent,
  singleDependentLoading,
  editing,
}: IEditDepOrops) => {
  const { editEligibleDependents, isLoading: editLoading } =
    useUpdateEligibleDependents();

  editing(editLoading);

  const [editForm] = useForm();

  const handleEditDependent = (values: {
    country_id: number;
    extraConditions: { value: any }[];
    dependent: any;
    age: any[];
    conditions: any;
  }) => {
    const extraConditions = values.extraConditions.map(
      (item: { value: any }) => ({
        other_condition: item.value,
      })
    );
    editEligibleDependents(
      itemId,
      {
        dependant: values.dependent,
        country_id: values.country_id,
        age_dependants: values.age.map((item: any) => ({ age_bracket: item })),
        dependant_conditions: values.conditions
          ? [{ other_condition: values.conditions }, ...extraConditions]
          : undefined,
      },
      undefined,
      () => {
        editForm.resetFields();
      }
    );
    handleClose();
    // setData(singleDependentData?.data);
    // editForm.resetFields();
  };
  useEffect(() => {
    editing(editLoading);
  }, [editLoading]);

  useEffect(() => {
    if (singleDependent && !Array.isArray(singleDependent)) {
      console.log("singleDependent", singleDependent);
      const { age_brackets, other_conditions, dependant, country_id } =
        singleDependent;
      editForm.setFieldsValue({
        dependent: dependant,
        country_id,
        age: age_brackets?.map((item) => item.age_bracket),
        conditions:
          other_conditions?.length > 0
            ? other_conditions[0].other_condition
            : undefined,
        extraConditions:
          other_conditions?.length > 1
            ? other_conditions
                .filter((_, index) => index !== 0)
                .map((item) => ({ value: item.other_condition }))
            : [],
      });
    }
  }, [singleDependent, singleDependentLoading,open]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        handleClose();
      }}
      closeIcon
      footer={null}
      title="Edit Dependents"
    >
      <Spin spinning={singleDependentLoading}>
        <Form
          layout="vertical"
          form={editForm}
          className="mt-4"
          onFinish={handleEditDependent}
        >
          <FormItemCountry
            name="country_id"
            label="Country"
            optionalField={false}
          />

          <>
            <Form.Item
              name="dependent"
              label="Dependent"
              rules={generalValidationRules}
            >
              <Input placeholder="" disabled={true} />
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
              <Input placeholder="Retired" />
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
            <AppButton type="submit" label="Save" isLoading={editLoading} />
          </>
        </Form>
      </Spin>
    </Modal>
  );
};

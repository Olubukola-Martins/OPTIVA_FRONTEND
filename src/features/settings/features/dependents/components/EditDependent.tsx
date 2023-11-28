import { Form, Modal, Input, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { dependentsAgeList } from "../contants";
import {
  generalValidationRules,
  textInputValidationRulesOpt,
} from "src/utils/formHelpers/validations";
import {
  QUERY_KEY_ELIGIBLE_DEPENDENTS,
  eligibleDependentURL,
} from "../hooks/useCreateEligibleDependents";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useFetchSingleItem } from "src/features/settings/hooks/useFetchSingleItem";
import { ISingleEligibleDependent } from "src/features/settings/types/settingsType";
import useUpdateEligibleDependents from "../hooks/useUpdateEligibleDependents";
import { useEffect, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

interface IEditDepOrops extends IdentifierProps {
  itemId: number;
  editSuccess: (isSuccess: boolean) => void;
  refetchAllDependents: any;

}
interface IGetSingleDepQueryData {
  data: ISingleEligibleDependent | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: (
    options?:
      | (RefetchOptions & RefetchQueryFilters<ISingleEligibleDependent>)
      | undefined
  ) => Promise<QueryObserverResult<any, any>>;
}
const urlEndPoint = eligibleDependentURL;
const queryKey = QUERY_KEY_ELIGIBLE_DEPENDENTS;

export const EditDependent = ({
  handleClose,
  open,
  itemId,
  editSuccess,
  refetchAllDependents,
}: IEditDepOrops) => {
  
  const {
    data: singleDependentData,
    isLoading,
  }: IGetSingleDepQueryData  // refetch,
    // isSuccess: singleDependentSuccess,
  =  useFetchSingleItem({
      itemId,
      queryKey,
      urlEndPoint,
    });
  const { editEligibleDependents, isSuccess, isLoading:editLoading } =
    useUpdateEligibleDependents();
  const [data, setData] = useState(singleDependentData?.data);

  const [editForm] = useForm();
  const handleNewDependent = (values) => {
    const extraConditions = values.extraConditions.map((item) => ({
      other_condition: item.value,
    }));
    editEligibleDependents(itemId, {
      dependant: values.dependent,
      age_dependants: values.age.map((item) => ({ age_bracket: item })),
      dependant_conditions: values.conditions
        ? [{ other_condition: values.conditions }, ...extraConditions]
        : undefined,
    });
   isSuccess && handleClose();
    setData(singleDependentData?.data);
    editForm.resetFields();
  };

  useEffect(() => {
    // refetch()
    if (
      singleDependentData &&
      singleDependentData.data &&
      !Array.isArray(singleDependentData.data)
    ) {
      setData(singleDependentData.data);
      const { dependant, age_brackets, other_conditions } =
        singleDependentData.data;
      // as AllEligiDependentsDatum;
      // singleDependentData.data;
      editForm.setFieldsValue({
        dependent: dependant,
        age: age_brackets.map((item) => item.age_bracket),
        conditions:
          other_conditions.length > 0
            ? other_conditions[0].other_condition
            : undefined,
        extraConditions:
          other_conditions.length > 1
            ? other_conditions
                .filter((_, index) => index !== 0)
                .map((item) => ({ value: item.other_condition }))
            : [],
      });
    }
  }, [
    singleDependentData,
    itemId,
    // refetch,
    isLoading,
    // singleDependentSuccess,
    // data,
    // editForm,
    
  ]);
  useEffect(() => {
    refetchAllDependents();
  }, [editLoading]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        editForm.resetFields();
        handleClose();
      }}
      closeIcon
      footer={null}
      title="Edit Dependents"
    >
      <Form
        layout="vertical"
        form={editForm}
        className="mt-4"
        onFinish={handleNewDependent}
      >
        <>
          <Form.Item
            name="dependent"
            label="Dependent"
            rules={generalValidationRules}
          >
            <Input placeholder="Mother" disabled={true} />
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
          <AppButton type="submit" label="Save" isLoading={editLoading}/>
        </>
      </Form>
    </Modal>
  );
};

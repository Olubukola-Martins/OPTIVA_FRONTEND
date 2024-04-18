import { Form, Modal, Input, Select, InputNumber } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { END_POINT } from "src/config/environment";
import { DOCUMENT_TYPES } from "src/constants/general";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import { IdentifierProps } from "src/types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import {
  QUERY_KEY_ELIGIBLE_DEPENDENTS,
  eligibleDependentURL,
} from "../../dependents/hooks/useCreateEligibleDependents";
import {
  QUERY_KEY_DOC_REQUIREMENT,
  documentRequirementURL,
} from "../hooks/useCreateDocumentRequirement";
import { useFetchSingleItem } from "src/features/settings/hooks/useFetchSingleItem";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { ISingleDocRequirement } from "src/features/settings/types/settingsType";

interface IProps extends IdentifierProps {
  docType: string;
  handleEditNewDocument: (val: any) => any;
  editLoading:boolean;
}
const queryKey = QUERY_KEY_DOC_REQUIREMENT;

export const EditDocument = ({
  handleClose,
  open,
  docType,editLoading,
  handleEditNewDocument,
  id,
}: IProps) => {
  const [itemId, setItemId] = useState<number | undefined>()
  const {
    data: singleDocRequirementData,
    isLoading,
  }: {
    data: ISingleDocRequirement | undefined;
    isLoading: boolean;
  } = useFetchSingleItem({
    queryKey,
    urlEndPoint: documentRequirementURL,
    itemId:itemId as number,
  });
  const { data: allDocCategories, isLoading: allDocCategoriestLoading } =
    useFetchAllItems({
      queryKey: "DocumentCategory",
      urlEndPoint: `${END_POINT.BASE_URL}/admin/document-category`,
    });
  const { data: allDependentsData, isLoading: allDependentsLoading } =
    useFetchAllItems({
      queryKey: QUERY_KEY_ELIGIBLE_DEPENDENTS,
      urlEndPoint: eligibleDependentURL,
    });
  const [editForm] = useForm();
  const [data, setData] = useState(singleDocRequirementData);

  useEffect(() => {
    setItemId(id as number);
    if (
      singleDocRequirementData?.data &&
      !Array.isArray(singleDocRequirementData?.data)
    ) {
      setData(singleDocRequirementData);
      const {
        document_category_id,
        document_format,
        document_size,
        eligible_dependants,
        name,
      } = singleDocRequirementData.data;
      editForm.setFieldsValue({
        name: name,
        category: document_category_id,
        format: document_format,
        size: document_size,
        dependents: eligible_dependants.map((item) => item.id),
      });
    }
  }, [singleDocRequirementData, id, itemId, editForm, data, isLoading]);


  return (
    <Modal
      open={open}
      onCancel={() => {
        handleClose();
        // editForm.resetFields();
      }}
      closeIcon
      footer={null}
      title={`Edit ${docType} document`}
      style={{ top: 10 }}
    >
      <Form
        layout="vertical"
        className="mt-4"
        form={editForm}
        onFinish={(val) => {
          handleEditNewDocument(val);
          handleClose();
          setData(singleDocRequirementData);
          editForm.resetFields();
        }}
        // requiredMark={false}
      >
        <Form.Item name="name" label="Name" rules={textInputValidationRules}>
          <Input placeholder="Document name" />
        </Form.Item>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Form.Item
            name="category"
            label="Category"
            rules={generalValidationRules}
          >
            <Select
              options={
                Array.isArray(allDocCategories?.data) &&
                allDocCategories?.data.map((category: any) => ({
                  value: category.id,
                  label: category.name,
                }))
              }
              loading={allDocCategoriestLoading}
              className="w-full"
              placeholder="Select"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="format"
            label="Format"
            rules={generalValidationRules}
          >
            <Select
              mode="multiple"
              options={DOCUMENT_TYPES}
              allowClear
              placeholder="Select"
            />
          </Form.Item>
          <Form.Item
            name="size"
            label="File size"
            rules={generalValidationRules}
          >
            <InputNumber addonAfter="mb" min={1} max={20} className="w-full" />
          </Form.Item>
        </div>

        <Form.Item
          name="dependents"
          label="Qualifying Dependents"
          rules={generalValidationRules}
        >
          <Select
            mode="multiple"
            loading={allDependentsLoading}
            options={
              Array.isArray(allDependentsData?.data) &&
              allDependentsData?.data.map(
                (dependent: { id: any; dependant: any }) => ({
                  value: dependent.id,
                  label: dependent.dependant,
                })
              )
            }
            allowClear
            placeholder="Select"
          />
        </Form.Item>

        <AppButton type="submit" isLoading={editLoading} />
      </Form>
    </Modal>
  );
};

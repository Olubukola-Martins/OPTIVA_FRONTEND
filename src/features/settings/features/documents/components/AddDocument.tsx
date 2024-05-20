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
import FormItemDependents from "../../dependents/components/FormItemDependents";

interface IProps extends IdentifierProps {
  docType: string;
  handleAddNewDocument: (val: any) => any;
  postDocLoading:boolean;
}

export const AddDocument = ({
  handleClose,
  open,
  docType,
  handleAddNewDocument,
  postDocLoading,
}: IProps) => {
  const { data: allDocCategories, isLoading: allDocCategoriestLoading } =
    useFetchAllItems({
      queryKey: "DocumentCategory",
      urlEndPoint: `${END_POINT.BASE_URL}/admin/document-category`,
    });
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={`Add new ${docType} document`}
      style={{ top: 10 }}
    >
      <Form
        layout="vertical"
        className="mt-4"
        onFinish={handleAddNewDocument}
        requiredMark={false}
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
              options={allDocCategories?.data.map(
                (category: { id: any; name: any }) => ({
                  value: category.id,
                  label: category.name,
                })
              )}
              loading={allDocCategoriestLoading}
              className="w-full"
              placeholder="Select"
              allowClear
            />
          </Form.Item>
          <FormItemDependents label="Qualifying Dependents" optionalField={ false} multiple={true} />
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

        {/* <Form.Item
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
        </Form.Item> */}

        <AppButton type="submit" isLoading={postDocLoading} />
      </Form>
    </Modal>
  );
};

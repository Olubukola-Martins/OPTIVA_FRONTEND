import { Dropdown, Form, Input, Menu, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import Select, { SelectProps } from "antd/lib/select";
import { TableProps } from "antd/lib/table";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { PageIntro } from "src/components/PageIntro";
import { END_POINT } from "src/config/environment";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import {
  generalValidationRules,
  generalValidationRulesOpt,
} from "src/utils/formHelpers/validations";

interface IFormItemCategoryProps extends SelectProps<any> {
  multiple?: true;
  extraStyles?: string;
  name?: string;
  label?: string;
  hideLabel?: boolean;
  optionalField?: boolean;
}

export const QUERY_KEY_MEETING_CATEGORIES = "MeetingCategories";
export const meetingCategoriesUrl = `${END_POINT.BASE_URL}/admin/meeting-categories`;

const { data, isLoading } = useFetchAllItems({
  queryKey: QUERY_KEY_MEETING_CATEGORIES,
  urlEndPoint: meetingCategoriesUrl,
});

export const FormItemMeetingCategory = ({
  multiple,
  extraStyles,
  label,
  name,
  hideLabel,
  optionalField = true,
  ...restProps
}: IFormItemCategoryProps) => {
  const [allCategories, setAllCategories] = useState<
    {
      value: number;
      label: string;
    }[]
  >();

  useEffect(() => {
    if (data) {
      const value = data.map(({ id, category_name }: any) => ({
        value: id,
        label: category_name,
      }));

      setAllCategories(value);
    }
  }, [data, isLoading]);

  return (
    <Form.Item
      className={`${extraStyles}`}
      name={name ? name : "meeting_category"}
      label={label ? label : "Select Meeting Category"}
      noStyle={hideLabel}
      rules={optionalField ? generalValidationRulesOpt : generalValidationRules}
    >
      <Select
        mode={multiple ? "multiple" : undefined}
        options={allCategories}
        loading={isLoading}
        {...restProps}
      />
    </Form.Item>
  );
};

const MeetingCategories = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalForm] = useForm();
  useEffect(() => {
    if (data) {
      setDataSource(data);
    }
  }, [isLoading, data]);

  const columns: TableProps<any>["columns"] = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <Dropdown trigger={["click"]}>
            <Menu>
              <Menu.Item>Edit</Menu.Item>
              <Menu.Item>Delete</Menu.Item>
            </Menu>
          </Dropdown>
        );
      },
    },
  ];

  const table = useCallback(() => {
    return <Table dataSource={dataSource} columns={columns} />;
  }, [dataSource]);

  return (
    <>
      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <Form layout="vertical" onFinish={() => {}} form={modalForm}>
          <Form.Item label={"Category Name"} rules={generalValidationRules}>
            <Input></Input>
          </Form.Item>
          <Form.Item label={"Description"}>
            <TextArea></TextArea>
          </Form.Item>
          <div className="flex justify-items-center mx-auto gap-4">
            <AppButton variant="transparent" type="reset" />
            <AppButton label="Save" />
          </div>
        </Form>
      </Modal>
      <div className="flex justify-between items-center py-4">
        <PageIntro
          arrowBack={false}
          title="Meeting Category"
          description="View  & Create New Meeting Category"
        />
        <div className="flex gap-4">
          <Link to={appRoute.meetings}>
            <AppButton label="Meetings" variant="transparent" />
          </Link>
          <AppButton
            label="New Category"
            handleClick={() => setShowModal(true)}
          />
        </div>
      </div>
      {table}
    </>
  );
};

export default MeetingCategories;

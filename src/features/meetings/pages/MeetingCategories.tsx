import { Dropdown, Form,  Menu, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import Select, { SelectProps } from "antd/lib/select";
import { ColumnsType } from "antd/lib/table";
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
import { IMeetingCategoryData, IMeetingCategoryDatum } from "../types/types";

interface IFormItemCategoryProps extends SelectProps<any> {
  multiple?: true;
  extraStyles?: string;
  name?: string;
  label?: string;
  hideLabel?: boolean;
  optionalField?: boolean;
}

// interface ITableData {
//   sn: number;
//   categoryName: string;
//   description: string;
// }

export const QUERY_KEY_MEETING_CATEGORIES = "MeetingCategories";
export const meetingCategoriesUrl = `${END_POINT.BASE_URL}/admin/meeting-categories`;

export const FormItemMeetingCategory = ({
  multiple,
  extraStyles,
  label,
  name,
  hideLabel,
  optionalField = true,
  ...restProps
}: IFormItemCategoryProps) => {
  const {
    data,
    isLoading,
  }: { data: IMeetingCategoryData | undefined; isLoading: boolean } =
    useFetchAllItems({
      queryKey: QUERY_KEY_MEETING_CATEGORIES,
      urlEndPoint: meetingCategoriesUrl,
    });

  const [allCategories, setAllCategories] = useState<
    {
      value: number;
      label: string;
    }[]
  >();

  useEffect(() => {
    if (data?.data) {
      const value = data.data.map((item) => {
        const { id, name } = item;
        return {
          value: id,
          label: name,
        };
      });
      setAllCategories(value);
    }
  }, [data?.data, isLoading]);

  return (
    <Form.Item
      name={name ? name : "meeting_category"}
      label={label ? label : "Select Meeting Category"}
      noStyle={hideLabel}
      rules={optionalField ? generalValidationRulesOpt : generalValidationRules}
    >
      <Select
        className={`${extraStyles} `}
        mode={multiple ? "multiple" : undefined}
        options={allCategories}
        loading={isLoading}
        {...restProps}
      />
    </Form.Item>
  );
};

const MeetingCategories = () => {
  const [dataSource, setDataSource] = useState<any[] | []>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalForm] = useForm();
  const {
    data,
    isLoading,
  }: { data: IMeetingCategoryData | undefined; isLoading: boolean } =
    useFetchAllItems({
      queryKey: QUERY_KEY_MEETING_CATEGORIES,
      urlEndPoint: meetingCategoriesUrl,
    });

  useEffect(() => {
    if (data?.data) {
      const tableData = data.data.map((item, index) => {
        const { name, description } = item;
        return { sn: index + 1, categoryName: name, description };
      });
      setDataSource(tableData);
    }
  }, [isLoading, data]);

  const columns: ColumnsType<IMeetingCategoryDatum> = [
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
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key={"edit"}>Edit</Menu.Item>
                <Menu.Item key={"delete"}>Delete</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
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
      {table()}
    </>
  );
};

export default MeetingCategories;

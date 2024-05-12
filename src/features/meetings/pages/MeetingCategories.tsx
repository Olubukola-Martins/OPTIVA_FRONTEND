import { Dropdown, Menu, Modal, Table } from "antd";
import { TableProps } from "antd/lib/table";
import { useCallback, useEffect, useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import { PageIntro } from "src/components/PageIntro";
import { END_POINT } from "src/config/environment";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";

export const QUERY_KEY_MEETING_CATEGORIES = "MeetingCategories";
export const meetingCategoriesUrl = `${END_POINT.BASE_URL}/admin/meeting-categories`;

const MeetingCategories = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, isLoading } = useFetchAllItems({
    queryKey: QUERY_KEY_MEETING_CATEGORIES,
    urlEndPoint: meetingCategoriesUrl,
  });
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
      ></Modal>
      <div className="flex justify-between items-center py-4">
        <PageIntro
          arrowBack={false}
          title="Meeting Category"
          description="View  & Create New Meeting Category"
        />
        <div className="flex gap-4">
          <AppButton label="Meetings" variant="transparent" />
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

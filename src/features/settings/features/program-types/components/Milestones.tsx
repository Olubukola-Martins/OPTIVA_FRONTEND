import {
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Skeleton,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import DeleteIcon from "../assets/img/warning.png";
import {
  QUERY_KEY_FOR_MILESTONE,
  useGetMilestone,
} from "../hooks/useGetMilestone";
import { formatDate } from "../../authorizedPersons/components/AuthorizedPersons";
import { useDeleteHandler } from "src/features/settings/hooks/handleDelete";
import { DeleteModal } from "src/components/modals/DeleteModal";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  milestones: string;
  duration: number[];
  dateCreated: string;
  lastModified: string;
};

export const Milestones = () => {
  // GET REQUEST
  const { data, isLoading } = useGetMilestone();
  const [dataArray, setDataArray] = useState<DataSourceItem[]>([]);
  useEffect(() => {
    if (data) {
      const milestone: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          dateCreated: formatDate(item.created_at),
          duration: item.processes.map((item) => item.duration),
          lastModified: formatDate(item.updated_at),
          milestones: item.milestone,
        };
      });
      setDataArray(milestone);
    }
  }, [data]);

  const [milestoneId, setMilestoneId] = useState<number>();

  const { removeData, deleteIsLoading } = useDeleteHandler({
    deleteEndPointUrl: "admin/milestones",
    queryKey: QUERY_KEY_FOR_MILESTONE,
  });

  // Milestone Modal
  const [openMilestoneModal, setOpenMilestoneModal] = useState<boolean>(false);
  const showMilestoneModal = () => {
    setOpenMilestoneModal(true);
  };

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const showDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Milestones",
      dataIndex: "milestones",
      key: "2",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "3",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "4",
    },
    {
      title: "Last Modified",
      dataIndex: "lastModified",
      key: "5",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={showMilestoneModal}>
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setMilestoneId(val.key as unknown as number);
                    showDeleteModal();
                  }}
                >
                  Delete
                </Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* TABLE */}
      <Skeleton active loading={isLoading}>
        <Table
          columns={columns}
          dataSource={dataArray}
          className="bg-white rounded-md shadow border mt-2"
          scroll={{ x: 600 }}
          rowSelection={{
            type: "checkbox",
            onChange: (
              selectedRowKeys: React.Key[],
              selectedRows: DataSourceItem[]
            ) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
              );
            },
          }}
        />
      </Skeleton>

      {/* DELETE MODAL */}
      <DeleteModal
        open={openDeleteModal}
        header="Investment Route"
        text="investment route"
        onCancel={handleDeleteCancel}
        onDelete={() => removeData(milestoneId as unknown as number)}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

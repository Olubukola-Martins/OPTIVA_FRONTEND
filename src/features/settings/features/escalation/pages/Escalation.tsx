import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import type { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "src/features/settings/components/DeleteModal";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import { QUERY_KEY_ESCALATION, escalationURL } from "../hooks/useAddEscalation";
import { IAllEscalationsData } from "src/features/settings/types/settingsType";
import { useDeleteItem } from "src/features/settings/hooks/useDeleteItem";

interface DataType {
  key: React.Key;
  sn: number;
  role: number;
  task: string;
  taskDeadline: string;
  reminder: string;
  escalationLevels: string;
}
interface IQueryDataType<TPageData> {
  data: TPageData | undefined;
  isLoading: boolean;
  isFetching: boolean;
  // refetch: (
  //   options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  // ) => Promise<QueryObserverResult<any, any>>;
}

const deleteEndpointUrl = escalationURL;
const queryKey = QUERY_KEY_ESCALATION;

const Escalation = () => {
  const navigate = useNavigate();
  const {
    data: allEscalationData,
    isLoading: allEscalationLoading, isFetching
  }: IQueryDataType<IAllEscalationsData> = useFetchAllItems({
    queryKey,
    urlEndPoint: escalationURL,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const { deleteData } = useDeleteItem({ deleteEndpointUrl, queryKey });
  const [currentId, setCurrentId] = useState<number>();
  const columns: ColumnsType<DataType> = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Task Deadline",
      dataIndex: "taskDeadline",
      key: "taskDeadline",
    },
    {
      title: "Reminder",
      dataIndex: "reminder",
      key: "reminder",
    },
    {
      title: "Escalation Levels",
      dataIndex: "escalationLevels",
      key: "escalationLevels",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record: DataType) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setCurrentId(record.key as number);
                  }}
                >
                  <Link
                    to={
                      appRoute.editEscalation(record.key as unknown as number)
                        .path
                    }
                  >
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setCurrentId(record.key as number);
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
  const [hideDeleteBtn, setHideDeleteBtn] = useState<boolean>(true);
  useEffect(() => {
    if (allEscalationData?.data && Array.isArray(allEscalationData?.data)) {
      const responseData = allEscalationData.data;

      const newData: DataType[] = responseData.map((item, index) => {
        // const highestLevel = Math.max(...item.levels.map((item) => item.id));
        const highestLevel = item.levels.length
        return {
          key: item.id,
          sn: index + 1, 
          role: item.role.name,
          task: item.task,
          taskDeadline: `${item.deadline} Hours`,
          reminder: `After ${item.reminder_frequency} Hours`,
          escalationLevels: `${highestLevel} Level${
            highestLevel > 1 ? "s" : ""
          }`,
        };
      });
      setData(newData);
    }
  }, [allEscalationData, allEscalationLoading]);

  // rowSelection object
  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: DataType[]) => {
      selectedRows.length === 0 || !selectedRows
        ? setHideDeleteBtn(true)
        : setHideDeleteBtn(false);
    },
    // getCheckboxProps: (record: DataType) => ({
    // }),
  };

  // Handle Add New/ Define Escalation
  const handleDefineEscalation = () => {
    navigate(appRoute.defineEscalation);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <DeleteModal
          open={showDeleteModal}
          heading="Delete Escalation"
          description="Are you sure you would like to delete escalation?"
          handleClose={() => {
            setShowDeleteModal(false);
          }}
          handleDelete={() => {
            deleteData(currentId as number);
          }}
        />
        <PageIntro
          title="Escalation "
          description="Define, Edit and delete escalation rules on the system"
          linkBack={appRoute.settings}
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon
              icon="uil:file-import"
              className="text-3xl cursor-pointer hover:text-primary"
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
            />
          </div>
          <AppButton
            label="Add New"
            handleClick={() => {
              handleDefineEscalation();
            }}
          />
        </div>
      </div>
      <div className={`${hideDeleteBtn ? "hidden" : ""}`}>
        <AppButton
          type="button"
          variant="transparent"
          label="Delete"
          handleClick={() => {
            setShowDeleteModal(true);
          }}
        />
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        className="bg-white rounded-md shadow border mt-8"
        loading={allEscalationLoading || isFetching}
        columns={columns}
        dataSource={data}
        scroll={{ x: 768 }}
      />
    </>
  );
};

export default Escalation;

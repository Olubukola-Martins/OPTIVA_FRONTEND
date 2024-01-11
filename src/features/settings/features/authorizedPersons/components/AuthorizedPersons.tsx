import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import {
  QUERY_KEY_FOR_AUTHORIZED_PERSON,
  useGetAuthorizedPersons,
} from "../hooks/useGetAuthorizedPersons";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  name: string;
  dateCreated: string;
};

export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  const date = dateObj.getDate();
  const month = dateObj.getDay() + 1;
  const year = dateObj.getFullYear();
  if (date < 10 && month < 10) {
    return `0${date}/0${month}/${year}`;
  }
  return `${date}/${month}/${year}`;
};

export const AuthorizedPersons = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // GET REQUEST
  const { data, isLoading } = useGetAuthorizedPersons();
  const [dataArray, setDataArray] = useState<DataSourceItem[]>([]);
  const [authorizedId, setAuthorizedId] = useState<number>();

const {removeData}=  useDelete({
    queryKey: QUERY_KEY_FOR_AUTHORIZED_PERSON,
    EndPointUrl: "/admin/authorized-person",
  });


  const handleDeleteCheckbox = () => {
    console.log("Deleting rows:", selectedRowKeys);
    setSelectedRowKeys([]);
  };

  useEffect(() => {
    if (data) {
      const authorizedPerson: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          name: item.employee.name,
          dateCreated: formatDate(item.created_at),
        };
      });
      setDataArray(authorizedPerson);
    }
  }, [data]);

  // DELETE MODAL
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "3",
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
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setAuthorizedId(val.key as unknown as number);
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
      {/* DELETE CHECKBOX BUTTON */}
      {selectedRowKeys.length > 0 && (
        <div>
          <AppButton
            variant="transparent"
            label="Delete"
            handleClick={handleDeleteCheckbox}
          />
        </div>
      )}

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={dataArray}
        className="bg-white rounded-md shadow border mt-2"
        scroll={{ x: 600 }}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (keys: React.Key[], rows: DataSourceItem[]) => {
            setSelectedRowKeys(keys);
            console.log("selectedRowKeys:", keys, "selectedRows:", rows);
          },
        }}
      />

      {/* DELETE MODAL */}
      
      <DeleteModal
        open={isDeleteModalOpen}
        header="Authorized Person"
        text="authorized person"
        onCancel={handleDeleteModalCancel}
        onDelete={() => removeData(authorizedId as unknown as number)}
        // isLoading={deleteIsLoading}
      />
    </>
  );
};

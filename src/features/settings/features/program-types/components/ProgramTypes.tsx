import { Dropdown, Menu, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import {
  QUERY_KEY_FOR_PROGRAM_TYPE,
  useGetProgramType,
} from "../hooks/useGetProgramType";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useDelete } from "src/hooks/useDelete";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  programType: string;
  eligibleDependent: string[];
  applicationTemplate: string;
  documentRequirements: string[];
  milestones: string[];
};

export const ProgramTypes = () => {
  // GET REQUEST
  const { data, isLoading } = useGetProgramType();
  const [dataArray, setDataArray] = useState<DataSourceItem[]>([]);
  const [programId, setProgramId] = useState<number>();
  const { removeData } = useDelete({
    queryKey: QUERY_KEY_FOR_PROGRAM_TYPE,
    EndPointUrl: "admin/programtypes/",
  });

  useEffect(() => {
    if (data) {
      const programType: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          programType: item.program_name.charAt(0).toUpperCase() + item.program_name.slice(1),
          eligibleDependent: item.eligibledependents.map(
            (item) => item.dependant
          ),
          applicationTemplate: item.program_link,
          documentRequirements: item.documentrequirements
            .map((item) => item.name),
          milestones: item.milestones.map((item) => item.milestone),
        };
      });
      setDataArray(programType);
    }
  }, [data]);

  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Program Type",
      dataIndex: "programType",
      key: "2",
    },
    {
      title: "Eligible Dependents",
      dataIndex: "eligibleDependent",
      key: "3",
      render(_, record) {
        return record.eligibleDependent.map((item) => (
          <Tag key={item} className="m-1">{item}</Tag>
        ));
      },
    },
    {
      title: "Application Template",
      dataIndex: "applicationTemplate",
      key: "4",
    },
    {
      title: "Document Requirements",
      dataIndex: "documentRequirements",
      key: "5",
      render(_, record) {
        return record.documentRequirements.map((item) => <Tag key={item} className="m-1">{item}</Tag>);
      },
    },
    {
      title: "Milestones",
      dataIndex: "milestones",
      key: "6",
      render(_, record) {
        return record.milestones.map((item) =>   <Tag key={item} className="m-1">{item}</Tag>);
      },
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
                <Menu.Item key="1">
                  {" "}
                  <Link
                    to={
                      appRoute.editProgramType(val.key as unknown as number)
                        .path
                    }
                  >
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setProgramId(val.key as unknown as number);
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

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const showDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };
  return (
    <>
      {/* TABLE */}
      <Table
        loading={isLoading}
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

      {/* DELETE MODAL */}
      {programId && (
        <DeleteModal
          header="Program Type"
          text="program type?"
          open={openDeleteModal}
          onCancel={handleDeleteCancel}
          onDelete={() => removeData(programId)}
        />
      )}
    </>
  );
};

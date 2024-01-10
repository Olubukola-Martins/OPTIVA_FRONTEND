import { Dropdown, Form, Input, Menu, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataSourceItem } from "./ActiveApplications";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AppButton } from "src/components/button/AppButton";
import { useEffect, useState } from "react";
import { useFetchAllApplicants } from "../hooks/useFetchAllApplicants";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../hooks/useGetApplication";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";

export const InactiveApplications = () => {
  const { data, isLoading } = useFetchAllApplicants();
  const [dataArray, setDataArray] = useState<DataSourceItem[]>([]);
  const [form] = Form.useForm();
  const { mutate, isLoading: postLoading } = useUpdateApplicationStatus();
  const queryClient = useQueryClient();
  const [id, setId] = useState<number>();

  useEffect(() => {
    if (data) {
      const inactiveApplicant: DataSourceItem[] = data
        .filter((item) => item.active === false)
        .map((item, index) => ({
          key: item.id,
          sn: index + 1,
          applicantId: item.applicant_unique_id,
          applicantName: item.applicant_name,
          country: item.country,
          programType: item.program_type,
          numberOfDependents: item.number_of_dependents,
          assignedTo: item.assigned_to !== null ? item.assigned_to : "-",
          comment: item.assigned_to !== null ? item.assigned_to : "-",
          // need to return comment
        }));

      setDataArray(inactiveApplicant);
    }
  }, [data]);

  const changeToInactive = () => {
    // console.log('active table to inactive', val)
    mutate(
      { id: id as unknown as number, status: "active" },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
          setOpenActiveModal(false);
        },
      }
    );
  };
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Applicant ID",
      dataIndex: "applicantId",
      key: "2",
    },
    {
      title: " Applicant Name",
      dataIndex: "applicantName",
      key: "3",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "4",
    },
    {
      title: "Program Type",
      dataIndex: "programType",
      key: "5",
    },
    {
      title: "Number Of Dependents",
      dataIndex: "numberOfDependents",
      key: "6",
    },
    {
      title: " Assigned To",
      dataIndex: "assignedTo",
      key: "7",
    },
    {
      title: " Comment",
      dataIndex: "comment",
      key: "8",
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
                  <Link
                    to={
                      appRoute.applicant_details(val.key as unknown as number)
                        .path
                    }
                  >
                    View Applicant Details
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">View Uploaded Documents</Menu.Item>
                <Menu.Item key="3">
                  <Link
                    to={appRoute.comments(val.key as unknown as number).path}
                  >
                    View Comment
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="4"
                  onClick={() => {
                    setId(val.key as unknown as number);
                    showActiveModal();
                  }}
                >
                  Move to Active
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

  // Inactive Modal
  const [openActiveModal, setOpenActiveModal] = useState(false);
  const showActiveModal = () => {
    setOpenActiveModal(true);
  };
  const handleActiveCancel = () => {
    setOpenActiveModal(false);
  };
  return (
    <>
      {/* INACTIVE MODAL */}
      <Modal open={openActiveModal} onCancel={handleActiveCancel} footer={null}>
        <div>
          <h1 className="p-4 font-bold text-center text-lg">Make Active</h1>
          <Form layout="vertical" form={form} onFinish={changeToInactive}>
            <Form.Item label="Reason for Activity" name="activityReason">
              <Input.TextArea rows={4} />
            </Form.Item>
            <div className="flex items-center justify-center gap-4 p-4">
              <AppButton
                label="Cancel"
                variant="transparent"
                containerStyle="border border-blue"
              />
              <AppButton label="Submit" type="submit" isLoading={postLoading} />
            </div>
          </Form>
        </div>
      </Modal>
      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={dataArray}
        className="bg-white rounded-md shadow border mt-8"
        scroll={{ x: 600 }}
        loading={isLoading}
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
        // rowClassName={titleRowBg}
      />
    </>
  );
};

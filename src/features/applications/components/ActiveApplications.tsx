import { Dropdown, Form, Input, Menu, Modal, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useFetchAllApplicants } from "../hooks/useFetchAllApplicants";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../hooks/useGetApplication";
import { useQueryClient } from "react-query";
import { useAcceptApplicant } from "../hooks/useAcceptApplicant";
import { FormEmployeeInput } from "src/features/settings/features/employees/components/FormEmployeeInput";

export type DataSourceItem = {
  key: React.Key;
  sn: number;
  applicantId: string;
  applicantName: string;
  country: string;
  programType: string;
  numberOfDependents: number;
  assignedTo: string;
  comment?: string;
};

export const ActiveApplications = () => {
  const { data, isLoading } = useFetchAllApplicants();
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const [id, setId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate, isLoading: postLoading } = useUpdateApplicationStatus();
  const { mutate: acceptApplicantMutate } = useAcceptApplicant();
  // const { mutate: reassignMutate, isLoading: reassignLoading } =
  //   useReassignApplicant();
  
  useEffect(() => {
    if (data) {
      const inactiveApplicant: DataSourceItem[] = data
        .filter((item) => item.active === true)
        .map((item, index) => ({
          key: item.id,
          sn: index + 1,
          applicantId: item.applicant_unique_id,
          applicantName: item.applicant_name,
          country: item.country,
          programType: item.program_type,
          numberOfDependents: item.number_of_dependents,
          assignedTo: item.assigned_to !== null ? item.assigned_to : "-",
        }));

      setDataArray(inactiveApplicant);
    }
  }, [data]);

  const changeToInactive = () => {
    mutate(
      { id: id as unknown as number, status: "inactive" },
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
        },
      }
    );
  };

  const acceptApplicant = () => {
    acceptApplicantMutate(
      {
        application_id: id as unknown as number,
      },
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
          setOpenInactiveModal(false);
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
                    setId(val.key as unknown as number);
                    acceptApplicant();
                  }}
                >
                  Accept Applicant
                </Menu.Item>
                <Menu.Item key="2">
                  <Link
                    to={
                      appRoute.applicant_details(val.key as unknown as number)
                        .path
                    }
                  >
                    View Applicant Details
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link
                    to={
                      appRoute.processing_strategy_steps(
                        val.key as unknown as number
                      ).path
                    }
                  >
                    Processing Strategy/Steps
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link
                    to={
                      appRoute.applicant_documents(val.key as unknown as number)
                        .path
                    }
                  >
                    View Uploaded Documents
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link
                    to={
                      appRoute.timeline_extensions(val.key as unknown as number)
                        .path
                    }
                  >
                    Timeline Extensions
                  </Link>
                </Menu.Item>
                <Menu.Item key="6" onClick={showReassignModal}>
                  Reassign Applicants
                </Menu.Item>
                <Menu.Item
                  key="7"
                  onClick={() => {
                    setId(val.key as unknown as number);
                    showInactiveModal();
                  }}
                >
                  Move to Inactive
                </Menu.Item>
                <Menu.Item key="8">Mark as Completed</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  const [form] = Form.useForm();
  // Reassign Modal
  const [openReassignModal, setOpenReassignModal] = useState(false);
  const showReassignModal = () => {
    setOpenReassignModal(true);
  };
  const handleReassignCancel = () => {
    setOpenReassignModal(false);
  };

  // Inactive Modal
  const [openInactiveModal, setOpenInactiveModal] = useState(false);
  const showInactiveModal = () => {
    setOpenInactiveModal(true);
  };
  const handleInactiveCancel = () => {
    setOpenInactiveModal(false);
  };

  return (
    <>
      {/* REASSIGN MODAL */}
      <Modal
        open={openReassignModal}
        onCancel={handleReassignCancel}
        footer={null}
      >
        <div>
          <h1 className="p-4 font-bold text-center text-lg">
            Assign Applicant To Service Manager
          </h1>
          <Form layout="vertical" form={form} name="" requiredMark={false}>
            <FormEmployeeInput Form={Form} />

            <Form.Item
              label="Reason for Reassignment"
              name="reasonForReassignment"
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Form>
          <div className="flex items-center justify-center gap-4 p-4">
            <AppButton
              label="Cancel"
              variant="transparent"
              containerStyle="border border-blue"
            />
            <AppButton label="Submit" />
          </div>
        </div>
      </Modal>
      {/* INACTIVE MODAL */}
      <Modal
        open={openInactiveModal}
        onCancel={handleInactiveCancel}
        footer={null}
      >
        <div>
          <h1 className="p-4 font-bold text-center text-lg">Make Inactive</h1>
          <Form layout="vertical" form={form} onFinish={changeToInactive}>
            <Form.Item label="Reason for Inactivity" name="inactivityReason">
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
        className="bg-white rounded-md shadow border mt-2"
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
      />
    </>
  );
};

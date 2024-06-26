import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  QUERY_KEY_FOR_TIMELINE_EXTENSIONS,
  useFetchTimelineExtensions,
} from "../hooks/Application hooks/useFetchTimelineExtensions";
import { formatDate } from "src/features/settings/features/authorizedPersons/components/AuthorizedPersons";
import { useCreateTimelineExtension } from "../hooks/Application hooks/useCreateTimelineExtension";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import { useApproveTimeline } from "../hooks/Application hooks/useApproveTimeline";
import { useRejectTimeline } from "../hooks/Application hooks/useRejectTimeline";

type DataSourceItem = {
  key: React.Key;
  role: string;
  proposedEndDate: string;
  reasonForExtension: string;
  status: string;
  requestedBy: string;
};

const TimelineExtensions = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchTimelineExtensions({
    id: id as unknown as number,
  });
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const { mutate, isLoading: createTimelineLoading } =
    useCreateTimelineExtension();
  const { patchData } = useApproveTimeline("approve");
  const { patchData: rejectData } = useRejectTimeline("reject");
  useEffect(() => {
    if (data) {
      const timelineExtension: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          proposedEndDate: formatDate(item.end_date),
          reasonForExtension:
            item.reason.charAt(0).toUpperCase() + item.reason.slice(1),
          role:
            item.user.user_type.charAt(0).toUpperCase() +
            item.user.user_type.slice(1),
          status: item.is_approved === true ? "Approved" : "Rejected",
          requestedBy: item.user.name,
        };
      });
      setDataArray(timelineExtension);
    }
  }, [data]);

  const createTimelineExtension = (val: any) => {
    const formatDateToString = (endDate: string) => {
      const dateObject = new Date(endDate);

      const day = dateObject.getDate().toString().padStart(2, "0");
      const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
      const year = dateObject.getFullYear().toString();

      return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDateToString(val.endDate.$d);

    mutate(
      {
        application_id: id as unknown as number,
        end_date: formattedDate,
        reason: val.extensionReason,
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIMELINE_EXTENSIONS]);
          setOpenRequestModal(false);
          form.resetFields();
        },
      }
    );
  };

  const approveTimeline = () => {
    patchData(id as unknown as number);
  };

  const rejectTimeline = (val: any) => {
    rejectData(id as unknown as number, val.extensionReject);
    setOpenRejectModal(false);
  };

  //Request Modal
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const showRequestModal = () => {
    setOpenRequestModal(true);
  };
  const handleRequestCancel = () => {
    setOpenRequestModal(false);
  };

  //Reject Modal
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const showRejectModal = () => {
    setOpenRejectModal(true);
  };
  const handleRejectCancel = () => {
    setOpenRejectModal(false);
  };

  // Columns
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Requested by",
      dataIndex: "requestedBy",
      key: "2",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "3",
    },
    {
      title: "Proposed End Date",
      dataIndex: "proposedEndDate",
      key: "4",
    },
    {
      title: "Reason For Extension",
      dataIndex: "reasonForExtension",
      key: "5",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "5",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                {/* <Menu.Item
                  key="1"
                  onClick={() => {
                    setRole(val.role);
                    setRequestedBy(val.requestedBy);
                    setExtensionReason(val.reasonForExtension);
                    setProposedEndDate(val.proposedEndDate);
                    setStatus(val.status);
                    showExtensionModal();
                  }}
                >
                  View
                </Menu.Item> */}
                <Menu.Item key="1" onClick={approveTimeline}>
                  Approve
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    showRejectModal();
                  }}
                >
                  Reject
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
      <Modal
        open={openRequestModal}
        onCancel={handleRequestCancel}
        footer={null}
      >
        <div>
          <h1 className="p-4 font-bold text-center text-lg">
            Request Extension
          </h1>
          <Form
            layout="vertical"
            form={form}
            onFinish={createTimelineExtension}
            requiredMark={false}
          >
            <Form.Item
              rules={textInputValidationRules}
              label="Reason for Extension"
              name="extensionReason"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label="Select Proposed End Date"
              name="endDate"
              rules={generalValidationRules}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <div className="flex items-center justify-center gap-4 p-4">
              <AppButton
                label="Cancel"
                variant="transparent"
                containerStyle="border border-blue"
                handleClick={handleRequestCancel}
                type="reset"
              />
              <AppButton
                label="Submit"
                isLoading={createTimelineLoading}
                type="submit"
              />
            </div>
          </Form>
        </div>
      </Modal>

      <Modal open={openRejectModal} onCancel={handleRejectCancel} footer={null}>
        <div>
          <h1 className="p-4 font-bold text-center text-lg">
            Reason for Rejection
          </h1>
          <Form
            layout="vertical"
            form={form}
            onFinish={(val: any) => rejectTimeline(val)}
            requiredMark={false}
          >
            <Form.Item
              label="Reject Extension"
              name="extensionReject"
              rules={textInputValidationRules}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <div className="flex items-center justify-center gap-4 p-4">
              <AppButton
                label="Cancel"
                variant="transparent"
                containerStyle="border border-blue"
                handleClick={handleRejectCancel}
              />
              <AppButton label="Submit" type="submit" />
            </div>
          </Form>
        </div>
      </Modal>

      <div className="flex justify-between items-center">
        <PageIntro
          title="Timeline Extensions"
          description="Make timeline extensions on applicant's documents"
          linkBack={appRoute.applications}
        />

        <AppButton label="Request Extension" handleClick={showRequestModal} />
      </div>

      <div>
        {/* <div className="flex items-center gap-5 w-1/2 p-4">
          <Input.Search className="w-1/3" placeholder="Search" />
          <Select className="w-1/3" placeholder="Filter" />
        </div> */}
        <Table
          columns={columns}
          dataSource={dataArray}
          scroll={{ x: 600 }}
          loading={isLoading}
          className="bg-white rounded-md shadow border mt-2"
        />
      </div>
    </>
  );
};

export default TimelineExtensions;

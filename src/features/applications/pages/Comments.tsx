import { ColumnsType } from "antd/es/table";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { Dropdown, Form, Input, Menu, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import {
  QUERY_KEY_FOR_COMMENT,
  useGetComment,
} from "../hooks/Application hooks/useGetComment";
import { useParams } from "react-router-dom";
import { formatDate } from "src/features/settings/features/authorizedPersons/components/AuthorizedPersons";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { textInputValidationRules } from "src/utils/formHelpers/validations";
import { useCreateInactiveComment } from "../hooks/Application hooks/useCreateInactiveComment";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  name: string;
  role: string;
  comment: string;
  dateSent: string;
  timeSent: string;
};

export const formatTime = (time: string) => {
  const timeObj = new Date(time);
  let hours = timeObj.getHours();
  const minutes = timeObj.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // Determine whether it's AM or PM
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  return `${hours}:${formattedMinutes} ${amPm}`;
};

const Comments = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data, isLoading } = useGetComment(id as unknown as number);
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const [commentId, setCommentId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate, isLoading: postLoading } = useCreateInactiveComment();

  useEffect(() => {
    if (data) {
      const commentArray: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          comment: item.comment.charAt(0).toUpperCase() + item.comment.slice(1),
          dateSent: formatDate(item.created_at),
          name: item.user.name,
          role:
            item.user.user_type.charAt(0).toUpperCase() +
            item.user.user_type.slice(1),
          timeSent: formatTime(item.created_at),
        };
      });
      setDataArray(commentArray);
    }
  }, [data]);

  const createComment = (val: any) => {
    mutate(
      { application_id: id as unknown as number, comment: val.comment },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_COMMENT]);
          form.resetFields();
          setOpenNewCommentModal(false);
        },
      }
    );
  };
  const { removeData } = useDelete({
    EndPointUrl: "admin/application/comment/",
    queryKey: QUERY_KEY_FOR_COMMENT,
  });
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Role",
      dataIndex: "role",
    },
    {
      key: "4",
      title: "Comment",
      dataIndex: "comment",
    },
    {
      key: "5",
      title: "Date Sent",
      dataIndex: "dateSent",
    },
    {
      key: "6",
      title: "Time Sent",
      dataIndex: "timeSent",
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
                    setSelectedComment(val.comment);
                    showDetailsModal();
                  }}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  key="8"
                  onClick={() => {
                    setCommentId(val.key as unknown as number);
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

  // SELECTED COMMENT
  const [selectedComment, setSelectedComment] = useState<string>();

  // View Details Modal
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
  const showDetailsModal = () => {
    setOpenDetailsModal(true);
  };
  const handleDetailsCancel = () => {
    setOpenDetailsModal(false);
  };
  // New Comment Modal
  const [openNewCommentModal, setOpenNewCommentModal] =
    useState<boolean>(false);
  const showNewCommentModal = () => {
    setOpenNewCommentModal(true);
  };
  const handleNewCommentCancel = () => {
    setOpenNewCommentModal(false);
  };

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
      {/* View Comment Modal */}

      <Modal
        open={openDetailsModal}
        onCancel={handleDetailsCancel}
        footer={null}
      >
        <div className="p-3 my-3 mx-auto">
          <h2 className="font-bold text-lg text-center">Comment Details</h2>
          <div className="border rounded p-2 my-4">{selectedComment}</div>
          <div className="flex justify-end">
            <AppButton
              type="button"
              label="Back"
              handleClick={handleDetailsCancel}
            />
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        header="Comment"
        text="comment"
        open={openDeleteModal}
        onCancel={handleDeleteCancel}
        onDelete={() => {
          removeData(commentId as unknown as number);
          setOpenDeleteModal(false);
        }}
      />

      {/* New Comment Modal */}
      <Modal
        open={openNewCommentModal}
        onCancel={handleNewCommentCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={createComment}
          requiredMark={false}
        >
          <h2 className="font-bold text-lg text-center p-2">New Comment</h2>
          {/* <Form.Item name="participant" label="Select Participant">
            <FormEmployeeInput Form={Form} showLabel={false} />
          </Form.Item> */}
          <Form.Item
            name="comment"
            label="Comment"
            rules={textInputValidationRules}
            // required
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          {/* <Form.Item name="addAttachment">
            <Upload className="text-primary" {...props}>
              Add Attachment
            </Upload>
          </Form.Item> */}
          <div className="flex gap-5 justify-center p-3">
            <AppButton label="Cancel" type="reset" variant="transparent" />
            <AppButton label="Save" type="submit" isLoading={postLoading} />
          </div>
        </Form>
      </Modal>

      <div className=" flex flex-col md:flex-row items-center justify-between p-1">
        <PageIntro
          title="Reasons"
          description="View and make comments on applicants"
          linkBack={appRoute.applications}
        />
        <div>
          <AppButton
            label="New Comment"
            type="button"
            handleClick={showNewCommentModal}
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataArray}
        className="bg-white rounded-md shadow border mt-2"
        scroll={{ x: 600 }}
        loading={isLoading}
       
      />
    </>
  );
};

export default Comments;

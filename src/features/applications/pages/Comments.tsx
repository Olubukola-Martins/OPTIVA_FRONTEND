import { ColumnsType } from "antd/es/table";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Table,
  Upload,
  message,
  UploadProps,
} from "antd";
import { useState } from "react";
import DeleteIcon from "../assets/delete-icon.png";
import { Icon } from "@iconify/react";

type DataSourceItem = {
  sn: number;
  name: string;
  role: string;
  comment: string;
  dateSent: string;
  timeSent: string;
};

const props: UploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const Comments = () => {
  const [form] = Form.useForm();
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
                <Menu.Item key="1" onClick={showDetailsModal}>
                  View
                </Menu.Item>
                <Menu.Item key="8" onClick={showDeleteModal}>
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
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 5; i++) {
    dataSource.push({
      sn: i + 1,
      name: "Ruth Godwin",
      role: "CBP",
      comment: "lorem",
      dateSent: "dd/mm/yyyy",
      timeSent: "dd/mm/yyyy",
    });
  }

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
  const handleSubmit = (val: any) => {
    console.log(val);
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
        <div className="p-3 flex flex-col items-center gap-5 overflow-y-auto">
          <h2 className="font-bold text-lg">Comment Details</h2>
          <div className="border rounded-sm p-2 max-h-52 overflow-y-auto">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
            mollitia blanditiis quidem omnis ipsum ut corrupti ipsam tempora sed
            ullam voluptas accusamus nobis aliquam ipsa explicabo porro possimus
            laborum iure recusandae velit rerum earum, eius et! Neque dolorum
            architecto quasi! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Cumque, vel? Eligendi totam tempore sed aspernatur
            exercitationem deleniti unde sunt corrupti dolorem quia ab sequi
            dolor, est vel fuga quas doloribus. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Repudiandae adipisci facere esse
            beatae quis totam fugiat architecto. Aspernatur quae, error labore
            consequatur voluptatum voluptatibus laborum ea quasi est maxime ut.
          </div>
          <AppButton
            type="button"
            label="Back"
            handleClick={handleDetailsCancel}
          />
        </div>
      </Modal>
      {/* Delete Modal */}
      <Modal open={openDeleteModal} onCancel={handleDeleteCancel} footer={null}>
        <div className="p-3 flex flex-col items-center gap-5">
          <img src={DeleteIcon} alt="" />
          <h2 className="font-bold text-lg">Delete Comment</h2>
          <p>Are you sure you would like to delete this Comment?</p>
          <div className="flex gap-5">
            <AppButton
              variant="transparent"
              label="Cancel"
              handleClick={handleDeleteCancel}
            />
            <AppButton type="button" label="Delete" />
          </div>
        </div>
      </Modal>
      {/* New Comment Modal */}
      <Modal
        open={openNewCommentModal}
        onCancel={handleNewCommentCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <h2 className="font-bold text-lg text-center p-2">New Comment</h2>
          <Form.Item name="participant" label="Select Participant" required>
            <Select
              size="large"
              options={[
                {
                  value: "Ruth Godwin",
                  label: "Ruth Godwin",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="comment" label="Comment" required>
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item name="addAttachment">
            <Upload className="text-primary" {...props}>
              Add Attachment
            </Upload>
          </Form.Item>
          <div className="flex gap-5 justify-center p-3">
            <AppButton label="Cancel" type="reset" variant="transparent" />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>
      <div className=" flex flex-col md:flex-row items-center justify-between p-1">
        <PageIntro
          title="Comments"
          description="View and make comments on applicants documents"
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
        dataSource={dataSource}
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
    </>
  );
};

export default Comments;

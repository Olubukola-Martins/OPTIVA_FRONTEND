import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import SuccessModal from "src/features/settings/components/SuccessModal";

interface DataRow {
  key: number;
}

const NewEscalation = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<DataRow[]>([
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
  ]);

  const handleDelete = (item: any) => {
    setData((pre) => {
      return pre.filter((row) => row.key !== item.key);
    });
    console.log("deleted key", item);
    console.log("data on delete", data);
  };
  const columns: ColumnsType<DataRow> = [
    {
      title: "Level",
      key: "level",
      render: (_: any, record: DataRow, index: number) => {
        return index + 1;
      },
    },
    {
      key: "escalateTo",
      title: "Escalate To",
      render: (_: any, record: DataRow, index: number) => (
        <Form.Item name={`${index + 1}-escalateTo`}>
          <Select
            placeholder="Select Role"
            options={[
              { value: "Service Manager 1", label: "Service Manager 1" },
              { value: "Service Manager 2", label: "Service Manager 2" },
              { value: "Client Manager 1", label: "Client Manager 1" },
              { value: "Client Manager 2", label: "Client Manager 2" },
            ]}
          />
        </Form.Item>
      ),
    },
    {
      key: "employeeName",
      title: "Employee Name",
      render: (_: any, record: DataRow, index: number) => (
        <Form.Item name={`${index + 1}-employeeName`}>
          <Select
            placeholder="Select Employee"
            options={[
              { value: "George Boyd", label: "George Boyd" },
              { value: "Ade Tola", label: "Ade Tola" },
              { value: "Toni Tones", label: "Toni Tones" },
            ]}
          />
        </Form.Item>
      ),
    },
    {
      key: "escalateAfter",
      title: "Escalate After",
      render: (_: any, record: DataRow, index: number) => (
        <Form.Item name={`${index + 1}-escalateAfter`}>
          <Select
            placeholder="Select Duration"
            options={[
              { value: "8 Hours", label: "8 Hours" },
              { value: "2 Hours", label: "2 Hours" },
              { value: "5 Hours", label: "5 Hours" },
            ]}
          />
        </Form.Item>
      ),
    },
    {
      key: "delete",
      title: "Delete",
      render: (record: DataRow) => (
        <DeleteOutlined
          className="text-red-500"
          onClick={() => handleDelete(record)}
        />
      ),
    },
  ];

  const handleAddTableRow = () => {
    const newKey = Math.random() * 1000;
    const newValue = { key: newKey };
    setData((pre) => {
      return [...pre, newValue];
    });
    console.log("data on add", data);
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <SuccessModal
        open={showSuccessModal}
        description="Escalation Added Successfully"
        handleClose={() => {
          setShowSuccessModal(false);
        }}
      />
      <PageIntro
        title="Define Escalation "
        description="Define new escalation on the system"
        linkBack={appRoute.escalation}
      />
      <div className="border rounded-xl border-gray-500 mt-10  ">
        <Form
          name="defineEscalation"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <div className="flex flex-row w-full">
            <div>
              <FormItem label="Escalation Name" name="escalationName">
                <Input placeholder="e.g (Accept Client)" />
              </FormItem>
              <FormItem label="Select Role" name="selectRole">
                <Select
                  defaultValue={"Service Manager 2"}
                  options={[
                    { value: "Service Manager 1", label: "Service Manager 1" },
                    { value: "Service Manager 2", label: "Service Manager 2" },
                    { value: "Client Manager 1", label: "Client Manager 1" },
                    { value: "Client Manager 2", label: "Client Manager 2" },
                  ]}
                />
              </FormItem>
              <FormItem label="Select Task" name="selectTask">
                <Select defaultValue={"Accept Client"} disabled={true} />
              </FormItem>
              <FormItem label="Task Deadline">
                <Select
                  defaultValue={"2 Hours"}
                  options={[
                    { value: "8 Hours", label: "8 Hours" },
                    { value: "2 Hours", label: "2 Hours" },
                  ]}
                />
              </FormItem>
            </div>
            <div>
              <FormItem
                label="Select Reminder Frequecy"
                name="reminderFrequency"
              >
                <Select
                  defaultValue={"8 Hours"}
                  options={[
                    { value: "8 Hours", label: "8 Hours" },
                    { value: "2 Hours", label: "2 Hours" },
                    { value: "5 Hours", label: "5 Hours" },
                  ]}
                />
              </FormItem>
              <div>
                <FormItem label="Escalation Levels" name="escalationLevels">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="middle"
                    bordered
                  />
                </FormItem>
                <PlusCircleOutlined
                  className="text-green-600 text-2xl"
                  onClick={handleAddTableRow}
                />
              </div>
            </div>
          </div>
          <div>
            <AppButton type="submit" />
            {/* <AppButton /> */}
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewEscalation;

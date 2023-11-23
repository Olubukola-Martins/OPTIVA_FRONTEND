import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { END_POINT } from "src/config/environment";
import { appRoute } from "src/config/routeMgt/routePaths";
import SuccessModal from "src/features/settings/components/SuccessModal";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";

interface DataRow {
  key: number;
  escalateTo: JSX.Element;
  employeeName: JSX.Element;
  escalateAfter: JSX.Element;
}

const NewEscalation = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
    const { data: allRoles, isLoading: allRolesLoading } = useFetchAllItems({
      queryKey: "roles",
      urlEndPoint: `${END_POINT.BASE_URL}/admin/roles`,
    });
    const { data: allEmployees, isLoading: allEmployeesLoading } =
      useFetchAllItems({
        queryKey: "employees",
        urlEndPoint: `${END_POINT.BASE_URL}/admin/employees`,
      });

      const addAfterDropdown = [
        { value: 1, label: "Hours" },
        { value: 2, label: "Days" },
        { value: 3, label: "Weeks" },
      ];

  const escalateToItem = (key: number) => {
    return (
      <Form.Item
        name={`${key}-escalateTo`}
        style={{ paddingBottom: 0, marginBottom: 0 }}
      >
        <Select
          popupMatchSelectWidth={false}
          placeholder="Select Role"
          // loading={allRolesLoading}
          options={
            allRoles?.data
              ? allRoles?.data.map((role) => {
                  return { label: role.name, value: role.id };
                })
              : []
          }
        />
      </Form.Item>
    );
  };
  const employeeNameItem = (key: number) => {
    return (
      <Form.Item
        name={`${key}-employeeName`}
        style={{ paddingBottom: 0, marginBottom: 0 }}
      >
        <Select
          popupMatchSelectWidth={false}
          placeholder="Select Employee"
          loading={allEmployeesLoading}
          options={
            allEmployees?.data
              ? allEmployees?.data.map((employee) => {
                  return { label: employee.name, value: employee.id };
                })
              : []
          }
        />
      </Form.Item>
    );
  };
  const escalateAfterItem = (key: number) => {
    return (
      <Form.Item
        name={`${key}-escalateAfter`}
        style={{ paddingBottom: 0, marginBottom: 0 }}
        className="text-red-500 min-w-[150px]"
      >
        <InputNumber min={0} addonAfter={<Select defaultValue={1} options={addAfterDropdown} />} />
      </Form.Item>
    );
  };
  const [data, setData] = useState<DataRow[]>([
    {
      key: 1,
      escalateTo: escalateToItem(1),
      employeeName: employeeNameItem(1),
      escalateAfter: escalateAfterItem(1),
    },
    {
      key: 2,
      escalateTo: escalateToItem(2),
      employeeName: employeeNameItem(2),
      escalateAfter: escalateAfterItem(2),
    },
    {
      key: 3,
      escalateTo: escalateToItem(3),
      employeeName: employeeNameItem(3),
      escalateAfter: escalateAfterItem(3),
    },
    {
      key: 4,
      escalateTo: escalateToItem(4),
      employeeName: employeeNameItem(4),
      escalateAfter: escalateAfterItem(4),
    },
  ]);
  const handleDelete = (item: any) => {
    setData((pre) => {
      return pre.filter((row) => row.key !== item.key);
    });
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
      dataIndex: "escalateTo",
    },
    {
      key: "employeeName",
      title: "Employee Name",
      dataIndex: "employeeName",
    },
    {
      key: "escalateAfter",
      title: "Escalate After",
      dataIndex: "escalateAfter",
    },
    {
      key: "delete",
      title: "Delete",
      render: (record: DataRow) => (
        <DeleteOutlined
          className="text-red-500 flex  justify-center"
          onClick={() => handleDelete(record)}
        />
      ),
    },
  ];

  const handleAddTableRow = () => {
    const newKey = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    const newValue = {
      key: newKey,
      escalateTo: escalateToItem(newKey),
      employeeName: employeeNameItem(newKey),
      escalateAfter: escalateAfterItem(newKey),
    };
    setData((pre) => {
      return [...pre, newValue];
    });
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
          // navigate(appRoute.escalation);
        }}
      />
      <PageIntro
        title="Define Escalation "
        description="Define new escalation on the system"
        linkBack={appRoute.escalation}
      />
      <div className="border rounded-xl border-gray-300 mt-10  ">
        <Form
          name="defineEscalation"
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className="px-[45px] max-md:px-4 max-xl:px-6 py-10 max-md:py-3 max-xl:py-6 flex flex-col"
        >
          <div className="flex flex-col lg:flex-row gap-2 justify-between lg:gap-10">
            <div className="w-3/4">
              <FormItem
                label="Escalation Name"
                name="escalationName"
                className="sm:w-1/2 lg:w-full"
              >
                <Input placeholder="e.g (Accept Client)" />
              </FormItem>
              <FormItem
                label="Select Role"
                name="selectRole"
                className="sm:w-1/2 lg:w-full"
              >
                <Select
                  placeholder="Select Role"
                  loading={allRolesLoading}
                  options={allRoles?.data ? allRoles?.data.map((role)=>{return {label:role.name,value:role.id}}) : []}
                  // options={[
                  //   { value: "Service Manager 1", label: "Service Manager 1" },
                  //   { value: "Service Manager 2", label: "Service Manager 2" },
                  //   { value: "Client Manager 1", label: "Client Manager 1" },
                  //   { value: "Client Manager 2", label: "Client Manager 2" },
                  // ]}
                />
              </FormItem>
              <FormItem
                label="Select Task"
                name="selectTask"
                className="sm:w-1/2 lg:w-full"
              >
                <Select defaultValue={"Accept Client"} disabled={true} />
              </FormItem>
              <FormItem
                label="Task Deadline"
                name="deadline"
                className="sm:w-1/2 lg:w-full"
              >
                <InputNumber
                  min={0}
                  addonAfter={
                    <Select defaultValue={1} options={addAfterDropdown} />
                  }
                />

                {/* <Select
                  defaultValue={"2 Hours"}
                  options={[
                    { value: "8 Hours", label: "8 Hours" },
                    { value: "2 Hours", label: "2 Hours" },
                  ]}
                /> */}
              </FormItem>
            </div>
            <div>
              <FormItem
                label="Select Reminder Frequecy"
                name="reminderFrequency"
                className="sm:w-fit"
              >
                <InputNumber
                  min={0}
                  addonAfter={
                    <Select defaultValue={1} options={addAfterDropdown} />
                  }
                />

                {/* <Select
                  defaultValue={"8 Hours"}
                  options={[
                    { value: "8 Hours", label: "8 Hours" },
                    { value: "2 Hours", label: "2 Hours" },
                    { value: "5 Hours", label: "5 Hours" },
                  ]}
                /> */}
              </FormItem>
              <div>
                <FormItem label="Escalation Levels" name="escalationLevels">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="small"
                    bordered
                    // className="max-w-[400px]"
                    scroll={{ x: 250 }}
                  />
                </FormItem>
                <PlusCircleOutlined
                  className="text-green-600 text-2xl"
                  onClick={handleAddTableRow}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-8 w-full justify-end pt-10">
            <AppButton
              variant="transparent"
              type="button"
              label="Cancel"
              handleClick={() => navigate(appRoute.escalation)}
            />
            <AppButton
              type="submit"
              label="Save"
              handleClick={() => setShowSuccessModal(true)}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewEscalation;

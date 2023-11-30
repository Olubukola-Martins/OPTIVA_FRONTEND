import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Popover,
  Select,
  Table,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { END_POINT } from "src/config/environment";
import { appRoute } from "src/config/routeMgt/routePaths";
import SuccessModal from "src/features/settings/components/SuccessModal";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import useAddEscalation from "../hooks/useAddEscalation";
import EscalationDateErrorModal from "../components/EscalationDateErrorModal";
import { IEscalationBody } from "src/features/settings/types/settingsType";
import { useFetchEmployees } from "../../employees/hooks/useFetchEmployees";

interface DataRow {
  key: number;
  escalateTo: JSX.Element;
  employeeName: JSX.Element;
  escalateAfter: JSX.Element | void;
}
const NewEscalation = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDateErrorModal, setShowDateErrorModal] = useState(false);
  const [openTimePop, setopenTimePop] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { addEscalation } = useAddEscalation();
  const { data: allRoles, isLoading: allRolesLoading } = useFetchAllItems({
    queryKey: "roles",
    urlEndPoint: `${END_POINT.BASE_URL}/admin/roles`,
  });
   const { data: employeeData, isLoading: loadEmployee } =
     useFetchEmployees("active-employees");
  // const { data: allEmployees, isLoading: allEmployeesLoading } =
  //   useFetchAllItems({
  //     queryKey: "employees",
  //     urlEndPoint: `${END_POINT.BASE_URL}/admin/employees`,
  //   });
  const TimePopover: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return (
      <Popover
        content={
          <>
            <span>
              Please select a future date and time.
              <br />
              Date and time must be after the current date and time.
            </span>
            <AppButton
              handleClick={() => {
                setopenTimePop(false);
              }}
              label="Ok"
            />
          </>
        }
        title={
          <p className="text-red-600 font-semibold">Invalid Date Selection</p>
        }
        open={openTimePop}
      >
        {children}
      </Popover>
    );
  };

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
            allRoles?.data.map((role: { name: string; id: number }) => {
              return { label: role.name, value: role.id };
            })
            // : []
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
          loading={loadEmployee}
          options={
            employeeData
              ? employeeData.map(
                  (employee: { name: string; id: number }) => {
                    return { label: employee.name, value: employee.id };
                  }
                )
              : []
          }
        />
      </Form.Item>
    );
  };
  const escalateAfterItem = (key: number) => {
    return (
      <TimePopover>
        <Form.Item
          name={`${key}-escalateAfter`}
          style={{ paddingBottom: 0, marginBottom: 0 }}
          className=" min-w-[150px]"
        >
          <InputNumber min={0} addonAfter={"Hour(s)"} />
        </Form.Item>
      </TimePopover>
    );
  };
  const tableInitialData = [
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
  ];
  useEffect(() => {
    if (!allRolesLoading && allRoles) setData(tableInitialData);
  }, [allRolesLoading, allRoles, employeeData, loadEmployee]);

  const [data, setData] = useState<DataRow[]>(tableInitialData);
  const deleteEscalationLevel = (item: DataRow) => {
    setData((pre) => {
      return pre.filter((row) => row.key !== item.key);
    });
  };

  const columns: ColumnsType<DataRow> = [
    {
      title: "Level",
      key: "level",
      render: (_, record: DataRow, index: number) => {
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
          onClick={() => deleteEscalationLevel(record)}
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

  // HANDLE SUBMIT
  const handleAddEscalation = (formValues: any) => {
    console.log(formValues);
    const levels: {
      duration: number | undefined;
      role_id: number;
      employee_id: number;
    }[] = [];
    Object.keys(formValues).forEach((key) => {
      const [prefix, field] = key.split("-");

      if (field === "employeeName") {
        const setNumber = parseInt(prefix);
        if (!isNaN(setNumber)) {
          const duration = formValues[`${setNumber}-escalateAfter`];
          const roleId = formValues[`${setNumber}-escalateTo`];
          const employeeId = formValues[`${setNumber}-employeeName`];

          // Add data to levels array if all required fields are present
          if (
            duration !== undefined &&
            roleId !== undefined &&
            employeeId !== undefined
          ) {
            levels.push({
              duration: duration,
              role_id: roleId,
              employee_id: employeeId,
            });
          }
        }
      }
    });

    const escalationBody: IEscalationBody = {
      escalation_name: formValues.escalationName,
      role_id: parseInt(formValues.selectRole),
      task: formValues.selectTask,
      deadline: formValues.deadline,
      reminder_frequency: formValues.reminderFrequency,
      levels: levels,
    };
    console.log("escalationBody", escalationBody);
    addEscalation(escalationBody);
    //onSuccess setShowSuccessModal(true);
    // onSuccess  Form.resetfieldsvalue
  };
  return (
    <>
      <SuccessModal
        open={showSuccessModal}
        description="Escalation Added Successfully"
        handleClose={() => {
          setShowSuccessModal(false);
        }}
        buttonLabel="Back"
      />
      <EscalationDateErrorModal
        open={showDateErrorModal}
        handleClose={() => {
          setShowDateErrorModal(false);
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
          onFinish={handleAddEscalation}
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
                  options={
                    allRoles?.data
                      ? allRoles?.data.map(
                          (role: { name: string; id: number }) => {
                            return { label: role.name, value: role.id };
                          }
                        )
                      : []
                  }
                />
              </FormItem>
              <FormItem
                label="Task"
                name="selectTask"
                className="sm:w-1/2 lg:w-full"
              >
                <Input placeholder="Input Task" />
              </FormItem>
              <TimePopover>
                <FormItem
                  label="Task Deadline"
                  name="deadline"
                >
                  <InputNumber min={0} addonAfter={"Hour(s)"} />
                </FormItem>
              </TimePopover>
            </div>
            <div>
              <FormItem
                label="Select Reminder Frequecy"
                name="reminderFrequency"
                className="sm:w-fit"
              >
                <InputNumber min={0} addonAfter={"Hour(s)"} />
              </FormItem>
              <div>
                <FormItem label="Escalation Levels" name="escalationLevels">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="small"
                    bordered
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
            <AppButton type="submit" label="Save" handleClick={() => {}} />
          </div>
        </Form>
      </div>
    </>
  );
};
export default NewEscalation;

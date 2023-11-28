import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popover,
  Select,
  Switch,
  Table,
} from "antd";
import { RuleObject } from "antd/es/form";
import FormItem from "antd/es/form/FormItem";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { END_POINT } from "src/config/environment";
import { appRoute } from "src/config/routeMgt/routePaths";
import SuccessModal from "src/features/settings/components/SuccessModal";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import { useFetchSingleItem } from "src/features/settings/hooks/useFetchSingleItem";
import { QUERY_KEY_ESCALATION, escalationURL } from "../hooks/useAddEscalation";
import { IEscalationBody } from "src/features/settings/types/settingsType";
import useUpdateEscalation from "../hooks/useUpdateEscalation";

interface DataRow {
  key: number;
  escalateTo: JSX.Element;
  employeeName: JSX.Element;
  escalateAfter: JSX.Element;
}
// const addAfterDropdown = [
//   { value: 1, label: "Hours" },
//   { value: 24, label: "Days" },
//   { value: 168, label: "Weeks" },
// ];

const EditEscalation = () => {
  const { id } = useParams();
  const itemId = parseInt(id as string);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tableInitialData, setTableInitialData] = useState<DataRow[]>([]);
 const {editEscalation} = useUpdateEscalation();
  const [reminderType, setReminderType] = useState<number>(1);
  const [openTimePop, setopenTimePop] = useState(false);
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
  const { data: singleEscData, isLoading: singleEscisLoading } =
    useFetchSingleItem({
      queryKey: QUERY_KEY_ESCALATION,
      urlEndPoint: escalationURL,
      itemId,
    });

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
  // const disabledDate = (date: Dayjs) => {
  //   return date ? date < moment().startOf("day") : false;
  // };

  // const calculateHoursDifference = (date: Dayjs | null) => {
  //   if (!date || date.isBefore(dayjs(), "second")) {
  //     return;
  //   } else {
  //     const currentTime = dayjs();
  //     const hoursDifference = parseFloat(
  //       (date.diff(currentTime, "minutes") / 60).toFixed(1)
  //     );
  //     return hoursDifference;
  //   }
  // };
  // const preventOldTime = (date: Dayjs | null) => {
  //   if (date) {
  //     date.isBefore(dayjs(), "second") && setopenTimePop(true);
  //   } else {
  //     return;
  //   }
  // };

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
          loading={allEmployeesLoading}
          options={
            allEmployees?.data
              ? allEmployees?.data.map(
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
          <InputNumber min={0} addonAfter={"Day(s)"} />
        </Form.Item>
      </TimePopover>
    );
  };
  useEffect(() => {
    if (!allRolesLoading && allRoles) setTableInitialData(tableInitialData);
  }, [
    allRolesLoading,
    allRoles,
    allEmployees,
    allEmployeesLoading,
    tableInitialData,
  ]);

  useEffect(() => {
    if (singleEscData && !Array.isArray(singleEscData)) {
      const realData = singleEscData.data.levels?.map(
        (level: { id: number }) => {
          return {
            key: level.id,
            escalateTo: escalateToItem(level.id),
            employeeName: (
              <Form.Item
                name={`${level.id}-employeeName`}
                style={{ paddingBottom: 0, marginBottom: 0 }}
              >
                <Select
                  defaultValue={"xyz"} // replace with employee id skeemer when API for escalation is working
                  popupMatchSelectWidth={false}
                  placeholder="Select Employee"
                  loading={allEmployeesLoading}
                  options={
                    allEmployees?.data
                      ? allEmployees?.data.map(
                          (employee: { name: string; id: number }) => {
                            return { label: employee.name, value: employee.id };
                          }
                        )
                      : []
                  }
                />
              </Form.Item>
            ),
            escalateAfter: escalateAfterItem(level.id),
          };
        }
      );
      setTableInitialData(realData);
      const { role_id, task, deadline, reminder_frequency, levels } =
        singleEscData.data;
      const frequency =
        reminder_frequency < 24
          ? reminder_frequency
          : reminder_frequency < 168
          ? parseFloat((reminder_frequency / 24).toFixed(1))
          : parseFloat((reminder_frequency / 168).toFixed(1));

      reminder_frequency > 23
        ? setReminderType(24)
        : reminder_frequency > 167
        ? setReminderType(168)
        : setReminderType(1);

      //  levels data
      const levelsData: { [key: string]: number } = {};
      levels.forEach(
        (level: {
          id: number;
          employee_id: number;
          duration: number;
          role_id: number;
        }) => {
          const levelId = level.id.toString(); // Convert the level ID to a string
          levelsData[`${levelId}-employeeName`] = level.employee_id;
          levelsData[`${levelId}-escalateAfter`] = level.duration;
          levelsData[`${levelId}-escalateTo`] = level.role_id;
        }
      );

      // Setform fields
      form.setFieldsValue({
        selectRole: role_id,
        selectTask: task,
        deadline: deadline,
        reminderFrequency: frequency,
        ...levelsData,
      });
    }
  }, [singleEscData, singleEscisLoading, reminderType]);

  // handle table delete icons
  const deleteEscalationLevel = (item: DataRow) => {
    setTableInitialData((pre) => {
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
          className="text-red-500  justify-center"
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
    setTableInitialData((pre) => {
      return [...pre, newValue];
    });
  };

  // HANDLE SUBMIT
  const handleEditEscalation = (formValues: any) => {
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

    const escalationBody: Omit<IEscalationBody, "escalation_name"> = {
      // escalation_name: formValues.escalationName,
      role_id: parseInt(formValues.selectRole),
      task: formValues.selectTask,
      deadline: formValues.deadline,
      reminder_frequency: formValues.reminderFrequency,
      levels: levels,
    };
    console.log("escalationBody", escalationBody);
    editEscalation(itemId,escalationBody);
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
          // navigate(appRoute.escalation);
        }}
      />
      <PageIntro
        title="Edit Escalation "
        description="Edit preset  escalation on the system"
        linkBack={appRoute.escalation}
      />
      <div className="border rounded-xl border-gray-300 mt-10  ">
        <Form
          name="editEscalation"
          layout="vertical"
          onFinish={handleEditEscalation}
          form={form}
          className="px-[45px] max-md:px-4 max-xl:px-8 py-10 max-md:py-3 max-xl:py-6 flex flex-col"
        >
          <div className="flex flex-col lg:flex-row gap-2 justify-between lg:gap-10">
            <div className="w-full">
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
                {/* <Select defaultValue={"Accept Client"} disabled={true} /> */}
                <Input placeholder="Input Task" />
              </FormItem>
              <TimePopover>
                <FormItem
                  label="Task Deadline"
                  name="deadline"
                  className="sm:w-1/2 lg:w-full"
                >
                  <InputNumber min={0} addonAfter={"Day(s)"} />
                </FormItem>
              </TimePopover>
              <FormItem
                label="Select Reminder Frequecy"
                name="reminderFrequency"
                className="sm:w-fit"
              >
                <InputNumber min={0} addonAfter={"Day(s)"} />
              </FormItem>
            </div>
            <div>
              <FormItem label="Escalation Levels" name="escalationLevels">
                <Table
                  columns={columns}
                  dataSource={tableInitialData}
                  pagination={false}
                  size="small"
                  bordered
                  scroll={{ x: 300 }}
                />
              </FormItem>
              <PlusCircleOutlined
                className="text-green-600 text-2xl"
                onClick={handleAddTableRow}
              />
              <div>
                <div className="pt-3 flex justify-between">
                  <p className="text-base font-semibold">Delegate Task</p>
                  <FormItem
                    name="delegateTask"
                    className="flex justify-end items-end"
                    noStyle
                  >
                    <Switch className="bg-gray-400" />
                  </FormItem>
                </div>
                <p>
                  Select whether you want the escalated roles to have the
                  ability to perform the task.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-8 w-full justify-end pt-10">
            <AppButton
              variant="transparent"
              type="button"
              label="Cancel"
              handleClick={() => {
                navigate(appRoute.escalation);
                form.resetFields();
              }}
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

export default EditEscalation;

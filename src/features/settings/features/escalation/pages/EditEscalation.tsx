import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Switch,
  Table,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { END_POINT } from "src/config/environment";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import { useFetchSingleItem } from "src/features/settings/hooks/useFetchSingleItem";
import { QUERY_KEY_ESCALATION, escalationURL } from "../hooks/useAddEscalation";
import useUpdateEscalation from "../hooks/useUpdateEscalation";
import { useFetchEmployees } from "../../employees/hooks/useFetchEmployees";

interface DataRow {
  key: number;
  escalateTo: JSX.Element;
  employeeName: JSX.Element;
  escalateAfter: JSX.Element;
}

const EditEscalation = () => {
  const { id } = useParams();
  const itemId = parseInt(id as string);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentKey, setCurrentKey] = useState(0);
  const [tableInitialData, setTableInitialData] = useState<DataRow[]>([]);
  const [currentEscalateTo, setCurrentEscalateTo] = useState<number>();
  const [dynamicDta, setDynamicData] = useState<DataRow[]>([]);
  const [originalData, setOriginalData] = useState<DataRow[]>([]);
  const { editEscalation } = useUpdateEscalation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: allRoles, isLoading: allRolesLoading } = useFetchAllItems({
    queryKey: "roles",
    urlEndPoint: `${END_POINT.BASE_URL}/admin/roles`,
  });
  const { data: employeeData, isLoading: employeeLoading } = useFetchEmployees({
    currentUrl: "active-employees",
  });

  const {
    data: singleEscData,
    isLoading: singleEscisLoading,
    isFetching,
  } = useFetchSingleItem({
    queryKey: QUERY_KEY_ESCALATION,
    urlEndPoint: escalationURL,
    itemId,
  });

  const escalateToItem = (key: number) => {
    return (
      <Form.Item
        name={`${key}-escalateTo`}
        style={{ paddingBottom: 0, marginBottom: 0 }}
      >
        <Select
          popupMatchSelectWidth={false}
          placeholder="Select Role"
          loading={allRolesLoading}
          onSelect={(val: number) => {
            setCurrentEscalateTo(val);
            setCurrentKey(key);
            form.resetFields([`${key}-employeeName`]);

          }}
          options={allRoles?.data.map((role: { name: string; id: number }) => {
            return { label: role.name, value: role.id };
          })}
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
          loading={employeeLoading}
          onSelect={() => {
            setCurrentKey(key);
          }}
          onClick={() => {
            setCurrentKey(key);
          }}
          notFoundContent={"No employee available for this role"}
          options={
            // form.getFieldValue(`${key}-escalateTo`)
            //   ? 
              employeeData?.data
                  .filter(
                    (employee) =>
                      employee.user.role_id ===
                      form.getFieldValue(`${key}-escalateTo`)
                  )
                  .map((employee: { name: string; id: number }) => {
                    return { label: employee.name, value: employee.id };
                  })
              // : 
              // employeeData?.data.map(
              //     (employee: { name: string; id: number }) => {
              //       return { label: employee.name, value: employee.id };
              //     }
              //   ) 
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
        className=" min-w-[150px]"
      >
        <InputNumber min={0} addonAfter={"Hour(s)"} />
      </Form.Item>
    );
  };

  useEffect(() => {
    const tempData = [...originalData, ...dynamicDta].map((item) => {
      if (item.key === currentKey) {
        return {
          key: item.key,
          escalateTo: item.escalateTo,
          employeeName: (
            <Form.Item
              name={`${currentKey}-employeeName`}
              style={{ paddingBottom: 0, marginBottom: 0 }}
            >
              <Select
                popupMatchSelectWidth={false}
                placeholder="Select Employee"
                loading={employeeLoading}
                onSelect={() => {
                  setCurrentKey(currentKey);
                }}
                onClick={() => {
                  setCurrentKey(currentKey);
                }}
          notFoundContent={"No employee available for this role"}
                options={
                  currentEscalateTo &&
                  form.getFieldValue(`${currentKey}-escalateTo`)
                    ? employeeData?.data
                        .filter(
                          (employee) =>
                            employee.user.role_id ===
                            form.getFieldValue(`${currentKey}-escalateTo`)
                        )
                        .map((employee: { name: string; id: number }) => {
                          return {
                            label: employee.name,
                            value: employee.id,
                          };
                        })
                    : []
                    //  employeeData?.data.map(
                    //     (employee: { name: string; id: number }) => {
                    //       return {
                    //         label: employee.name,
                    //         value: employee.id,
                    //       };
                    //     }
                    //   )
                }
              />
            </Form.Item>
          ),
          escalateAfter: item.escalateAfter,
        };
      } else {
        return item;
      }
    });
    setTableInitialData([...tempData]);
  }, [originalData, dynamicDta, currentEscalateTo, currentKey,form,allRolesLoading,employeeLoading,allRoles, employeeData?.data]);

  useEffect(() => {
    if (singleEscData && !Array.isArray(singleEscData)) {
      const realData = singleEscData.data.levels?.map(
        (level: { pivot: any; id: number }) => {
          return {
            key: level.id,
            escalateTo: escalateToItem(level.id),
            employeeName: (
              <Form.Item
                name={`${level.id}-employeeName`}
                style={{ paddingBottom: 0, marginBottom: 0 }}
              >
                <Select
                  popupMatchSelectWidth={false}
                  placeholder="Select Employee"
                  loading={employeeLoading}
                  onSelect={() => {
                    setCurrentEscalateTo(undefined);
                  }}
          notFoundContent={"No employee available for this role"}
                  // options={employeeOptions}
                  options={

                    form.getFieldValue(`${level.id}-escalateTo`)
                    ? employeeData?.data
                        .filter(
                          (employee) =>
                            employee.user.role_id ===
                            form.getFieldValue(`${level.id}-escalateTo`)
                        )
                        .map((employee: { name: string; id: number }) => {
                          return { label: employee.name, value: employee.id };
                        })
                    :
                    employeeData?.data.map(
                        (employee: { name: string; id: number }) => {
                          return { label: employee.name, value: employee.id };
                        }
                      ) 
      
      
                  }
                />
              </Form.Item>
            ),
            escalateAfter: escalateAfterItem(level.id),
          };
        }
      );
      setOriginalData(realData);
      const { role_id, task, deadline, reminder_frequency, levels } =
        singleEscData.data;

      //  levels data
      const levelsData: { [key: string]: number } = {};
      levels?.forEach(
        (level: { role: any; employee: any; id: number; duration: number }) => {
          const levelId = level.id.toString();
          levelsData[`${levelId}-employeeName`] = level.employee[0].id;
          levelsData[`${levelId}-escalateAfter`] = level.duration;
          levelsData[`${levelId}-escalateTo`] = level.role[0].id;
        }
      );

      // Setform fields
      form.setFieldsValue({
        selectRole: role_id,
        selectTask: task,
        deadline: deadline,
        reminderFrequency: reminder_frequency,
        ...levelsData,
      });
    }
  }, [
    singleEscData,
    singleEscisLoading,
    allRoles,
    allRolesLoading,
    employeeData,
    employeeData?.data,
    employeeLoading,
    form,
  ]);

  // handle table delete icons
  const deleteEscalationLevel = (item: DataRow) => {
    setTableInitialData((pre) => pre.filter((row) => row.key !== item.key));
    if (dynamicDta.map((data) => data.key).includes(item.key)) {
      setDynamicData((pre) => pre.filter((row) => row.key !== item.key));
    } else {
      setOriginalData((pre) => pre.filter((row) => row.key !== item.key));
    }
  };

  const columns: ColumnsType<DataRow> = [
    {
      title: "Level",
      key: "level",
      render: (_: any, __: DataRow, index: number) => {
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

    setDynamicData([...dynamicDta, newValue]);
  };

  // HANDLE SUBMIT
  const handleEditEscalation = (formValues: any) => {
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

    const escalationBody = {
      escalation_name: singleEscData?.data.escalation_name,
      role_id: parseInt(formValues.selectRole),
      task: formValues.selectTask,
      deadline: formValues.deadline,
      reminder_frequency: formValues.reminderFrequency,
      levels: levels,
    };
    editEscalation(itemId, escalationBody);
  };

  return (
    <>
      {/* <SuccessModal
        open={showSuccessModal}
        description="Escalation Added Successfully"
        handleClose={() => {
          setShowSuccessModal(false);
        }}
      /> */}
      <PageIntro
        title="Edit Escalation "
        description="Edit preset  escalation on the system"
        linkBack={appRoute.escalation}
      />
      <div className="border rounded-xl border-gray-300 mt-10  ">
        <Skeleton
          active={singleEscisLoading}
          loading={singleEscisLoading || isFetching}
          className="px-3 py-2"
        >
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
                  <Input placeholder="Input Task" />
                </FormItem>
                <FormItem
                  label="Task Deadline"
                  name="deadline"
                  className="sm:w-1/2 lg:w-full"
                >
                  <InputNumber min={0} addonAfter={"Hour(s)"} />
                </FormItem>
                <FormItem
                  label="Select Reminder Frequecy"
                  name="reminderFrequency"
                  className="sm:w-fit"
                >
                  <InputNumber min={0} addonAfter={"Hour(s)"} />
                </FormItem>
              </div>
              <div>
                <FormItem label="Escalation Levels" name="escalationLevels">
                  {
                    <Table
                      columns={columns}
                      loading={
                        singleEscisLoading &&
                        isFetching &&
                        allRolesLoading &&
                        employeeLoading

                      }
                      className="min-w-300px"
                      dataSource={tableInitialData}
                      pagination={false}
                      size="small"
                      bordered
                      scroll={{ x: 300 }}
                    />
                  }
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
                // handleClick={() => setShowSuccessModal(true)}
              />
            </div>
          </Form>
        </Skeleton>
      </div>
    </>
  );
};

export default EditEscalation;

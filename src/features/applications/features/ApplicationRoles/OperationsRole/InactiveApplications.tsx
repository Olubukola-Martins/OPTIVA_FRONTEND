import { Dropdown, Form, Input, Menu, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataSourceItem, capitalizeName } from "./ActiveApplications";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AppButton } from "src/components/button/AppButton";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { useUpdateApplicationStatus } from "../../../hooks/Application hooks/useUpdateApplicationStatus";
import { useGetCountry } from "src/features/settings/features/program-types/hooks/useGetCountry";
import { useGetProgramType } from "src/features/settings/features/program-types/hooks/useGetProgramType";
import { useFetchEmployees } from "src/features/settings/features/employees/hooks/useFetchEmployees";
import { useFetchActiveandInactiveApplicant } from "../../../hooks/Application hooks/useFetchActiveandInactiveApplicant";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../../hooks/Application hooks/useGetApplication";
import { useGetInvestmentRoute } from "src/features/settings/features/investment/hooks/useGetInvestmentRoute";
// import { useDebounce } from "src/hooks/useDebounce";
// import { usePagination } from "src/hooks/usePagination";
import { IPortfolioProps } from "../AuditRole/AuditPortfolio";
import { useDebounce } from "src/hooks/useDebounce";
import { usePagination } from "src/hooks/usePagination";

export const InactiveApplications: React.FC<IPortfolioProps> = ({
  searchTerm,
}) => {
  const { onChange, pagination } = usePagination();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { data, isLoading } = useFetchActiveandInactiveApplicant({
    currentUrl: 'inactive',
    pagination,
    search: debouncedSearchTerm,
  });
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const { data: countryData } = useGetCountry();
  const { data: programData } = useGetProgramType();
  const { data: employeesData } = useFetchEmployees({
    currentUrl: "active-employees",
  });
  const { data: investmentData } = useGetInvestmentRoute();

  const [form] = Form.useForm();
  const { mutate, isLoading: postLoading } = useUpdateApplicationStatus();
  const queryClient = useQueryClient();
  const [id, setId] = useState<number>();

  const getCountryName = (countryId: number) => {
    const country = countryData?.find((country) => country.id === countryId);
    return country && country.country_name;
  };

  const getProgramName = (programId: number) => {
    const program = programData?.find((program) => program.id === programId);
    return program && program.program_name;
  };
  const getInvestmentName = (investmentId: number) => {
    const investment = investmentData?.find(
      (investment) => investment.id === investmentId
    );
    return investment && investment.investment_name;
  };
  useEffect(() => {
    if (data && employeesData) {
      const inActiveApplicant: DataSourceItem[] = data.data.map((item, index) => {
        const assignedEmployee = employeesData.data.find(
          (employee) =>
            employee.user.roles.id === item.assigned_role_id &&
            employee.id === item.assigned_user_id
        );
        const lastComment =
          item.applicationcomment?.[item.applicationcomment.length - 1];

        return {
          key: item.id,
          sn: index + 1,
          applicantId: item.applicant.applicant_unique_id,
          applicantName: capitalizeName(item.applicant.full_name),
          country: getCountryName(item.country_id) || "-",
          programType: getProgramName(item.programtype_id) || "-",
          numberOfDependents: item.no_of_dependents,
          assignedTo: assignedEmployee ? assignedEmployee.name : "-",
          reasons: lastComment
            ? lastComment.comment.charAt(0).toUpperCase() +
              lastComment.comment.slice(1)
            : "-",
          investmentRoute: getInvestmentName(item.investmentroute_id) || "-",
        };
      });

      setDataArray(inActiveApplicant);
    }
  }, [data, employeesData]);

  const changeToInactive = (val: any) => {
    mutate(
      {
        id: id as unknown as number,
        status: "active",
        reason: val.activityReason,
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
          form.resetFields()
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
      title: "Investment Route",
      dataIndex: "investmentRoute",
      key: "6",
    },
    {
      title: "Number Of Dependents",
      dataIndex: "numberOfDependents",
      key: "7",
    },
    {
      title: " Assigned To",
      dataIndex: "assignedTo",
      key: "8",
    },
    {
      title: "Reason",
      dataIndex: "reasons",
      key: "9",
      render: (_, val) => <p>{val.reasons}</p>,
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
                <Menu.Item key="2">
                  <Link
                    to={
                      appRoute.applicant_documents(val.key as unknown as number)
                        .path
                    }
                  >
                    View Uploaded Documents
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() => {
                    setComment(val.reasons);
                    showCommentModal();
                  }}
                >
                  View Reason
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

  // Comment Modal
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);
  const showCommentModal = () => {
    setOpenCommentModal(true);
  };
  const handleCommentCancel = () => {
    setOpenCommentModal(false);
  };

  const [comment, setComment] = useState<string>();
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
                handleClick={handleActiveCancel}
              />
              <AppButton label="Submit" type="submit" isLoading={postLoading} />
            </div>
          </Form>
        </div>
      </Modal>

      {/* COMMENT MODAL */}
      <Modal
        open={openCommentModal}
        onCancel={handleCommentCancel}
        footer={null}
      >
        <div className="p-3 my-3 mx-auto">
          <h2 className="font-bold text-lg text-center">Reason</h2>
          <div className="border rounded p-2 my-4">{comment}</div>
          <div className="flex justify-end">
            <AppButton
              type="button"
              label="Back"
              handleClick={handleCommentCancel}
            />
          </div>
        </div>
      </Modal>
      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={dataArray}
        className="bg-white rounded-md shadow border mt-8"
        scroll={{ x: 600 }}
        loading={isLoading}
        onChange={onChange}
        pagination={{ ...pagination, total: data?.total }}
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

import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/features/ApplicationRoles/OperationsRole/ActiveApplications";
import { useEffect, useState } from "react";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/Application hooks/useFetchApplicantsByRole";
import { SubmitApplicationModal } from "../../Components/SubmitApplicationModal";
import { useDebounce } from "src/hooks/useDebounce";
import { usePagination } from "src/hooks/usePagination";
import { IPortfolioProps } from "../AuditRole/AuditPortfolio";

export const MyPortfolio: React.FC<IPortfolioProps> = ({ searchTerm }) => {
  const { onChange, pagination } = usePagination();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { data, isLoading } = useFetchApplicantsByRole({
    pagination,
    search: debouncedSearchTerm,
  });
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const [openSubmitModal, setOpenSubmitModal] = useState<boolean>(false);
  const [applicantId, setApplicantId] = useState<number>();
  useEffect(() => {
    if (data?.data) {
      const activeApplicant: DataSourceItem[] = data.data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          applicantId: item.applicant_id,
          applicantName: capitalizeName(item.applicant_name),
          country: item.country,
          programType: item.program_type,
          numberOfDependents: item.no_of_dependents,
          milestone: item.milestone,
          addedBy: item.added_by,
          investmentRoute: item.investmentroute,
          countryId: item.country_id,
          investmentId: item.investmentroute_id,
        };
      });

      setDataArray(activeApplicant);
    }
  }, [data]);

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
      title: "Milestone",
      dataIndex: "milestone",
      key: "8",
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
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link
                    to={
                      appRoute.generate_quotes(val.key as unknown as number)
                        .path
                    }
                  >
                    Generate Quote
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() => {
                    setApplicantId(val.key as unknown as number);
                    setOpenSubmitModal(true);
                  }}
                >
                  Submit
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

  const handleClose = () => {
    setOpenSubmitModal(false);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataArray}
        scroll={{ x: 700 }}
        loading={isLoading}
        className="bg-white rounded-md shadow border mt-2"
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />

      <SubmitApplicationModal
        applicantId={applicantId as unknown as number}
        open={openSubmitModal}
        handleClose={handleClose}
        // handleOpenImportModal={() => setOpenUploadModal(true)}
      />
    </>
  );
};

import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import {
  DataSourceItem,
  capitalizeName,
} from "src/features/applications/components/ActiveApplications";
import { useFetchApplicantsByRole } from "src/features/applications/hooks/useFetchApplicantsByRole";

export const AllApplicants = () => {
  const { data, isLoading } = useFetchApplicantsByRole();
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);

  console.log('data', data)
  useEffect(() => {
    if (data) {
      const activeApplicant: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          applicantId: item.applicant_id,
          applicantName: capitalizeName(item.applicant_name),
          country: item.country,
          programType: item.program_type,
          numberOfDependents: 1234567890,
          milestone: item.milestone,
          addedBy: "added by",
          investmentRoute:item.investmentroute
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
      title: "Added By",
      dataIndex: "addedBy",
      key: "9",
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
                    View
                  </Link>
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
      <Table
        columns={columns}
        dataSource={dataArray}
        scroll={{ x: 700 }}
        loading={isLoading}
        className="bg-white rounded-md shadow border mt-2"
      />
    </>
  );
};

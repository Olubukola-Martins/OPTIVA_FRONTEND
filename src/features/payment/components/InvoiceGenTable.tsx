import { Dropdown, Menu  } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { IAllInvoices, InvoiceDatum } from "src/features/meetings/types/types";

interface IProps {
  allData: IAllInvoices | undefined;
  dataLoading: boolean;
}


const InvoiceGenTable = ({ allData, dataLoading }: IProps) => {

  type DataSourceItem = {
    key: React.Key;
    SN: number;
    applicantID: string;
    applicantName: string;
    country: string;
    investmentRoute: string;
    dependents: number;
    dateCreated: string;
    createdBy: string;
  };
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);


  const rowSelection = {
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
  };

  // COLUMS OF TABLE
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "SN",
    },
    {
      key: "2",
      title: "Applicant ID",
      dataIndex: "applicantID",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "3",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "4",
    },
    {
      title: "Investment Route",
      dataIndex: "investmentRoute",
      key: "5",
    },
    {
      title: "Number of Dependents",
      dataIndex: "dependents",
      key: "6",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "7",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "8",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Link to={appRoute.viewInvoice(record.key as number).path}>
                  View
                </Link>
              </Menu.Item>

              <Menu.Item key="2">Download</Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

  // DATASOURCE FOR TABLE
   const formattedDate = (inputTimestamp: string) => {
     const date = new Date(inputTimestamp);
     const day = date.getDate().toString().padStart(2, "0");
     const month = (date.getMonth() + 1).toString().padStart(2, "0");
     const year = date.getFullYear().toString().slice(-2);
     return `${day}/${month}/${year}`;
   };



  useEffect(() => {
    if (allData) {
      const mainData = allData.data;
      const data = mainData.map((invoice: InvoiceDatum, i) => {
        return {
          key: invoice.id,
          SN: i + 1,
          applicantID: invoice.application.applicant.applicant_unique_id,
          applicantName: invoice.application.applicant.full_name,
          country: invoice.application.country.country_name,
          investmentRoute: invoice.application.investmentroute.investment_name,
          dependents: invoice.application.no_of_dependents,
          dateCreated: formattedDate(invoice.created_at),
          createdBy: invoice.updated_by.name,
        };
      });
      setDataSource(data);
    }
  }, [allData,dataLoading])
  

  return (
    <>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        loading={dataLoading}
        scroll={{ x: 900 }}
        className="border-gray-100 border-t-0 border-2 rounded-b-md"
      />
    </>
  );
};

export default InvoiceGenTable;

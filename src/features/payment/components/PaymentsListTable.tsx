import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { IAllPayments, IPaymentDatum } from "src/features/meetings/types/types";

type DataSourceItem = {
  key: React.Key;
  SN: number;
  // applicantID: number;
  applicantID: string;
  applicantName: string;
  country: string;
  investmentRoute: string;
  dependents: number;
  amountPaid: string;
  outstandingPayment: string;
  lastUpdated: string;
  updatedBy: string;
};

interface IProps {
  allData: IAllPayments | undefined;
  dataLoading: boolean;
}

const PaymentsListTable = ({ allData, dataLoading }: IProps) => {
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
      title: "Amount Paid",
      dataIndex: "amountPaid",
      key: "7",
    },
    {
      title: "Outstanding Payment",
      dataIndex: "outstandingPayment",
      key: "8",
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "9",
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "10",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: { key: unknown }) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Link
                  to={
                    appRoute.generateInvoice(record.key as unknown as number)
                      .path
                  }
                >
                  Generate Invoice
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link
                  to={
                    appRoute.paymentDetails(record.key as unknown as number)
                      .path
                  }
                >
                  Payment Details
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link
                  to={
                    appRoute.generateReciept(record.key as unknown as number)
                      .path
                  }
                >
                  Generate Receipt
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link
                  to={
                    appRoute.generateContract(record.key as unknown as number)
                      .path
                  }
                >
                  Generate Contract
                </Link>
              </Menu.Item>

              <Menu.Item key="5">Move to Master List</Menu.Item>
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
      const data = mainData.map((payment: IPaymentDatum, i) => {
        return {
          key: i,
          SN: i + 1,
          applicantID: payment.application.applicant.applicant_unique_id,
          applicantName: payment.application.applicant.full_name,
          country: payment.application.country.country_name,
          investmentRoute: payment.application.investmentroute.investment_name,
          dependents: payment.application.no_of_dependents,
          amountPaid: `$ ${payment.amount_paid}`,
          outstandingPayment: `$ ${payment.outstanding_payment}`,
          lastUpdated: formattedDate(payment.updated_at),
          updatedBy: "John Brown", // david to update this
        };
      });
      setDataSource(data);
    }
  }, [allData, dataLoading]);

  return (
    <Table
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 900 }}
      className="border-gray-100 border-t-0 border-2 rounded-b-md"
      loading={dataLoading}
    />
  );
};

export default PaymentsListTable;

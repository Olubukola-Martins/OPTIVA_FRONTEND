
import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { IAllOutstandingPayments, OutstandingPaymentDatum } from "src/features/meetings/types/types";
  type DataSourceItem = {
    key: React.Key;
    SN: number;
    applicantID: string;
    applicantName: string;
    country: string;
    investmentRoute: string;
    outstandingPayment: string;
    lastUpdated: string;
  };

  interface IProps {
    allData: IAllOutstandingPayments | undefined;
    dataLoading: boolean;
  }


const OutstandingPaymentsTable = ({ allData, dataLoading }: IProps) => {
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
      title: "Outstanding Payment",
      dataIndex: "outstandingPayment",
      key: "6",
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "7",
    },
    // {
    //   title: "Updated By",
    //   dataIndex: "updatedBy",
    //   key: "8",
    // },

    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: { key: unknown }) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">View Proof of Payment</Menu.Item>
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
        const data = mainData.map((outstandingPayment: OutstandingPaymentDatum, i) => {
          const { application, id,outstanding_payment,updated_at } = outstandingPayment;
          const {country,investmentroute,applicant} = application
          return {
            key: id,
            SN: i + 1,
            applicantID: applicant.applicant_unique_id,
            applicantName: applicant.full_name,
            country: country.country_name,
            investmentRoute: investmentroute.investment_name,
            outstandingPayment: `$ ${outstanding_payment}`,
            lastUpdated: formattedDate(updated_at),
            //     updatedBy: "John Brown",
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
    />
  );
};

export default OutstandingPaymentsTable;
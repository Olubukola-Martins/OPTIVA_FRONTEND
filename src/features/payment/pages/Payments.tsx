import { DatePicker, Dropdown, Menu, Select, Table } from "antd";
import Search from "antd/es/input/Search";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { SimpleCard } from "src/components/cards/SimpleCard";
import { DashboardLayout } from "src/components/layout/Layout";
import { appRoute } from "src/config/routeMgt/routePaths";

const Payments = () => {
  const { RangePicker } = DatePicker;
  const cardColors: ("blue" | "green" | "yellow" | "oxblood")[] = [
    "green",
    "yellow",
    "blue",
    "oxblood",
  ];
  const cardTitles: string[] = [
    "Total payments Made",
    "Total Quotes Generated",
    "Total Invoices Generated",
    "Outstanding Payment",
  ];

  type DataSourceItem = {
    key: React.Key;
    SN: number;
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

    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (_, record) => (
    //       <Dropdown
    //         trigger={["click"]}
    //         menu={[
    //           {
    //             key: "1",
    //             label: <div>View Proof of Payment</div>,
    //           },
    //           {
    //             key: "2",
    //             label: <div>Generate Invoice</div>,
    //           },
    //           {
    //             key: "3",
    //             label: (
    //               <Link
    //                 to={
    //                   appRoute.paymentDetails(record.key as unknown as number)
    //                     .path
    //                 }
    //               >
    //                 Update Payment Details
    //               </Link>
    //             ),
    //           },
    //           {
    //             key: "4",
    //             label: <div>Generate Financial Statement</div>,
    //           },
    //           {
    //             key: "5",
    //             label: <div>Generate Receipt</div>,
    //           },
    //           {
    //             key: "6",
    //             label: <div>Move to Master List</div>,
    //           },
    //         ] as MenuProps}
    //         //   <Menu>
    //         //     <Menu.Item key="val.key">
    //         //       {/* <Link
    //         //                     to=
    //         //                     {
    //         //             }
    //         //           >
    //         //             View Candidate
    //         //           </Link> */}
    //         //     </Menu.Item>
    //         //   </Menu>
    //       >
    //         <i className="ri-more-2-fill text-lg cursor-pointer"></i>
    //       </Dropdown>
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">View Proof of Payment</Menu.Item>
              <Menu.Item key="2">Generate Invoice</Menu.Item>
              <Menu.Item key="3">
                <Link
                  to={
                    appRoute.paymentDetails(record.key as unknown as number)
                      .path
                  }
                >
                  Update Payment Details
                </Link>
              </Menu.Item>
              <Menu.Item key="4">Generate Financial Statement</Menu.Item>
              <Menu.Item key="5">Generate Receipt</Menu.Item>
              <Menu.Item key="6">Move to Master List</Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

  // DATASOURCE FOR TABLE
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 20; i++) {
    dataSource.push({
      key: i,
      SN: i + 1,
      applicantID: "230000-01",
      applicantName: "John Brown",
      country: "Grenada",
      investmentRoute: "Donation",
      dependents: 3,
      amountPaid: "$ 200,000",
      outstandingPayment: "$ 200,000",
      lastUpdated: "dd/mm/yy",
      updatedBy: "John Brown",
    });
  }

  return (
    <DashboardLayout>
      <PageIntro
        title="Payments"
        description="View & Update Clients Payments"
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <SimpleCard
            icon="iconoir:page"
            cardColor={cardColors[i]}
            title={cardTitles[i]}
            count={0}
          />
        ))}
      </div>

      <div className="border-gray-100 border-t-2 border-r-2 border-l-2 border-b-0 rounded-t-md w-full mt-[52px] px-4 flex flex-row items-center justify-between">
        <h3 className="font-bold">Payment List</h3>

        <div className="my-3 flex flex-row items-center gap-x-2.5">
          <Search
            placeholder="Search"
            allowClear
            style={{ width: 150 }}
            // onSearch={onSearch}
          />
          <Select
            placeholder="Filter"
            style={{ width: 150 }}
            options={[
              {
                value: "optionA",
                label: "Option A",
              },
              {
                value: "OptionB",
                label: "Option B",
              },
            ]}
          />
          <RangePicker style={{ width: 300 }} />
          <AppButton />
        </div>
      </div>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 600 }}
        className="border-gray-100 border-t-0 border-2 rounded-b-md"
      />
    </DashboardLayout>
  );
};

export default Payments;

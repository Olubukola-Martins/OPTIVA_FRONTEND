import { DatePicker, Dropdown, Input, Menu, Table, TreeSelect } from "antd";
import Search from "antd/es/input/Search";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { SimpleCard } from "src/components/cards/SimpleCard";
import { appRoute } from "src/config/routeMgt/routePaths";

const Payments = () => {
  const { inputValue, setInputValue } = useState();
  const { TreeNode } = TreeSelect;
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

  const treeData = [
    {
      value: "Filter by Columns",
      title: "Filter by Columns",
      children: [
        {
          value: "Applicant ID",
          title: "Applicant ID",
        },
        {
          value: "Applicant Name",
          title: "Applicant Name",
        },
        {
          value: "Country",
          title: "Country",
        },
        {
          value: "Investment Route",
          title: "Investment Route",
        },
        {
          value: "Number of Dependents",
          title: "Number of Dependents",
        },
        {
          value: "Date Created",
          title: "Date Created",
        },
        {
          value: "Created By",
          title: "Created By",
        },
      ],
    },
    {
      value: "Filter by Country",
      title: "Filter by Country",
      children: [
        {
          value: "Antigua & Barbuda",
          title: "Antigua & Barbuda",
        },
        {
          value: "Dominica",
          title: "Dominica",
        },
        {
          value: "Grenada",
          title: "Grenada",
        },
        {
          value: "St. Kitts & Levis",
          title: "St. Kitts & Levis",
        },
        {
          value: "St. Lucia",
          title: "St. Lucia",
        },
      ],
    },
    {
      value: "Filter by Investment Route",
      title: "Filter by Investment Route",
      children: [
        {
          value: "CBI",
          title: "CBI",
        },
      ],
    },
    {
      value: "Filter by Amount",
      title: (
        <div>
          <p>Filter by Amount</p>
          {/* <Input
            onChange={(value) => {
              setInputValue(value);
            }}
          /> */}
        </div>
      ),
      isInput: true,
      // children: [
      //   {
      //     value: { inputValue },
      //     title: {inputValue}
      //     // title: (
      //     //   <Input
      //     //     onChange={(value) => {
      //     //       setInputValue(value);
      //     //     }}
      //     //   />
      //     // ),
      //   },
      // ],
    },
  ];

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
      render: (_, record) => (
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
    <>
      <PageIntro
        title="Payments"
        description="View & Update Clients Payments"
        arrowBack={false}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <SimpleCard
            icon="iconoir:page"
            cardColor={cardColors[i]}
            title={cardTitles[i]}
            count={0}
          />
        ))}
      </div>

      <div className="border-gray-100 border-t-2 border-r-2 border-l-2 border-b-0 rounded-t-md w-full mt-[52px] px-4 flex sm:flex-row flex-col items-center justify-around">
        <h3 className="font-bold pt-2 sm:pt-0">Payment List</h3>

        <div className="my-3 ml-auto flex flex-col lg:flex-row items-start lg:items-center gap-2.5">
          <div className="flex flex-row items-center gap-x-2">
            <Search placeholder="Search" allowClear style={{ width: 150 }} />
            <TreeSelect
              // mode="multiple"
              treeData={treeData}
              popupMatchSelectWidth={false}
              placeholder="Filter"
              style={{
                width: 150,
                // overflow: "auto",
                overflow:"hidden",
                height: 30,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              treeCheckable={true}
            >
              {/* {treeData.map((node) => (
                <TreeNode
                  key={node.value}
                  value={node.value}
                  title={node.title}
                  selectable={!node.isInput}
                >
                  {node.isInput && <Input />}
                </TreeNode>
              ))} */}
            </TreeSelect>
          </div>
          <div className="flex sm:flex-row flex-col gap-2 items-center gap-x-8">
            <RangePicker style={{ width: 300 }} />
            <AppButton label="View All" />
          </div>
        </div>
      </div>

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
    </>
  );
};

export default Payments;

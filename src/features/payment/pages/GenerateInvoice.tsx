import { DashboardLayout } from "src/components/layout/Layout";
import GenerateTemplate from "../components/GenerateTemplate";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import Table, { ColumnsType } from "antd/es/table";
import { Descriptions } from "antd";

// TABLE 1
interface DataTypeFirstTable {
  key: string;
  description: string;
  qty: number;
  amount: string;
}
const amountsList = [{ amount: 30000 }];

const columnsFirstTable: ColumnsType<DataTypeFirstTable> = [
  {
    key: 1,
    title: "PROGRAM",
    dataIndex: "program",
    onCell: () => ({
      colSpan: amountsList.length,
    }),
    render: () => {
      return (
        <p className=" sm:text-lg font-medium text-[#012168]">
          Grenada Citizenship By Investment
        </p>
      );
    },
  },
  { key: 2, title: "DESCRIPTION", dataIndex: "description" },
  {
    key: 3,
    title: "QTY",
    dataIndex: "qty",
  },
  {
    key: 4,
    title: "AMOUNT",
    dataIndex: "amount",
    render: (val: string) => <p className="whitespace-nowrap">{val}</p>,
  },
];

const dataFirstTable: DataTypeFirstTable[] = [];

amountsList.map((item, index) => {
  dataFirstTable.push({
    key: index.toString(),
    description:
      "Being payment for processing the Grenada Citizenship by Investment program application for the family of Mr. John Doe.The payment is as follows: • 20% of Grenada CBI Donation Fees",
    qty: 2,
    amount: `N ${item.amount}`,
  });
});

// TABLE 2
interface DataTypeSecondTable {
  key: number;
  label: React.ReactNode;
  nairaAcc: string;
  usdAcc: string;
}
const labelRow: string[] = [
  "Bank Name",
  "Bank Address",
  "Beneficiary",
  "Account Number",
  "Beneficiary Address",
  "Swift Code",
  "Bank Code",
  "Branch Code",
  "Intermediary Bank",
  "Intermediary Bank Swift Code",
];
const nairaAccRow: string[] = [
  "Guaranty Trust Bank Plc",
  "Akin Adesola, Victoria Island",
  "Optiva Capital Partners",
  "0714 097 834",
  "14th Floor, Churchgate Towers 2, Churchgate St., VI, Lagos Nigeria",
];
const usdAccRow: string[] = [
  "RHB BANK BERHAD",
  "90, Cecil Street, RHB Bank Building #10-01,Singapore 069531",
  "China Heng Sheng (Singapore) Development PTE Ltd",
  "000017510388203",
  "8, Temasek Boulevard, #29-07 Suntec Tower 3,Singapore 038988",
  "RHBBSGSG",
  "7366",
  "001",
  "Deutsche Bank US",
  "BKTRUS33",
];
const dataSourceSecondTable: DataTypeSecondTable[] = [];
for (let i = 0; i < usdAccRow.length; i++) {
  dataSourceSecondTable.push({
    key: i,
    label: <div className="font-bold">{labelRow[i]}</div>,
    nairaAcc: nairaAccRow[i],
    usdAcc: usdAccRow[i],
  });
}
const columnsSecondTable: ColumnsType<DataTypeSecondTable> = [
  {
    dataIndex: "label",
  },
  {
    title: "NAIRA ACCOUNT",
    dataIndex: "nairaAcc",
    render: (text) => (text === "" ? "" : <div>{text}</div>),
    onCell: (_, index) => {
      if (index === 5) {
        return {
          rowSpan: 5,
        };
      } else if (index > 5) {
        return {
          rowSpan: 0,
        };
      } else {
        return {
          rowSpan: 1,
        };
      }
    },
  },
  {
    title: "US DOLLAR ACCOUNT",
    dataIndex: "usdAcc",
  },
];
const GenerateInvoice = () => {

  return (
    <DashboardLayout>
      <PageIntro title="Generate Invoice" linkBack={appRoute.payments} />

      <GenerateTemplate
        title="INVOICE FOR REAL ESTATE INVESTMENT"
        templateNumber="00892"
      >
        <div>
          <Table
            id="TemplateTable"
            className="redHead max-sm:text-sm"
            columns={columnsFirstTable}
            dataSource={dataFirstTable}
            pagination={false}
            bordered
            scroll={{ x: 450 }}
            summary={() => {
              let totalAmount = 0;

              amountsList.forEach((item) => {
                totalAmount += item.amount;
              });

              return (
                <>
                  <Table.Summary.Row className="font-bold sm:text-lg">
                    <Table.Summary.Cell
                      index={0}
                      colSpan={2}
                      rowSpan={2}
                    ></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      Total Payable in USD
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={3}
                      className="whitespace-nowrap "
                    >
                      $ {totalAmount}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row className="font-bold sm:text-lg">
                    <Table.Summary.Cell
                      index={2}
                      className="border border-gray-800 border-solid"
                    >
                      Total Payable in NGN
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={3}
                      className="whitespace-nowrap "
                    >
                      N {totalAmount}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
          <p className="text-red-500 max-sm:text-sm">
            Inflow $1 = ₦865 <br /> Kindly send us evidence of payment so that a
            receipt can be issued accordingly.
            <br /> Naira payment is subject to the exchange rate, which expires
            at the close of each business day.
          </p>
        </div>

        <p className="sm:text-xl font-semibold">
          Please make payment in favor of:
        </p>

        <Table
          id="TemplateTable"
          className="blueHead"
          dataSource={dataSourceSecondTable}
          columns={columnsSecondTable}
          bordered
          pagination={false}
          scroll={{ x: 700 }}
        />
        <p className="text-red-500 max-sm:text-sm">
          ***For dollar payments, please select all bank charges to be borne by
          the payer when paying.
        </p>
      </GenerateTemplate>
    </DashboardLayout>
  );
};

export default GenerateInvoice;

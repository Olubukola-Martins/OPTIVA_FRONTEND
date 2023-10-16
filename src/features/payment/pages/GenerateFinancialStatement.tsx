import { DashboardLayout } from "src/components/layout/Layout";
import GenerateTemplate from "../components/GenerateTemplate";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

type DataSource = {
  key: React.Key;
  item: string;
  amount: string;
};
const headColumnFirstTable: ColumnsType<DataSource> = [
  {
    key: "1",
    title: "COST PROFILE",
    dataIndex: "costProfile",
    children: [
      { key: "item", dataIndex: "item" },
      { key: "amount", dataIndex: "amount" },
    ],
  },
];
const headColumnSecondTable: ColumnsType<DataSource> = [
  {
    key: "1",
    title: "ACCOUNT SUMMARY",
    dataIndex: "accountSummary",
    children: [
      { key: "item", dataIndex: "item" },
      { key: "amount", dataIndex: "amount" },
    ],
  },
];
const dataSourceFirst: DataSource[] = [
  {
    key: 1,
    item: "Total Grenada Real Estate Fee",
    amount: `330,000 USD`,
  },
  {
    key: 2,
    item: "Total Local Processing Fee",
    amount: `12,500 USD`,
  },
  {
    key: 3,
    item: "Total Program Fee",
    amount: `342,500 USD`,
  },
];

const dataSourceSecond: DataSource[] = [
  {
    key: 1,
    item: "Total to be paid",
    amount: `342,500 USD`,
  },
  {
    key: 2,
    item: "Total Amount paid",
    amount: `110,500 USD`,
  },
  {
    key: 3,
    item: "Balance Outstanding",
    amount: `232,500 USD`,
  },
];

// third table
interface Item {
  key: number;
  sn: number;
  narration: string;
  paymentsNGN: React.ReactNode;
  fxRate: string;
  paidBy: string;
  paymentsUSD: React.ReactNode;
  balanceDue: React.ReactNode;
}
const dataSourceThird: Item[] = [];
for (let i = 1; i <= 3; i++) {
  dataSourceThird.push({
    key: i,
    sn: i,
    narration: "Part-payment rec’d",
    paymentsNGN: <div className="text-green-600">N 150000</div>,
    fxRate: "$1 = ₦751",
    paidBy: "dd/mm/yy",
    paymentsUSD: <div className="text-green-600">$ 150000</div>,
    balanceDue: <div className="text-red-500">$ 150000</div>,
  });
}
const rows = dataSourceThird ? dataSourceThird.length : 0;
console.log("rows", rows);

const thirdTableColumn: ColumnsType<Item> = [
  {
    title: "PROGRAM",
    dataIndex: "program",
    onCell: (_, index) => {
        if (index === 0) {
          return {
            rowSpan: rows ,
          };
        } else if (index > 0) {
          return {
            rowSpan: 0,
          };
        } else {
          return {};
        }
    },
    render: () => {
      return (
        <p className=" text-base font-medium">
          Grenada Citizenship By Investment
        </p>
      );
    },
  },
  {
    title: "SN",
    dataIndex: "sn",
  },
  {
    title: "Narration",
    dataIndex: "narration",
  },
  {
    title: "Payments NGN",
    dataIndex: "paymentsNGN",
  },
  {
    title: "Fx Rate",
    dataIndex: "fxRate",
  },
  {
    title: "Paid By",
    dataIndex: "paidBy",
  },

  {
    title: "Payments USD",
    dataIndex: "paymentsUSD",
  },
  {
    title: "Balance Due",
    dataIndex: "balanceDue",
  },
];

const GenerateFinancialStatement = () => {
  const totalNGNList = [
    { payments: 150000 },
    { payments: 150000 },
    { payments: 150000 },
  ];
  const totalUSDList = [
    { payments: 150000 },
    { payments: 150000 },
    { payments: 150000 },
  ];

  return (
    <DashboardLayout>
      <PageIntro
        title="Generate Financial Statement"
        linkBack={appRoute.payments}
      />
      <GenerateTemplate title="FINANCIAL STATEMENT" templateNumber="00892">
        <>
          <div className="flex flex-col md:flex-row gap-2 lg:gap-10 w-full pt-4">
            {/* table 1 */}
            <Table
              id="TemplateTable"
              bordered={true}
              columns={headColumnFirstTable}
              dataSource={dataSourceFirst}
              className="financialStatementTable redHead w-full"
              pagination={false}
            />

            {/* table 2 */}
            <Table
              id="TemplateTable"
              bordered={true}
              columns={headColumnSecondTable}
              dataSource={dataSourceSecond}
              className="financialStatementTable redHead w-full"
              pagination={false}
            />
          </div>

          <Table
            id="TemplateTable"
            className="blueHead"
            columns={thirdTableColumn}
            dataSource={dataSourceThird}
            scroll={{ x: 450 }}
            pagination={false}
            bordered
            summary={() => {
              let totalAmountNGN = 0;
              let totalAmountUSD = 0;

              totalNGNList.forEach((item) => {
                totalAmountNGN += item.payments;
              });
              totalUSDList.forEach((item) => {
                totalAmountUSD += item.payments;
              });

              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell
                    index={0}
                    colSpan={3}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={3} className="text-green-600">
                    N {totalAmountNGN}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={4}
                    colSpan={2}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={6} className="text-green-600">
                    N {totalAmountUSD}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />

          <p className="text-center max-sm:text-sm">
            THANK YOU FOR CHOOSING OPTIVA CAPITAL PARTNERS LIMITED.
          </p>
        </>
      </GenerateTemplate>
    </DashboardLayout>
  );
};
export default GenerateFinancialStatement;

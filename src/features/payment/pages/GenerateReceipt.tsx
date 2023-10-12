import Table, { ColumnsType } from "antd/es/table";
import GenerateTemplate from "../components/GenerateTemplate";
import { PageIntro } from "src/components/PageIntro";
import { DashboardLayout } from "src/components/layout/Layout";
import { appRoute } from "src/config/routeMgt/routePaths";

interface DataType {
  key: string;
  narration: string;
  payments: string;
  datePaid: string;
}
const PaymentsList = [{ payment: 150000 }];

const columns: ColumnsType<DataType> = [
  {
    key: 1,
    title: "PROGRAM",
    dataIndex: "program",
    onCell: () => ({
      colSpan: PaymentsList.length,
    }),
    render: () => {
      return (
        <p className=" text-base font-medium">
          Grenada Citizenship By Investment
        </p>
      );
    },
  },
  { key: 2, title: "NARRATION", dataIndex: "narration" },
  {
    key: 3,
    title: "PAYMENTS",
    dataIndex: "payments",
    render: (val) => <p className="whitespace-nowrap">{val}</p>,
  },
  { key: 4, title: "DATE PAID", dataIndex: "datePaid" },
];

const data: DataType[] = [];

PaymentsList.map((item, index) => {
  data.push({
    key: index.toString(),
    narration:
      "Being part payment received for the processing of the Grenada Citizenship by Investment Program for the family of Mr. John Doe",
    payments: `N ${item.payment}`,
    datePaid: "dd/mm/yy",
  });
});

const GenerateReceipt = () => {
  return (
    <DashboardLayout>
      <PageIntro title="Generate Reciept" linkBack={appRoute.payments} />

      <GenerateTemplate title="PAYMENT RECIEPT" templateNumber="00892">
        <Table
          id="TemplateTable"
          className="blueHead "
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          summary={() => {
            let totalPayments = 0;

            PaymentsList.forEach((item) => {
              totalPayments += item.payment;
            });

            return (
              <>
                <Table.Summary.Row className="font-bold text-lg">
                  <Table.Summary.Cell index={0}></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    Total Amount Paid
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} className="whitespace-nowrap">
                    N {totalPayments}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
        <p className="text-center">
          THANK YOU FOR CHOOSING OPTIVA CAPITAL PARTNERS LIMITED.
        </p>
      </GenerateTemplate>
    </DashboardLayout>
  );
};

export default GenerateReceipt;

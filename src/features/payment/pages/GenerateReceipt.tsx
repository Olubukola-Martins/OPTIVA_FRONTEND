import Table, { ColumnsType } from "antd/es/table";
import GenerateTemplate from "../components/GenerateTemplate";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { IGenReceipt } from "src/features/meetings/types/types";
import { formatDate } from "./GenerateFinancialStatement";
import { generateReceipt } from "../hooks/useGenerate";

interface DataType {
  key: number;
  narration: string;
  payments: string;
  datePaid: string;
}

const GenerateReceipt = () => {
  const { id } = useParams();
  const [itemId, setItemId] = useState<number>();
  const [data, setData] = useState<DataType[]>();
  const [programType, setProgramType] = useState<string>("Program");
  // const [paymentsList, setPaymentsList] = useState<[{ payment: number }]>([
  //   { payment: 450 },
  // ]);


  const {
    data: receiptData,
    isLoading: receiptLoading,
  }: { data: IGenReceipt | undefined; isLoading: boolean } = generateReceipt({
    itemId: itemId as number,
  });
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
          <p className="  font-medium">{programType}</p>
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

  useEffect(() => {
    if (id) {
      setItemId(+id);
    }
  }, [id]);
  useEffect(() => {
    if (receiptData?.data) {
      const { id, narration, date_paid, payment,naira_payment } = receiptData.data;
      setData([
        {
          key: id,
          narration,
          // payments: `N ${paymentsList[0].payment}`,
          payments: (+naira_payment).toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 2,
          }),
          datePaid: new Date(date_paid).toLocaleDateString("en-GB"),
        },
      ]);
      setProgramType(payment.application.programtype.program_name);
    }
  }, [receiptData, receiptLoading]);
  useEffect(() => {
  }, [data,programType,itemId]);

  return (
    <>
      <PageIntro title="Generate Reciept" linkBack={appRoute.payments} />

      <Spin spinning={receiptLoading }>
        {receiptData?.data && (
          <GenerateTemplate
            title="PAYMENT RECIEPT"
            templateNumber="00892"
            date_created={formatDate(receiptData.data.created_at)}
            receipientName={
              receiptData.data.payment.application.applicant.full_name
            }
            reciepientEmail={
              receiptData.data.payment.application.applicant.email_address
            }
            reciepientPhone="090123456789"
            handleDownload={() => {
const link = `https://optiva-backend.techmur.com/api/admin/receipt/${itemId}/download-pdf`;
window.open(link, "_blank");
            }}
          >
            <Table
              id="TemplateTable"
              className="blueHead max-sm:text-sm"
              columns={columns}
              dataSource={data}
              scroll={{ x: 450 }}
              pagination={false}
              bordered
              summary={() => {
                let totalPayments = 0;

                PaymentsList.forEach((item) => {
                  totalPayments += item.payment;
                });

                return (
                  <>
                    <Table.Summary.Row className="font-bold sm:text-lg">
                      <Table.Summary.Cell index={0}></Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        Total Amount Paid
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={2}
                        className="whitespace-nowrap"
                      >
                        {/* N {totalPayments} */}
                        {(+receiptData.data.payment.amount_paid).toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "NGN",
                            maximumFractionDigits: 2,
                          }
                        )}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
            <p className="text-center max-sm:text-sm">
              THANK YOU FOR CHOOSING OPTIVA CAPITAL PARTNERS LIMITED.
            </p>
          </GenerateTemplate>
        )}
      </Spin>
    </>
  );
};

export default GenerateReceipt;

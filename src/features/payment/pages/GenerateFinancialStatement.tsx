import GenerateTemplate from "../components/GenerateTemplate";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import { generateFinancialStatement } from "../hooks/useGenerate";
import { useEffect, useState } from "react";
import {
  // GenFinStatementDatum,
  IAllPaymentDetails,
  IGenFinancialState,
} from "src/features/meetings/types/types";
import { IQueryDataType } from "./Payments";
import {
  QUERY_KEY_ALLPAYMENT_DETAILS,
  paymentDetailsURL,
} from "./PaymentDetails";
import { useFetchSingleItem } from "src/features/settings/hooks/useFetchSingleItem";
import { useSendFinancialStatement } from "../hooks/useSendFinancialStatement";

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
export const formatDate = (inputTimestamp: string) => {
  const inputDate = new Date(inputTimestamp);
  const day = inputDate.getDate();
  const month = inputDate.toLocaleString("default", { month: "long" });
  const year = inputDate.getFullYear();

  let dayWithOrdinal;
  if (day >= 11 && day <= 13) {
    dayWithOrdinal = `${day}th`;
  } else {
    switch (day % 10) {
      case 1:
        dayWithOrdinal = `${day}st`;
        break;
      case 2:
        dayWithOrdinal = `${day}nd`;
        break;
      case 3:
        dayWithOrdinal = `${day}rd`;
        break;
      default:
        dayWithOrdinal = `${day}th`;
        break;
    }
  }

  const formattedDate = `${dayWithOrdinal}, ${month} ${year}`;
  return formattedDate;
};

const GenerateFinancialStatement = () => {
  const { id } = useParams();
  const [itemId, setItemId] = useState<number>();
  const [dataSourceFirst, setDataSourceFirst] = useState<DataSource[]>();
  const [dataSourceSecond, setDataSourceSecond] = useState<DataSource[]>();
  const [sendFinStatementKey, setSendFinStatementKey] = useState<number | undefined>();
  const [dataSourceThird, setDataSourceThird] = useState<Item[]>();
  const [totalNGNList, setTotalNGNList] = useState<{ payments: number }[]>([
    { payments: 0 },
  ]);
  const [totalUSDList, setTotalUSDList] = useState<{ payments: number }[]>([
    { payments: 0 },
  ]);

  const {
    data: finStatementData,
    isLoading: finStatementLoading,
  }: IQueryDataType<IGenFinancialState> = generateFinancialStatement({
    itemId: itemId as number,
  });

  const {
    data: paymentDetailsData,
    isLoading: paymentDetailsLoading,
  }: { data: IAllPaymentDetails | undefined; isLoading: boolean } =
    useFetchSingleItem({
      itemId: itemId as number,
      queryKey: QUERY_KEY_ALLPAYMENT_DETAILS,
      urlEndPoint: paymentDetailsURL,
    });
    const { isLoading: sendingFinStatement } = useSendFinancialStatement({
      itemId: sendFinStatementKey as number,
    });
  
  useEffect(() => {
    if (id) {
      setItemId(+id);
    }
  }, [id]);
  useEffect(() => {
    if (finStatementData?.data) {
      const finStatementPaymentDetails = finStatementData.data[0].payment;
      const { quote, amount_paid, outstanding_payment } =
        finStatementPaymentDetails;
      const {
        investment_route,
        local_prc_fee,
        quotation_total,
        country_investment_total,
      } = quote;
      setDataSourceFirst([
        {
          key: 1,
          item: `Total ${investment_route} Fee`,
          amount: country_investment_total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
        {
          key: 2,
          item: "Total Local Processing Fee",
          amount: local_prc_fee.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
        {
          key: 3,
          item: "Total Program Fee",
          amount: quotation_total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
      ]);
      setDataSourceSecond([
        {
          key: 1,
          item: "Total to be paid",
          amount: (+outstanding_payment - +amount_paid).toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }
          ),
        },
        {
          key: 2,
          item: "Total Amount paid",
          amount: (+amount_paid).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
        {
          key: 3,
          item: "Balance Outstanding",
          amount: (+outstanding_payment).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
      ]);
    }
  }, [itemId, finStatementData, finStatementLoading]);
  useEffect(() => {
    if (paymentDetailsData?.data) {
      const paymentDetails = paymentDetailsData.data.map((detail, index) => {
        const {
          narration,
          fx_rate,
          id,
          naira_payment,
          dollar_payment,
          outstanding_payment,
        } = detail;
        return {
          key: id,
          sn: index + 1,
          narration,
          paymentsNGN: (
            <div className="text-green-600">
              {(+naira_payment).toLocaleString("en-US", {
                style: "currency",
                currency: "NGN",
                maximumFractionDigits: 2,
              })}
            </div>
          ),
          fxRate: fx_rate,
          // paidBy: paid_by,
          paidBy: "James Brown",
          paymentsUSD: (
            <div className="text-green-600">
              {(+dollar_payment).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              })}
            </div>
          ),
          balanceDue: (
            <div className="text-red-500">
              {(+outstanding_payment).toLocaleString("en-US", {
                style: "currency",
                currency: "NGN",
                maximumFractionDigits: 2,
              })}
            </div>
          ),
        };
      });
      setDataSourceThird(paymentDetails);
      const paymentsNGN = paymentDetailsData.data.map((item) => {
        const { naira_payment } = item;
        return { payments: +naira_payment };
      });
      setTotalNGNList(paymentsNGN);
      const paymentsUSD = paymentDetailsData.data.map((item) => {
        const { dollar_payment } = item;
        return { payments: +dollar_payment };
      });
      setTotalUSDList(paymentsUSD);
    }
  }, [paymentDetailsData, paymentDetailsLoading]);

  useEffect(() => {}, [
    dataSourceFirst,
    dataSourceSecond,
    dataSourceThird,
    totalNGNList,
    totalUSDList,
  ]);

  const rows = dataSourceThird ? dataSourceThird.length : 0;

  const thirdTableColumn: ColumnsType<Item> = [
    {
      title: "PROGRAM",
      dataIndex: "program",
      onCell: (_, index) => {
        if (index === 0) {
          return {
            rowSpan: rows,
          };
        } else if ((index as number) > 0) {
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

  return (
    <>
      <PageIntro
        title="Generate Financial Statement"
        linkBack={appRoute.paymentDetails(Number(id) as number).path}
      />
      <Spin spinning={finStatementLoading}>
        {finStatementData?.data && (
          <GenerateTemplate
            title="FINANCIAL STATEMENT"
            templateNumber="00892"
            receipientName={
              finStatementData.data[0].payment.application.applicant.full_name
            }
            reciepientEmail={
              finStatementData.data[0].payment.application.applicant
                .email_address
            }
            date_created={formatDate(finStatementData.data[0].created_at)}
            reciepientPhone="090123450000"
            handleSend={()=>{setSendFinStatementKey(itemId as number)}}
          >
            <>
              <div className="flex flex-col md:flex-row gap-2 lg:gap-10 w-full pt-4">
                {/* table 1 */}
                <Table
                  id="TemplateTable"
                  bordered={true}
                  columns={headColumnFirstTable}
                  loading={finStatementLoading}
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
                  loading={finStatementLoading}
                  className="financialStatementTable redHead w-full"
                  pagination={false}
                />
              </div>

              <Table
                id="TemplateTable"
                className="blueHead"
                columns={thirdTableColumn}
                dataSource={dataSourceThird}
                loading={paymentDetailsLoading}
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
                        {totalAmountNGN.toLocaleString("en-US", {
                          style: "currency",
                          currency: "NGN",
                          maximumFractionDigits: 2,
                        })}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={4}
                        colSpan={2}
                      ></Table.Summary.Cell>
                      <Table.Summary.Cell index={6} className="text-green-600">
                        {totalAmountUSD.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 2,
                        })}
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
        )}
      </Spin>
    </>
  );
};
export default GenerateFinancialStatement;

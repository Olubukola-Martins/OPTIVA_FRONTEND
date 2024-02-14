// import { useParams } from "react-router-dom";
// import { viewQuoteBreakdown } from "../hooks/useGenerate";
// import { IViewQuote } from "src/features/meetings/types/types";
// import GenerateTemplate from "../components/GenerateTemplate";
import {  Table } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ColumnsType } from "antd/es/table";

const ViewQuote = () => {
//   const { id } = useParams();
//   const [itemId, setItemId] = useState<number>();
  //   const [dataTable, setDataTable] =
  //     useState<DataTypeFirstTable[]>();
  //   const [programType, setProgramType] = useState<string>("Program");

  const columns: ColumnsType<any> = [
    {
      title: "PROGRAM",
      dataIndex: "program",
      key: "program",
      width: "25%",
      onCell: (record) => ({
        rowSpan: record.key === "1" ? 15 : 0,
      }),
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      colSpan: 2,
      key: "description",
      onCell: (record, rowIndex) => {
        let cols;
        if (
          record.key === "1" ||
          record.key === "spacer" ||
          record.key === "paymentPlan"
        ) {
          cols = 3;
        } else if (rowIndex === 11 || rowIndex === 12) {
          cols = 1;
        } else {
          cols = 2;
        }

        return {
          colSpan: cols,
        };
      },
    },
    {
      title: "",
      dataIndex: "percentage",
      key: "percentage",
      colSpan: 0,
      onCell: (_, rowIndex) => ({
        colSpan: rowIndex === 11 || rowIndex === 12 ? 1 : 0,
      }),
    },

    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      onCell: (record) => ({
        colSpan:
          record.key === "1" ||
          record.key === "spacer" ||
          record.key === "paymentPlan"
            ? 0
            : 1,
      }),
    },
  ];

  const data = [
    {
      key: "1",
      program: (
        <>
          <p style={{ fontSize: "1.125rem" }}>
            Click here for this quote basis from the Grenada Government website
          </p>
          <a
            href="google.com"
            style={{
              fontSize: "1.9rem",
              fontWeight: 400,
              textDecoration: "underline",
              color: "rgb(105, 168, 12)",
              padding: "12px",
              textUnderlineOffset: "6px",
            }}
          >
            Grenada Citizenship by Investments
          </a>
        </>
      ),
      description:
        "Payment for processing & various fees. The payment is as follows:",
      // amount: "",
    },
    {
      key: "2",
      description: "Grenada Real Estate Investment",
      amount: "$30,000",
    },
    {
      key: "3",
      description: "Grenada Gov’t Fee",
      amount: "$30,000",
    },
    {
      key: "4",
      description: "Grenada Gov’t Application Fee",
      amount: "$15,000",
    },
    {
      key: "5",
      description: "Grenada Gov’t Due Diligence Fee",
      amount: "$7,500",
    },
    {
      key: "6",
      description: "Grenada Gov’t Processing Fee",
      amount: "$7,500",
    },
    {
      key: "7",
      description: "Grenada Gov’t Passport & Oath of Allegiance Fee",
      amount: "$2,000",
    },
    {
      key: "8",
      description: "Grenada Legal & Advisory Fee",
      amount: "$4,000",
    },
    {
      key: "total",
      description: "Grenada Total",
      amount: "$150,000",
    },
    {
      key: "spacer",
      description: <div className="bg-[#012168]"></div>,
    },
    {
      key: "paymentPlan",
      description: "Payment Plan",
    },
    {
      key: "9",
      description: "Grenada Total Due Now",
      amount: "$4,000",
    },
    {
      key: "10",
      description: "Local Processing Fee Due Now",
      amount: "$4,000",
    },
    {
      key: "11",
      description: "Total Due Now",
      amount: "$4,000",
    },
    {
      key: "12",
      description: "Balance Due on Citizenship Approval",
      amount: "$4,000",
    },
  ];

  //   const {
  //     data: quoteData,
  //     isLoading: quoteLoading,
  //   }: { data: IViewQuote | undefined; isLoading: boolean } =
  //     viewQuoteBreakdown({
  //       itemId: itemId as number,
  //     });
//   useEffect(() => {
//     if (id) {
//       setItemId(+id);
//     }
//   }, [id]);

  return (
    <>
      <PageIntro title="Generate Quote" linkBack={appRoute.payments} />

      <Table
        dataSource={data}
        columns={columns}
        bordered
        pagination={false}
        className="redHead max-sm:text-sm"
        // style={{
        //   width: "100%",
        //   tableLayout: "auto",
        //   borderRadius: "16px",
        //   overflow: "hidden",
        // }}
      />

      {/* <Spin spinning={quoteLoading}>
        {quoteData?.data && (
          <GenerateTemplate
            title={`QUOTE FOR ${invoiceData.data.application.investmentroute.investment_name.toUpperCase()}`}
            templateNumber={`${invoiceData.data.application.id}`}
            date_created={formatDate(invoiceData.data.created_at)}
            receipientName={invoiceData.data.application.applicant.full_name}
            reciepientEmail={
              invoiceData.data.application.applicant.email_address
            }
            reciepientPhone="090123456789"
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
                  // let totalAmount = 0;

                  // amountsList.forEach((item) => {
                  //   totalAmount += item.amount;
                  // });

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
                          {invoiceData.data.totalAmountUSD.toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                              maximumFractionDigits: 2,
                            }
                          )}
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
                          {invoiceData.data.totalAmountNaira.toLocaleString(
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
              <p className="text-red-500 max-sm:text-sm">
                Inflow {invoiceData.data.fx_rate} <br /> Kindly send us evidence
                of payment so that a receipt can be issued accordingly.
                <br /> Naira payment is subject to the exchange rate, which
                expires at the close of each business day.
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
              ***For dollar payments, please select all bank charges to be borne
              by the payer when paying.
            </p>
          </GenerateTemplate>
        )}
      </Spin> */}
    </>
  );
};

export default ViewQuote;

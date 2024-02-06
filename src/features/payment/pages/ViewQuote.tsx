import { useParams } from "react-router-dom";
import { viewQuoteBreakdown } from "../hooks/useGenerate";
import {
  ApplicantDonationInfo,
  ApplicantRealEstateinfo,
  IViewQuote,
} from "src/features/meetings/types/types";
import GenerateTemplate from "../components/GenerateTemplate";
import { Spin, Table } from "antd";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { formatDate } from "./GenerateFinancialStatement";

const ViewQuote = () => {
  const { id } = useParams();
  const [itemId, setItemId] = useState<number>();
  const [dataTable, setDataTable] = useState<any>([]);
  //   const [programType, setProgramType] = useState<string>("Program");
  const {
    data: quoteData,
    isLoading: quoteLoading,
  }: { data: IViewQuote | undefined; isLoading: boolean } = viewQuoteBreakdown({
    itemId: itemId as number,
  });
  // default dataTable length is 15
  const columns: ColumnsType<any> = [
    {
      title: "PROGRAM",
      dataIndex: "program",
      key: "program",
      width: "25%",
      onCell: (record) => ({
        rowSpan: record.key === "1" ? dataTable.length : 0,
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
        } else if (
          (rowIndex === dataTable.length - 4 && record.key === "9") ||
          (rowIndex === dataTable.length - 3 && record.key === "10")
        ) {
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
      onCell: (record, rowIndex) => ({
        colSpan:
          (rowIndex === dataTable.length - 4 && record.key === "9") ||
          (rowIndex === dataTable.length - 3 && record.key === "10")
            ? 1
            : 0,
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
      render: (value) =>
        value
          ? value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })
          : value,
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     program: (
  //       <>
  //         <p style={{ fontSize: "1.125rem" }}>
  //           Click here for this quote basis from the Grenada Government website
  //         </p>
  //         <a
  //           href="google.com"
  //           style={{
  //             fontSize: "1.9rem",
  //             fontWeight: 400,
  //             textDecoration: "underline",
  //             color: "rgb(105, 168, 12)",
  //             padding: "12px",
  //             textUnderlineOffset: "6px",
  //           }}
  //         >
  //           Grenada Citizenship by Investments
  //         </a>
  //       </>
  //     ),
  //     description:
  //       "Payment for processing & various fees. The payment is as follows:",
  //     // amount: "",
  //   },
  //   {
  //     key: "2",
  //     description: "Grenada Real Estate Investment",
  //     amount: "$30,000",
  //   },
  //   {
  //     key: "3",
  //     description: "Grenada Gov’t Fee",
  //     amount: "$30,000",
  //   },
  //   {
  //     key: "4",
  //     description: "Grenada Gov’t Application Fee",
  //     amount: "$15,000",
  //   },
  //   {
  //     key: "5",
  //     description: "Grenada Gov’t Due Diligence Fee",
  //     amount: "$7,500",
  //   },
  //   {
  //     key: "6",
  //     description: "Grenada Gov’t Processing Fee",
  //     amount: "$7,500",
  //   },
  //   {
  //     key: "7",
  //     description: "Grenada Gov’t Passport & Oath of Allegiance Fee",
  //     amount: "$2,000",
  //   },
  //   {
  //     key: "8",
  //     description: "Grenada Legal & Advisory Fee",
  //     amount: "$4,000",
  //   },
  //   {
  //     key: "total",
  //     description: "Grenada Total",
  //     amount: "$150,000",
  //   },
  //   {
  //     key: "spacer",
  //     description: <div className="bg-[#012168]"></div>,
  //   },
  //   {
  //     key: "paymentPlan",
  //     description: "Payment Plan",
  //   },
  //   {
  //     key: "9",
  //     description: "Grenada Total Due Now",
  //     amount: "$4,000",
  //   },
  //   {
  //     key: "10",
  //     description: "Local Processing Fee Due Now",
  //     amount: "$4,000",
  //   },
  //   {
  //     key: "11",
  //     description: "Total Due Now",
  //     amount: "$4,000",
  //   },
  //   {
  //     key: "12",
  //     description: "Balance Due on Citizenship Approval",
  //     amount: "$4,000",
  //   },
  // ];


  useEffect(() => {
    if (
      quoteData?.data.Applicant_info.quote.investment_route.includes(
        "Real Estate"
      )
    ) {
      const quote = quoteData.data.Applicant_info.quote;
      const applicantInfo = quoteData.data
        .Applicant_info as ApplicantRealEstateinfo;
      const {
        antigua_joint_quote,
        antigua_single_quote,
        grenada_estate_quote,
        st_kitts_and_nevis_estate_quote,
        st_lucia_estate_quote,
      } = applicantInfo;
      if (antigua_joint_quote) {
        const viewQuoteBreakdownAntigJoint = antigua_joint_quote;
        const {
          real_estate_investment_fee,
          legal_and_advisory_fee,
          // program_grand_total,
          antigua_barbuda_joint_estate_total,
          local_processing_fee_due_now,
          program_grand_total_due_now,
          program_grand_total_due_on_approval,
          due_diligence_fee,
          govt_passport_oath_and_allegiance_fee,
          govt_processing_fee,
        } = viewQuoteBreakdownAntigJoint;
        const { country, investment_route } = quote;
        const data = [
          {
            key: "1",
            program: (
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  Click here for this quote basis from the {country} Government
                  website
                </p>
                <a
                  href="google.com"
                  className="text-2xl font-normal underline text-green-600 p-3 underline-offset-6 "
                >
                  {country} Citizenship by Investments
                </a>
              </div>
            ),
            description:
              "Payment for processing & various fees. The payment is as follows:",
          },
          {
            key: "2",
            description: `${investment_route} Investment`,
            amount: real_estate_investment_fee,
          },
          {
            key: "5",
            description: `${country} Gov’t Due Diligence Fee`,
            amount: due_diligence_fee,
          },
          {
            key: "6",
            description: `${country} Gov’t Processing Fee`,
            amount: govt_processing_fee,
          },
          {
            key: "7",
            description: `${country} Gov’t Passport & Oath of Allegiance Fee`,
            amount: govt_passport_oath_and_allegiance_fee,
          },
          {
            key: "8",
            description: `${country} Legal & Advisory Fee`,
            amount: legal_and_advisory_fee,
          },
          {
            key: "total",
            description: `${country} Total`,
            amount: antigua_barbuda_joint_estate_total,
          },
          {
            key: "spacer",
            description: <div className="py-2"></div>,
          },
          {
            key: "paymentPlan",
            description: "Payment Plan",
          },
          {
            key: "9",
            description: `${country} Total Due Now`,
            amount: "$4,000 awaiting this",
          },
          {
            key: "10",
            description: "Local Processing Fee Due Now",
            amount: local_processing_fee_due_now,
          },
          {
            key: "11",
            description: "Total Due Now",
            amount: program_grand_total_due_now,
          },
          {
            key: "12",
            description: "Balance Due on Citizenship Approval",
            amount: program_grand_total_due_on_approval,
          },
        ];
        setDataTable(data);
      }
      if (antigua_single_quote) {
        const viewQuoteBreakdownAntigSing = antigua_single_quote;
        const {
          real_estate_investment_fee,
          legal_and_advisory_fee,
          // program_grand_total,
          antigua_barbuda_single_estate_total,
          local_processing_fee_due_now,
          program_grand_total_due_now,
          program_grand_total_due_on_approval,
          due_diligence_fee,
          govt_passport_oath_and_allegiance_fee,
          govt_processing_fee,
        } = viewQuoteBreakdownAntigSing;
        const { country, investment_route } = quote;
        const data = [
          {
            key: "1",
            program: (
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  Click here for this quote basis from the {country} Government
                  website
                </p>
                <a
                  href="google.com"
                  className="text-2xl font-normal underline text-green-600 p-3 underline-offset-6 "
                >
                  {country} Citizenship by Investments
                </a>
              </div>
            ),
            description:
              "Payment for processing & various fees. The payment is as follows:",
          },
          {
            key: "2",
            description: `${investment_route} Investment`,
            amount: real_estate_investment_fee,
          },
          {
            key: "5",
            description: `${country} Gov’t Due Diligence Fee`,
            amount: due_diligence_fee,
          },
          {
            key: "6",
            description: `${country} Gov’t Processing Fee`,
            amount: govt_processing_fee,
          },
          {
            key: "7",
            description: `${country} Gov’t Passport & Oath of Allegiance Fee`,
            amount: govt_passport_oath_and_allegiance_fee,
          },
          {
            key: "8",
            description: `${country} Legal & Advisory Fee`,
            amount: legal_and_advisory_fee,
          },
          {
            key: "total",
            description: `${country} Total`,
            amount: antigua_barbuda_single_estate_total,
          },
          {
            key: "spacer",
            description: <div className="py-2"></div>,
          },
          {
            key: "paymentPlan",
            description: "Payment Plan",
          },
          {
            key: "9",
            description: `${country} Total Due Now`,
            amount: "$4,000 awaiting this",
          },
          {
            key: "10",
            description: "Local Processing Fee Due Now",
            amount: local_processing_fee_due_now,
          },
          {
            key: "11",
            description: "Total Due Now",
            amount: program_grand_total_due_now,
          },
          {
            key: "12",
            description: "Balance Due on Citizenship Approval",
            amount: program_grand_total_due_on_approval,
          },
        ];
        setDataTable(data);
      }
      if (grenada_estate_quote) {
        const viewQuoteBreakdownGrenadaEstate = grenada_estate_quote;

        const {
          real_estate_investment_fee,
          grenada_legal_and_advisory_fee,
          grenadaRealEstateTotal,
          localProcessingFeeDueNow,
          programTotalDueNow,
          programTotalDueAfterApproval,
          govt_application_fee,
          govt_due_diligence_fee,
          govt_fee,
          govt_passport_oath_and_allegiance_fee,
          govt_processing_fee,
        } = viewQuoteBreakdownGrenadaEstate;
        const { country, investment_route } = quote;
        const data = [
          {
            key: "1",
            program: (
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  Click here for this quote basis from the {country} Government
                  website
                </p>
                <a
                  href="google.com"
                  className="text-2xl font-normal underline text-green-600 p-3 underline-offset-6 "
                >
                  {country} Citizenship by Investments
                </a>
              </div>
            ),
            description:
              "Payment for processing & various fees. The payment is as follows:",
          },
          {
            key: "2",
            description: `${investment_route} Investment`,
            amount: real_estate_investment_fee,
          },
          { key: "3", description: `${country} Gov’t Fee`, amount: govt_fee },
          {
            key: "4",
            description: `${country} Gov’t Application Fee`,
            amount: govt_application_fee,
          },

          {
            key: "5",
            description: `${country} Gov’t Due Diligence Fee`,
            amount: govt_due_diligence_fee,
          },
          {
            key: "6",
            description: `${country} Gov’t Processing Fee`,
            amount: govt_processing_fee,
          },
          {
            key: "7",
            description: `${country} Gov’t Passport & Oath of Allegiance Fee`,
            amount: govt_passport_oath_and_allegiance_fee,
          },
          {
            key: "8",
            description: `${country} Legal & Advisory Fee`,
            amount: grenada_legal_and_advisory_fee,
          },
          {
            key: "total",
            description: `${country} Total`,
            amount: grenadaRealEstateTotal,
          },
          {
            key: "spacer",
            description: <div className="py-2"></div>,
          },
          {
            key: "paymentPlan",
            description: "Payment Plan",
          },
          {
            key: "9",
            description: `${country} Total Due Now`,
            amount: "$4,000 awaiting this",
          },
          {
            key: "10",
            description: "Local Processing Fee Due Now",
            amount: localProcessingFeeDueNow,
          },
          {
            key: "11",
            description: "Total Due Now",
            amount: programTotalDueNow,
          },
          {
            key: "12",
            description: "Balance Due on Citizenship Approval",
            amount: programTotalDueAfterApproval,
          },
        ];
        setDataTable(data);
      }
      if (st_kitts_and_nevis_estate_quote) {
        const viewQuoteBreakdownStKittsEstate = st_kitts_and_nevis_estate_quote;
        const {
          program_total_due_after_approval,
          local_prc_fee_due_now,
          program_total_due_now,
          passport_and_oath_of_allegiance_fee,
          legal_advisory_fee,
          due_dil_and_prc_fee,
          govt_contribution,
        } = viewQuoteBreakdownStKittsEstate;
        const { country, investment_route } = quote;
        const data = [
          {
            key: "1",
            program: (
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  Click here for this quote basis from the {country} Government
                  website
                </p>
                <a
                  href="google.com"
                  className="text-2xl font-normal underline text-green-600 p-3 underline-offset-6 "
                >
                  {country} Citizenship by Investments
                </a>
              </div>
            ),
            description:
              "Payment for processing & various fees. The payment is as follows:",
          },
          {
            key: "2",
            description: `${investment_route} Gov’t Contribution`,
            amount: govt_contribution,
          },
          {
            key: "5",
            description: `${country} Gov’t Due Diligence and Processing Fee`,
            amount: due_dil_and_prc_fee,
          },
          {
            key: "7",
            description: `${country} Gov’t Passport & Oath of Allegiance Fee`,
            amount: passport_and_oath_of_allegiance_fee,
          },
          {
            key: "8",
            description: `${country} Legal & Advisory Fee`,
            amount: legal_advisory_fee,
          },
          {
            key: "total",
            description: `${country} Total`,
            amount: 0,
          },
          {
            key: "spacer",
            description: <div className="py-2"></div>,
          },
          {
            key: "paymentPlan",
            description: "Payment Plan",
          },
          {
            key: "9",
            description: `${country} Total Due Now`,
            amount: "$4,000 awaiting this",
          },
          {
            key: "10",
            description: "Local Processing Fee Due Now",
            amount: local_prc_fee_due_now,
          },
          {
            key: "11",
            description: "Total Due Now",
            amount: program_total_due_now,
          },
          {
            key: "12",
            description: "Balance Due on Citizenship Approval",
            amount: program_total_due_after_approval,
          },
        ];
        setDataTable(data);
      }
      if (st_lucia_estate_quote) {
        const viewQuoteBreakdownStLuciaEstate = st_lucia_estate_quote;

        const {
          localProcessingFeeDueNow,
          programTotalDueNow,
          programTotalDueAfterApproval,
          govt_due_dil,
          govt_prc_fee,
          contribution_for_dependents,
          contribution_for_main_applicant,
          govt_passport_fee,
        } = viewQuoteBreakdownStLuciaEstate;
        const { country, investment_route } = quote;
        const data = [
          {
            key: "1",
            program: (
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  Click here for this quote basis from the {country} Government
                  website
                </p>
                <a
                  href="google.com"
                  className="text-2xl font-normal underline text-green-600 p-3 underline-offset-6 "
                >
                  {country} Citizenship by Investments
                </a>
              </div>
            ),
            description:
              "Payment for processing & various fees. The payment is as follows:",
          },
          {
            key: "2",
            description: `${investment_route} Contribution For Dependent(s)`,
            amount: contribution_for_dependents,
          },
          {
            key: "2",
            description: `${investment_route} Contribution For Main Applicant`,
            amount: contribution_for_main_applicant,
          },
          {
            key: "5",
            description: `${country} Gov’t Due Diligence Fee`,
            amount: govt_due_dil,
          },
          {
            key: "6",
            description: `${country} Gov’t Processing Fee`,
            amount: govt_prc_fee,
          },
          {
            key: "7",
            description: `${country} Gov’t Passport Fee`,
            amount: govt_passport_fee,
          },
          // {
          //   key: "8",
          //   description: `${country} Legal & Advisory Fee`,
          //   amount: ,
          // },
          {
            key: "total",
            description: `${country} Total`,
            amount: 0,
          },
          {
            key: "spacer",
            description: <div className="py-2"></div>,
          },
          {
            key: "paymentPlan",
            description: "Payment Plan",
          },
          {
            key: "9",
            description: `${country} Total Due Now`,
            amount: "$4,000 awaiting this",
          },
          {
            key: "10",
            description: "Local Processing Fee Due Now",
            amount: localProcessingFeeDueNow,
          },
          {
            key: "11",
            description: "Total Due Now",
            amount: programTotalDueNow,
          },
          {
            key: "12",
            description: "Balance Due on Citizenship Approval",
            amount: programTotalDueAfterApproval,
          },
        ];
        setDataTable(data);
      }
    }
    if (
      quoteData?.data.Applicant_info.quote.investment_route.includes("donation")
    ) {
      const quote = quoteData.data.Applicant_info.quote;
      const applicantInfo = quoteData.data
        .Applicant_info as ApplicantDonationInfo;
      const {
        antigua_donation_quote,
        dominica_donation_quote,
        grenada_donation_quote,
      } = applicantInfo;
      if (antigua_donation_quote) {
        const viewQuoteBreakDown = antigua_donation_quote;
        const {
          antigua_barbuda_donation_total,
          due_diligence_fee,
          govt_contribution_fee,
          govt_passport_oath_and_allegiance_fee,
          govt_processing_fee,
          legal_and_advisory_fee,
          local_processing_fee,
          local_processing_fee_due_now,
          program_grand_total_due_now,
          program_grand_total_due_on_approval,
        } = viewQuoteBreakDown;
        const { country, investment_route } = quote;
        const data = [
          {
            key: "1",
            program: (
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  Click here for this quote basis from the {country}
                  Government website
                </p>
                <a
                  href="google.com"
                  className="text-2xl font-normal underline text-green-600 p-3 underline-offset-6 "
                >
                  {country} Citizenship by Investments
                </a>
              </div>
            ),
            description:
              "Payment for processing & various fees. The payment is as follows:",
          },
          {
            key: "2",
            description: `${investment_route} Gov’t Contribution`,
            amount: govt_contribution_fee,
          },
          // {
          //   key: "4",
          //   description: `${country} Gov’t Application Fee`,
          //   amount: ,
          // },

          {
            key: "5",
            description: `${country} Gov’t Due Diligence Fee`,
            amount: due_diligence_fee,
          },
          {
            key: "6",
            description: `${country} Gov’t Processing Fee`,
            amount: govt_processing_fee,
          },
          {
            key: "7",
            description: `${country} Gov’t Passport & Oath of Allegiance Fee`,
            amount: govt_passport_oath_and_allegiance_fee,
          },
          {
            key: "8",
            description: `${country} Legal & Advisory Fee`,
            amount: legal_and_advisory_fee,
          },
          {
            key: "total",
            description: `${country} Total`,
            amount: antigua_barbuda_donation_total,
          },
          {
            key: "spacer",
            description: <div className="py-2"></div>,
          },
          {
            key: "paymentPlan",
            description: "Payment Plan",
          },
          {
            key: "9",
            description: `${country} Total Due Now`,
            amount: "$4,000 awaiting this",
          },
          {
            key: "10",
            description: "Local Processing Fee Due Now",
            amount: local_processing_fee_due_now,
          },
          {
            key: "11",
            description: "Total Due Now",
            amount: program_grand_total_due_now,
          },
          {
            key: "12",
            description: "Balance Due on Citizenship Approval",
            amount: program_grand_total_due_on_approval,
          },
        ];
        setDataTable(data);
      }
      if (dominica_donation_quote) {
        const viewQuoteBreakDown = dominica_donation_quote;
        const {
          dominica_total,
          govt_due_diligence_fee,
          govt_cert_neutralization_fee,
          program_total_due_after_approval,
          program_total_due_now,
          govt_contribution_fee,
          govt_processing_fee,
          local_processing_fee,
          local_processing_fee_due_now,
        } = viewQuoteBreakDown;
        const { country, investment_route } = quote;
        const data = [
          {
            key: "1",
            program: (
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  Click here for this quote basis from the {country}
                  Government website
                </p>
                <a
                  href="google.com"
                  className="text-2xl font-normal underline text-green-600 p-3 underline-offset-6 "
                >
                  {country} Citizenship by Investments
                </a>
              </div>
            ),
            description:
              "Payment for processing & various fees. The payment is as follows:",
          },
          {
            key: "2",
            description: `${investment_route} Gov’t Contribution`,
            amount: govt_contribution_fee,
          },

          {
            key: "5",
            description: `${country} Gov’t Due Diligence Fee`,
            amount: govt_due_diligence_fee,
          },
          {
            key: "6",
            description: `${country} Gov’t Processing Fee`,
            amount: govt_processing_fee,
          },
          {
            key: "7",
            description: `${country} Gov’t Neutralization Fee`,
            amount: govt_cert_neutralization_fee,
          },
          {
            key: "total",
            description: `${country} Total`,
            amount: dominica_total,
          },
          {
            key: "spacer",
            description: <div className="py-2"></div>,
          },
          {
            key: "paymentPlan",
            description: "Payment Plan",
          },
          {
            key: "9",
            description: `${country} Total Due Now`,
            amount: "$4,000 awaiting this",
          },
          {
            key: "10",
            description: "Local Processing Fee Due Now",
            amount: local_processing_fee_due_now,
          },
          {
            key: "11",
            description: "Total Due Now",
            amount: program_total_due_now,
          },
          {
            key: "12",
            description: "Balance Due on Citizenship Approval",
            amount: program_total_due_after_approval,
          },
        ];
        setDataTable(data);
      }
      if (grenada_donation_quote) {
        const viewQuoteBreakDown = grenada_donation_quote;
        const {
          totalDueAfterApproval,
          govt_due_diligence_fee,
          govt_ntf_application_fee,
          grenada_legal_and_advisory_fee,
          totalDueNow,
          govt_contribution_fee,
          govt_passport_oath_and_allegiance_fee,
          govt_processing_fee,
        } = viewQuoteBreakDown;
        const { country, investment_route } = quote;
        const data = [
          {
            key: "1",
            program: (
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  Click here for this quote basis from the {country}
                  Government website
                </p>
                <a
                  href="google.com"
                  className="text-2xl font-normal underline text-green-600 p-3 underline-offset-6 "
                >
                  {country} Citizenship by Investments
                </a>
              </div>
            ),
            description:
              "Payment for processing & various fees. The payment is as follows:",
          },
          {
            key: "2",
            description: `${investment_route} Gov’t Contribution`,
            amount: govt_contribution_fee,
          },
          {
            key: "4",
            description: `${country} Gov’t NTF Application Fee`,
            amount: govt_ntf_application_fee,
          },

          {
            key: "5",
            description: `${country} Gov’t Due Diligence Fee`,
            amount: govt_due_diligence_fee,
          },
          {
            key: "6",
            description: `${country} Gov’t Processing Fee`,
            amount: govt_processing_fee,
          },
          {
            key: "7",
            description: `${country} Gov’t Passport & Oath of Allegiance Fee`,
            amount: govt_passport_oath_and_allegiance_fee,
          },
          {
            key: "8",
            description: `${country} Legal & Advisory Fee`,
            amount: grenada_legal_and_advisory_fee,
          },
          // {
          //   key: "total",
          //   description: `${country} Total`,
          //   amount: 0,
          // },
          {
            key: "spacer",
            description: <div className="py-2"></div>,
          },
          {
            key: "paymentPlan",
            description: "Payment Plan",
          },
          // {
          //   key: "9",
          //   description: `${country} Total Due Now`,
          //   amount: "$4,000 awaiting this",
          // },
          // {
          //   key: "10",
          //   description: "Local Processing Fee Due Now",
          //   amount: 0,
          // },
          {
            key: "11",
            description: "Total Due Now",
            amount: totalDueNow,
          },
          {
            key: "12",
            description: "Balance Due on Citizenship Approval",
            amount: totalDueAfterApproval,
          },
        ];
        setDataTable(data);
      }
    }
  }, [quoteData, quoteLoading, dataTable]);

  useEffect(() => {
    if (id) {
      setItemId(+id);
    }
  }, [id]);

  return (
    <>
      <PageIntro title="Generate Quote" linkBack={appRoute.payments} />

      <Spin spinning={quoteLoading}>
        {quoteData?.data && (
          <GenerateTemplate
            title={`QUOTE FOR ${quoteData.data.Applicant_info.quote.investment_route.toUpperCase()}`}
            templateNumber={`${quoteData.data.Applicant_info.id}`}
            date_created={formatDate(quoteData.data.Applicant_info.updated_at)}
            receipientName={quoteData.data.Applicant_info.full_name}
            reciepientEmail={quoteData.data.Applicant_info.email_address}
            reciepientPhone="090123456789"
            hideAuthorizedSignatory
          >
            <Table
              dataSource={dataTable}
              columns={columns}
              bordered
              pagination={false}
              rowClassName={(row) =>
                row.key === "spacer" ? "bg-[#012168]" : ""
              }
              className="redHead max-sm:text-sm"
            />
            <p>
              You will be invoiced, via email, after acceptance of this quote.
              <br /> If you have any questions concerning this quote, please
              contact us directly via phone or email. Thank you for your
              business
            </p>
          </GenerateTemplate>
        )}
      </Spin>
    </>
  );
};

export default ViewQuote;

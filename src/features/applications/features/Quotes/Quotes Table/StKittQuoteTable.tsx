import React from "react";
import { useGetSingleQuote } from "src/features/applications/hooks/Quotes hooks/useGetSingleQuote";
import {
  todaysDate,
  tableStyle,
  thStyle,
  colOneStyle,
  tdStyle,
} from "src/features/applications/pages/SendQuote";
import { IStKittQuote } from "src/features/applications/types/types";
import { IGetQuoteProps } from "./DomincaQuoteTable";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Skeleton } from "antd";

export const StKittQuoteTable: React.FC<IGetQuoteProps> = ({ id }) => {
  const { data, isLoading } = useGetSingleQuote<IStKittQuote>({
    id: id as unknown as number,
  });

  const applicantInfo = data?.Applicant_info;
  const applicantQuote = data?.Applicant_info.st_kitts_and_nevis_estate_quote;

  return (
    <Skeleton active loading={isLoading}>
      <div>
        <h1 className="text-lg font-semibold pb-2">
          {applicantInfo?.full_name}{" "}
        </h1>
        <p className="pb-1">14th Floor, Churchgate Towers 2, </p>
        <p className="pb-1">PC 30, Churchgate Street,</p>
        <p className="pb-1">Victoria Island, Lagos,</p>
        <p className="pb-1">Nigeria.</p>
        <p className="flex items-center gap-1 pb-1">
          <Icon icon="solar:phone-bold" className="text-base" />
          {applicantInfo?.phone_number}
        </p>
        <div className="flex justify-between pb-1">
          <p className="flex items-center gap-1">
            <Icon icon="tabler:mail-filled" className="text-base" />
            {applicantInfo?.email_address}
          </p>
          <p>{todaysDate}</p>
        </div>
      </div>
      <h2 className="p-5 m-3 text-center underline underline-offset-2 text-[#898888] font-bold text-xl">
        QUOTE FOR {applicantInfo?.quote.investment_route.toUpperCase()}
      </h2>
      <div>
        <table style={tableStyle}>
          {/* ROW 1 */}
          <tr>
            <th style={thStyle}>Program</th>
            <th style={thStyle} colSpan={3}>
              Description
            </th>
            <th style={thStyle}>Amount</th>
          </tr>

          {/* ROW 2 */}
          <tr>
            <td rowSpan={26} style={colOneStyle} colSpan={2}>
              ST Kitts & Nevis Real Estate Quote
            </td>
            <td style={tdStyle} colSpan={3}>
              Payment for processing & various fees. <br />
              The payment is as follows:
            </td>
          </tr>
          {/* ROW 3 */}
          <tr>
            <td style={tdStyle} colSpan={2}>
              Application Fee
            </td>
            <td style={tdStyle}>${applicantQuote?.application_fee}</td>
          </tr>
          <tr>
            <td style={tdStyle} colSpan={2}>
              Bank Due Diligence Fee
            </td>

            <td style={tdStyle}>${applicantQuote?.bank_due_dil_fee}</td>
          </tr>
          <tr>
            <td style={tdStyle} colSpan={2}>
              Courier and Bank Fee
            </td>

            <td style={tdStyle}>${applicantQuote?.courier_and_bank_fee}</td>
          </tr>
          {/* EMPTY ROW */}
          <tr>
            <td colSpan={3} style={tdStyle} className="bg-white text-white">
              -
            </td>
          </tr>
          {/* ROW 4 */}
          <tr>
            <td style={tdStyle}>Country Fee Due Now</td>
            <td style={tdStyle}>
              {applicantQuote?.country_fee_due_now_percentage}%
            </td>
            <td style={tdStyle}>${applicantQuote?.country_fee_due_now}</td>
          </tr>
          <tr>
            <td style={tdStyle} colSpan={2}>
              Country Fee Due On Approval
            </td>
            <td style={tdStyle}>
              ${applicantQuote?.country_fee_due_on_approval}
            </td>
          </tr>

          {/* EMPTY ROW */}
          <tr>
            <td colSpan={3} style={tdStyle} className="bg-white text-white">
              -
            </td>
          </tr>

          {/* ROW 5 */}
          <tr>
            <td colSpan={2} style={tdStyle}>
              Due Diligence and Processing Fee
            </td>
            <td style={tdStyle}>${applicantQuote?.due_dil_and_prc_fee}</td>
          </tr>

          {/* ROW 6 */}
          <tr>
            <td colSpan={2} style={tdStyle}>
              Government Contribution
            </td>
            <td style={tdStyle}>${applicantQuote?.govt_contribution}</td>
          </tr>

          {/* EMPTY ROW */}
          <tr>
            <td colSpan={3} style={tdStyle} className="bg-white text-white">
              -
            </td>
          </tr>
          {/* ROW 12 */}
          <tr>
            <td style={tdStyle} colSpan={2} className="text-right font-bold ">
              Legal Adivsory Fee
            </td>
            <td style={tdStyle} className="font-bold">
              ${applicantQuote?.legal_advisory_fee}
            </td>
          </tr>

          <tr>
            <td style={tdStyle} colSpan={2} className="text-right font-bold ">
              Local Agent Fee VAT
            </td>
            <td style={tdStyle} className="font-bold">
              ${applicantQuote?.local_agent_fee_vat}
            </td>
          </tr>

          <tr>
            <td style={tdStyle} colSpan={2} className="text-right font-bold ">
              Local Processing Fee
            </td>
            <td style={tdStyle} className="font-bold">
              ${applicantQuote?.local_prc_fee}
            </td>
          </tr>

          <tr>
            <td style={tdStyle} className="text-right font-bold ">
              Local Processing Fee Due Now
            </td>
            <td style={tdStyle} className="font-bold">
              {applicantQuote?.local_processing_fee_due_now_percentage}%
            </td>
            <td style={tdStyle} className="font-bold">
              ${applicantQuote?.local_prc_fee_due_now}
            </td>
          </tr>
          <tr>
            <td style={tdStyle} colSpan={2} className="text-right font-bold ">
              Local Processing Fee Due After Approval
            </td>
            <td style={tdStyle} className="font-bold">
              ${applicantQuote?.local_prc_due_after_approval}
            </td>
          </tr>
          <tr>
            <td style={tdStyle} colSpan={2}>
              Passport & Oath of Allegiance Fee
            </td>
            <td style={tdStyle}>
              ${applicantQuote?.passport_and_oath_of_allegiance_fee}
            </td>
          </tr>

          {/* BLUE ROW */}
          <tr>
            <td
              colSpan={3}
              style={tdStyle}
              className="bg-[#012168] text-[#012168]"
            >
              -
            </td>
          </tr>

          {/* EMPTY ROW */}
          <tr>
            <td colSpan={3} style={tdStyle} className="bg-white text-white">
              -
            </td>
          </tr>

          {/* ROW 17 */}
          <tr>
            <td style={tdStyle} colSpan={2}>
              Total Due On Citizenship Approval
            </td>
            <td style={tdStyle}>
              ${applicantQuote?.total_due_on_citizenship_approval}
            </td>
          </tr>

          <tr>
            <td style={tdStyle} colSpan={2}>
              Total Due Now
            </td>
            <td style={tdStyle}>${applicantQuote?.total_due_now}</td>
          </tr>

          {/* EMPTY ROW */}
          <tr>
            <td colSpan={3} style={tdStyle} className="bg-white text-white">
              -
            </td>
          </tr>

          {/* ROW 9 */}
          <tr>
            <td style={tdStyle} colSpan={2}>
              {" "}
              Program Grand Total
            </td>
            <td style={tdStyle}>${applicantQuote?.program_total}</td>
          </tr>
          {/* ROW 10 */}
          <tr>
            <td style={tdStyle} colSpan={2}>
              {" "}
              Program Grand Total Due After Approval
            </td>
            <td style={tdStyle}>
              ${applicantQuote?.program_total_due_after_approval}
            </td>
          </tr>

          <tr>
            <td style={tdStyle} colSpan={2}>
              {" "}
              Program Total Due Now
            </td>
            <td style={tdStyle}>${applicantQuote?.program_total_due_now}</td>
          </tr>

          <tr>
            <td style={tdStyle} colSpan={2}>
              {" "}
              St. Kitts Total
            </td>
            <td style={tdStyle}>${applicantQuote?.st_kitts_total}</td>
          </tr>
        </table>
      </div>
    </Skeleton>
  );
};

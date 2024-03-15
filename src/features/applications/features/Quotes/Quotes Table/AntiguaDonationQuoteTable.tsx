import React from "react";
import { useGetSingleQuote } from "src/features/applications/hooks/Quotes hooks/useGetSingleQuote";
import {
  todaysDate,
  tableStyle,
  thStyle,
  colOneStyle,
  tdStyle,
} from "src/features/applications/pages/SendQuote";
import { IAntiguaDonationQuote } from "src/features/applications/types/types";
import { IGetQuoteProps } from "./DomincaQuoteTable";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Skeleton } from "antd";

export const AntiguaDonationQuoteTable: React.FC<IGetQuoteProps> = ({ id }) => {
  const { data, isLoading } = useGetSingleQuote<IAntiguaDonationQuote>({
    id: id as unknown as number,
  });

  const applicantInfo = data?.Applicant_info;
  const applicantQuote = data?.Applicant_info.antigua_donation_quote;

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
            <td rowSpan={20} style={colOneStyle} colSpan={2}>
              Antigua & Barbacuda Donation Quote
            </td>
            <td style={tdStyle} colSpan={3}>
              Payment for processing & various fees. <br />
              The payment is as follows:
            </td>
          </tr>
          {/* ROW 3 */}
          <tr>
            <td style={tdStyle}>Country Fee Due Now</td>
            <td style={tdStyle}>
              {applicantQuote?.country_fee_due_now_percentage}%
            </td>
            <td style={tdStyle}>${applicantQuote?.country_fee_due_now}</td>
          </tr>
          {/* ROW 4 */}
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
              Due Diligence Fee
            </td>
            <td style={tdStyle}>${applicantQuote?.due_diligence_fee}</td>
          </tr>

          {/* ROW 6 */}
          <tr>
            <td colSpan={2} style={tdStyle}>
              Government Passport, Oath and Allegiance Fee
            </td>
            <td style={tdStyle}>
              ${applicantQuote?.govt_passport_oath_and_allegiance_fee}
            </td>
          </tr>

          {/* ROW 7 */}
          <tr>
            <td colSpan={2} style={tdStyle}>
              Goverment Processing Fee
            </td>
            <td style={tdStyle}>${applicantQuote?.govt_processing_fee}</td>
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
              Legal and Advisory Fee
            </td>
            <td style={tdStyle} className="font-bold">
              ${applicantQuote?.legal_and_advisory_fee}
            </td>
          </tr>

          <tr>
            <td style={tdStyle} colSpan={2} className="text-right font-bold ">
              Local Processing Fee
            </td>
            <td style={tdStyle} className="font-bold">
              ${applicantQuote?.local_processing_fee}
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
              ${applicantQuote?.local_processing_fee_due_now}
            </td>
          </tr>
          <tr>
            <td style={tdStyle} colSpan={2} className="text-right font-bold ">
              Local Processing Fee Due on Approval
            </td>
            <td style={tdStyle} className="font-bold">
              ${applicantQuote?.local_processing_fee_due_on_approval}
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
              Program Grand Total Due Now
            </td>
            <td style={tdStyle}>
              ${applicantQuote?.program_grand_total_due_now}
            </td>
          </tr>

          {/* ROW 10 */}
          <tr>
            <td style={tdStyle} colSpan={2}>
              {" "}
              Program Grand Total Due on Approval
            </td>
            <td style={tdStyle}>
              ${applicantQuote?.program_grand_total_due_on_approval}
            </td>
          </tr>
        </table>
      </div>
    </Skeleton>
  );
};

import { Icon } from "@iconify/react/dist/iconify.js";
import { Skeleton } from "antd";
import { useGetSingleQuote } from "src/features/applications/hooks/Quotes hooks/useGetSingleQuote";
import {
  todaysDate,
  tableStyle,
  thStyle,
  colOneStyle,
  tdStyle,
  tdPayment,
} from "src/features/applications/pages/SendQuote";
import { IGetDominicaQuote } from "src/features/applications/types/types";

export interface IGetQuoteProps {
  id: number | undefined;
}
export const DomincaQuoteTable: React.FC<IGetQuoteProps> = ({ id }) => {
  const { data, isLoading } = useGetSingleQuote<IGetDominicaQuote>({
    id: id as unknown as number,
  });

  const applicantInfo = data?.Applicant_info;
  const applicantQuote = data?.Applicant_info.dominica_donation_quote;
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
              Dominica Donation Quote
            </td>
            <td style={tdStyle} colSpan={3}>
              Payment for processing & various fees. <br />
              The payment is as follows:
            </td>
          </tr>

          {/* ROW 3 */}
          <tr>
            <td colSpan={2} style={tdStyle}>
              Dominica Gov't Contribution
            </td>
            <td style={tdPayment}>${applicantQuote?.govt_contribution_fee}</td>
          </tr>
          <tr>
            <td colSpan={2} style={tdStyle}>
              Dominica Gov't Processing Fee
            </td>
            <td style={tdPayment}>${applicantQuote?.govt_processing_fee}</td>
          </tr>

          <tr>
            <td colSpan={2} style={tdStyle}>
              Dominica Gov't Due Diligence
            </td>
            <td style={tdPayment}>${applicantQuote?.govt_due_diligence_fee}</td>
          </tr>

          <tr>
            <td colSpan={2} style={tdStyle}>
              Dominica Gov't Cert. of Neutralization Fee
            </td>
            <td style={tdPayment}>
              ${applicantQuote?.govt_cert_neutralization_fee}
            </td>
          </tr>

          <tr>
            <td style={tdPayment} colSpan={2} className="text-right font-bold ">
              Dominica Total Quote
            </td>
            <td style={tdPayment} className="font-bold">
              ${applicantQuote?.dominica_total}
            </td>
          </tr>

          {/* ROW 12 */}

          {/* ROW 5 */}
          <tr>
            <td colSpan={2} style={tdStyle}>
              Government Certified Neutralization Fee
            </td>
            <td style={tdPayment}>
              ${applicantQuote?.govt_cert_neutralization_fee}
            </td>
          </tr>
          {/* BLUE ROW */}
          <tr>
            <td
              colSpan={3}
              style={tdStyle}
              className="bg-[#012168] text-[#012168]"
            >
              .
            </td>
          </tr>
          <tr>
            <td style={tdStyle} colSpan={2}>
              Local Processing Fee
            </td>
            <td style={tdPayment}>${applicantQuote?.local_processing_fee}</td>
          </tr>
          {/* EMPTY ROW */}
          <tr>
            <td colSpan={3} style={tdStyle} className="bg-white text-white">
              .
            </td>
          </tr>
          {/* BLUE ROW */}
          <tr>
            <td
              colSpan={3}
              style={tdStyle}
              className="bg-[#012168] text-[#012168]"
            >
              .
            </td>
          </tr>

          <tr>
            <td
              colSpan={3}
              style={tdPayment}
              className="font-bold"
              // className="bg-[#012168] text-[#012168]"
            >
              Payment Plan
            </td>
          </tr>
          <tr>
            <td style={tdStyle}>Dominica Total Due Now</td>
            <td style={tdPayment}>
              {applicantQuote?.country_fee_due_now_percentage}%
            </td>
            <td style={tdPayment}>${applicantQuote?.country_fee_due_now}</td>
          </tr>

          <tr>
            <td style={tdStyle}>Local Processing Fee Due Now</td>
            <td style={tdPayment}>
              {applicantQuote?.local_processing_fee_due_now_percentage}%
            </td>
            <td style={tdPayment}>
              ${applicantQuote?.local_processing_fee_due_now}
            </td>
          </tr>

          <tr>
            <td style={tdPayment} colSpan={2}  className="text-[#EC5252] font-bold text-right">
             Total Due Now
            </td>
            <td style={tdPayment}  className="text-[#EC5252] font-bold">${applicantQuote?.total_due_now}</td>
          </tr>
          <tr>
            <td style={tdStyle} colSpan={2}>
              Balance Due On Citizenship Approval
            </td>
            <td style={tdPayment}>
              ${applicantQuote?.total_due_on_citizenship_approval}
            </td>
          </tr>
          {/* ROW 4 */}
        
        </table>
      </div>
    </Skeleton>
  );
};

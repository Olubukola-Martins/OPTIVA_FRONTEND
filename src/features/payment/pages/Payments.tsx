import { DatePicker, Form, InputNumber, Modal, Select } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { SimpleCard } from "src/components/cards/SimpleCard";
import PaymentsListTable from "../components/PaymentsListTable";
import QuotesGenTable from "../components/QuotesGenTable";
import InvoiceGenTable from "../components/InvoiceGenTable";
import OutstandingPaymentsTable from "../components/OutstandingPaymentsTable";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import {
  IAllGeneratedQuotes,
  IAllOutstandingPayments,
  IAllPayments,
} from "src/features/meetings/types/types";
import { END_POINT } from "src/config/environment";

interface IQueryDataType<TPageData> {
  data: TPageData | undefined;
  isLoading: boolean;
  // refetch: (
  //   options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  // ) => Promise<QueryObserverResult<any, any>>;
}

const Payments = () => {
  const paymentsUrl = `${END_POINT.BASE_URL}/admin/payments`;
  const QUERY_KEY_PAYMENTS = "AllPayments";
  const quotesUrl = `${END_POINT.BASE_URL}/admin/quotes`;
  const QUERY_KEY_QUOTES = "AllQuotes";
  const OutstandingPaymentUrl = `${END_POINT.BASE_URL}/admin/outstanding-payments`;
  const QUERY_KEY_OUTSTANDING_PAYMENTS = "AllOutstandingPayment";

  // Payments list data
  const {
    data: allPaymentsData,
    isLoading: allPaymentsLoading,
  }: IQueryDataType<IAllPayments> = useFetchAllItems({
    queryKey: QUERY_KEY_PAYMENTS,
    urlEndPoint: paymentsUrl,
  });
  // Quotes data
  const {
    data: allGenQuotesData,
    isLoading: allGenQuotesLoading,
  }: IQueryDataType<IAllGeneratedQuotes> = useFetchAllItems({
    queryKey: QUERY_KEY_QUOTES,
    urlEndPoint: quotesUrl,
  });
  // Outstanding payment
  const {
    data: allOutPaymentData,
    isLoading: allOutPaymentLoading,
  }: IQueryDataType<IAllOutstandingPayments> = useFetchAllItems({
    queryKey: QUERY_KEY_OUTSTANDING_PAYMENTS,
    urlEndPoint: OutstandingPaymentUrl,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState("Payments List");
  const [modalForm] = Form.useForm();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { RangePicker } = DatePicker;
  const handleFilter = () => {
    setIsModalOpen(false);
    modalForm.resetFields();
  };
  const handleFilterValuesChange = () => {
    const allFieldValues = modalForm.getFieldsValue();
    const allEmpty = Object.values(allFieldValues).every((value) => {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else {
        return !value;
      }
    });
    setIsSubmitDisabled(allEmpty);
  };
  const cardColors: ("blue" | "green" | "yellow" | "oxblood")[] = [
    "green",
    "yellow",
    "blue",
    "oxblood",
  ];
  const cardTitles: string[] = [
    "Total payments Made",
    "Total Quotes Generated",
    "Total Invoices Generated",
    "Outstanding Payment",
  ];
  const cardCounts: number[] = [
    allPaymentsData?.data.length as number,
    allGenQuotesData?.data.length as number,
    0,
    allOutPaymentData?.data.length as number,
  ];

  useEffect(() => {
    console.log("length", allPaymentsData?.data.length);
    console.log("data", allPaymentsData);
  }, [
    allPaymentsData,
    allPaymentsLoading,
    allGenQuotesData,
    allGenQuotesLoading,
    allOutPaymentLoading,
    allOutPaymentData,
  ]);

  return (
    <>
      <Modal
        title="Filter"
        footer={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        {/* make everything compulsory */}
        <Form
          name="modalFilter"
          form={modalForm}
          layout="vertical"
          className="pt-8 px-4"
          onValuesChange={handleFilterValuesChange}
          onFinish={handleFilter}
        >
          <Form.Item label="Filter by Columns" name="filterColumns">
            <Select
              mode="multiple"
              options={[
                {
                  value: "Applicant ID",
                  label: "Applicant ID",
                },
                {
                  value: "Applicant Name",
                  label: "Applicant Name",
                },
                {
                  value: "Country",
                  label: "Country",
                },
                {
                  value: "Investment Route",
                  label: "Investment Route",
                },
                {
                  value: "Number of Dependents",
                  label: "Number of Dependents",
                },
                {
                  value: "Date Created",
                  label: "Date Created",
                },
                {
                  value: "Created By",
                  label: "Created By",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Filter by Country" name="filterCountry">
            <Select
              mode="multiple"
              options={[
                {
                  value: "Antigua & Barbuda",
                  label: "Antigua & Barbuda",
                },
                {
                  value: "Dominica",
                  label: "Dominica",
                },
                {
                  value: "Grenada",
                  label: "Grenada",
                },
                {
                  value: "St. Kitts & Levis",
                  label: "St. Kitts & Levis",
                },
                {
                  value: "St. Lucia",
                  label: "St. Lucia",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Filter by Investment Route"
            name="filterInvestmentRoute"
          >
            <Select
              mode="multiple"
              options={[
                {
                  value: "CBI",
                  label: "CBI",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="filterAmount" label="Filter Amount">
            <InputNumber addonAfter="$" />
          </Form.Item>
          <AppButton
            type="submit"
            label="Apply Filter"
            isDisabled={isSubmitDisabled}
          />
        </Form>
      </Modal>
      <PageIntro
        title="Payments"
        description="View & Update Clients Payments"
        arrowBack={false}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            className="cursor-pointer"
            key={i}
            onClick={() => {
              switch (i) {
                case 0:
                  setCurrentTable("Payments List");
                  break;
                case 1:
                  setCurrentTable("Quotes Generated");
                  break;
                case 2:
                  setCurrentTable("Invoices Generated");
                  break;
                case 3:
                  setCurrentTable("Outstanding Payments");
                  break;
                default:
                  setCurrentTable("Payments List");
              }
            }}
          >
            <SimpleCard
              icon="iconoir:page"
              cardColor={cardColors[i]}
              title={cardTitles[i]}
              count={cardCounts[i]}
            />
          </div>
        ))}
      </div>
      <div className="border-gray-100 border-t-2 border-r-2 border-l-2 border-b-0 rounded-t-md w-full mt-[52px] px-4 flex sm:flex-row flex-col items-center justify-around">
        <h3 className="font-bold pt-2 sm:pt-0">{currentTable}</h3>

        <div className="my-3 ml-auto flex flex-col lg:flex-row items-start lg:items-center gap-2.5">
          <div className="flex flex-row items-center gap-x-2">
            <Search placeholder="Search" allowClear style={{ width: 150 }} />
            <AppButton
              label="Filter"
              type="button"
              handleClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="flex sm:flex-row flex-col gap-2 items-center gap-x-8">
            <RangePicker style={{ width: 300 }} />
            {/* <AppButton label="View All" /> */}
          </div>
        </div>
      </div>
      {/*All tables */}
      {currentTable === "Payments List" && (
        <PaymentsListTable
          allData={allPaymentsData}
          dataLoading={allPaymentsLoading}
        />
      )}
      {currentTable === "Quotes Generated" && (
        <QuotesGenTable
          allData={allGenQuotesData}
          dataLoading={allGenQuotesLoading}
        />
      )}
      {currentTable === "Invoices Generated" && <InvoiceGenTable />}
      {currentTable === "Outstanding Payments" && (
        <OutstandingPaymentsTable
          allData={allOutPaymentData}
          dataLoading={allOutPaymentLoading}
        />
      )}
    </>
  );
};

export default Payments;

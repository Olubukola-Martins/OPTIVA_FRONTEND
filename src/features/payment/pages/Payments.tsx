import { DatePicker, Form,    InputNumber, Modal, Select } from "antd";
import Search from "antd/es/input/Search";
import { useEffect,  useState } from "react";
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
  IAllInvoices,
  IAllOutstandingPayments,
  IAllPayments,
} from "src/features/meetings/types/types";
import { END_POINT } from "src/config/environment";
import React from "react";
import { usePagination } from "src/hooks/usePagination";
import { useDebounce } from "src/hooks/useDebounce";
import FormItemCountry from "../components/FormItemCountry";
import FormItemInvestRoute from "../components/FormItemInvestRoute";

export interface IQueryDataType<TPageData> {
  data: TPageData | undefined;
  isLoading: boolean;
  // refetch: (
  //   options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  // ) => Promise<QueryObserverResult<any, any>>;
}

export const AllPaymentsContext = React.createContext<{
  paymentsData: IAllPayments | undefined;
  setPaymentsData: React.Dispatch<
    React.SetStateAction<IAllPayments | undefined>
  >;
}>({
  paymentsData: undefined,
  setPaymentsData: () => {},
});

export const paymentsUrl = `${END_POINT.BASE_URL}/admin/payments`;
export const QUERY_KEY_PAYMENTS = "AllPayments";
export const QUERY_KEY_QUOTES = "AllQuotes";
export const QUERY_KEY_OUTSTANDING_PAYMENTS = "AllOutstandingPayment";
export const QUERY_KEY_INVOICES = "Invoices";

const Payments = () => {
  const quotesUrl = `${END_POINT.BASE_URL}/admin/quotes`;
  const OutstandingPaymentUrl = `${END_POINT.BASE_URL}/admin/outstanding-payments`;
  const invoicesUrl = `${END_POINT.BASE_URL}/admin/invoice`;
  const [currentTable, setCurrentTable] = useState("Payments List");
  const [searchValue, setSearchValue] = useState('');
  const { pagination, onChange } = usePagination();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterValues, setFilterValues] = useState<{
    [key: string]: any;
} | undefined>();

  
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);


  // Payments list data
  const {
    data: allPaymentsData,
    isLoading: allPaymentsLoading,
  }: IQueryDataType<IAllPayments> = useFetchAllItems({
    search:currentTable === "Payments List" ? debouncedSearchTerm : '',
    pagination,otherParams:undefined,
    queryKey: QUERY_KEY_PAYMENTS,
    urlEndPoint: paymentsUrl,
  });
  // Quotes data
  const {
    data: allGenQuotesData,
    isLoading: allGenQuotesLoading,
  }: IQueryDataType<IAllGeneratedQuotes> = useFetchAllItems({
    search:currentTable === "Quotes Generated" ? debouncedSearchTerm : '',
    pagination,
    queryKey: QUERY_KEY_QUOTES,
    urlEndPoint: quotesUrl,
  });
  // Outstanding payment
  const {
    data: allOutPaymentData,
    isLoading: allOutPaymentLoading,
  }: IQueryDataType<IAllOutstandingPayments> = useFetchAllItems({
    search:currentTable === "Outstanding Payments" ? debouncedSearchTerm : '',
    pagination,
    queryKey: QUERY_KEY_OUTSTANDING_PAYMENTS,
    urlEndPoint: OutstandingPaymentUrl,
  });
  // Invoices
  const {
    data: allInvoices,
    isLoading: allInvoicesLoading,
  }: IQueryDataType<IAllInvoices> = useFetchAllItems({
    search:currentTable === "Invoices Generated" ? debouncedSearchTerm : '',
    pagination,
    queryKey: QUERY_KEY_INVOICES,
    urlEndPoint: invoicesUrl,
  });

  const [paymentsData, setPaymentsData] = useState<IAllPayments | undefined>(
    allPaymentsData
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = Form.useForm();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { RangePicker } = DatePicker;
  const handleFilter = (values:{country_id:number,investment_route_id:number,amount_paid:number,startToEndDate:any}) => {
    console.log("values",values)
    console.log("type Of start to end date Range", typeof values.startToEndDate)
    // start_date , end_date
    // end_time: dayjs(end_time).format("YYYY-MM-DD"),
    // start_time: dayjs(start_time).format("YYYY-MM-DD"),

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
    "Outstanding Payments",
  ];
  const cardCounts: number[] = [
    allPaymentsData?.meta.total as number,
    allGenQuotesData?.data.total as number,
    allInvoices?.meta.total as number,
    allOutPaymentData?.meta.total as number,
  ];

  useEffect(() => {
    setPaymentsData(allPaymentsData);
  }, [
    paymentsData,
    allPaymentsData,
    allPaymentsLoading,
    allGenQuotesData,
    allGenQuotesLoading,
    allOutPaymentLoading,
    allOutPaymentData,
  ]);

  return (
    <AllPaymentsContext.Provider value={{ paymentsData, setPaymentsData }}>
      <>
        <Modal
          title={`Filter ${currentTable}`}
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

            <FormItemCountry name="country_id" label="Filter by Country"  />
            <FormItemInvestRoute name="investment_route_id" label="Filter by Investment Route"/>
            <Form.Item className={`${currentTable === "Quotes Generated" || currentTable === "Invoices Generated" ? "hidden" : ""}`} name="amount_paid" label="Filter Amount">
              <InputNumber addonAfter="$" />
            </Form.Item>
              
            <Form.Item name="startToEndDate" label="Start To End Date"><RangePicker  /></Form.Item>
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
        <div className=" max-w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-8 cursor-pointer">
          {Array.from({ length: 4 }).map((_, i) => (
            <SimpleCard
              key={i}
              icon="iconoir:page"
              cardColor={cardColors[i]}
              title={cardTitles[i]}
              count={cardCounts[i]}
              handleClick={() => {
                 setSearchTerm('')
                 setSearchValue('');
                 setTimeout(() => {
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
                }, 0);              }}
            />
          ))}
        </div>
        <div className="border-gray-100 border-t-2 border-r-2 border-l-2 border-b-0 rounded-t-md w-full mt-[52px] px-4 flex sm:flex-row flex-col items-center justify-around">
          <h3 className="font-bold pt-2 sm:pt-0">{currentTable}</h3>

          <div className="my-3 ml-auto flex flex-col lg:flex-row items-start lg:items-center gap-2.5">
            <div className="flex flex-row items-center gap-x-2">
               <Search placeholder="Search Name" value={searchValue} allowClear style={{ width: 150 }} onSearch={(val) => setSearchTerm(val)}
            onChange={(e) => {e.target.value === "" && setSearchTerm(""); setSearchValue(e.target.value)}} 
 /> 
              <AppButton
                label="Filter"
                type="button"
                handleClick={() => {setIsModalOpen(true); }}
              />
            </div>
          </div>
        </div>
        {/*All tables */}
        {currentTable === "Payments List" && (
          <PaymentsListTable
            allData={allPaymentsData}
            dataLoading={allPaymentsLoading}
            pagination={pagination}
            onChange={onChange}
          />
        )}
        {currentTable === "Quotes Generated" && (
          <QuotesGenTable
            allData={allGenQuotesData}
            dataLoading={allGenQuotesLoading}
            pagination={pagination}
            onChange={onChange}

          />
        )}
        {currentTable === "Invoices Generated" && (
          <InvoiceGenTable
            allData={allInvoices}
            dataLoading={allInvoicesLoading}
            pagination={pagination}
            onChange={onChange}

          />
        )}
        {currentTable === "Outstanding Payments" && (
          <OutstandingPaymentsTable
            allData={allOutPaymentData}
            dataLoading={allOutPaymentLoading}
            pagination={pagination}
            onChange={onChange}

          />
        )}
      </>
    </AllPaymentsContext.Provider>
  );
};

export default Payments;

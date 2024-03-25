import {
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Modal,
  Select,
  Spin,
} from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  IAllGeneratedQuotes,
  IGeneratedQuoteDatum,
} from "src/features/meetings/types/types";
import {
  useSendQuote,
} from "../hooks/useSendOrDownloadQuote";
import useGenerateInvoice from "../hooks/useGenerateInvoice";
import { useForm } from "antd/es/form/Form";
import {
  generalValidationRules,
  generalValidationRulesOpt,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import TextArea from "antd/es/input/TextArea";
import { AppButton } from "src/components/button/AppButton";
import FxRatesFormInput from "./FxRatesFormInput";
import { appRoute } from "src/config/routeMgt/routePaths";
import { Link } from "react-router-dom";

type DataSourceItem = {
  key: number;
  SN: number;
  applicantID: number;
  applicantUniqueID:string;
  applicantName: string;
  country: string;
  investmentRoute: string;
  dependents: number;
  dateCreated: string;
  createdBy: string;
  programName: string;
  applicationId: number;
};

interface IProps {
  allData: IAllGeneratedQuotes | undefined;
  dataLoading: boolean;
  pagination: TablePaginationConfig;
  onChange: (pagination: TablePaginationConfig) => void;

}

const QuotesGenTable = ({ allData, dataLoading,onChange }: IProps) => {
  const [paymentCurrency, setPaymentCurrency] = useState<string>("enterUSD");
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [sendQuoteKey, setSendQuoteKey] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = useForm();
  const [currentProgram, setCurrentProgram] = useState<string>();
  // const [quoteUrl, setQuoteUrl] = useState<string>();
  const [currentApplicationId, setCurrentApplicationId] = useState<number>();
  const { generateInvoice, generateInvoiceLoading } = useGenerateInvoice();

  const { isLoading: sendingQuote } = useSendQuote({
    itemId: sendQuoteKey as number,
  });


  // Handle generate invoice
  const handleGenerateInvoice = (values: {
    fxRate: {
      value: number;
      label: string;
    };
    paymentsNGN: number;
    description: string;
    quantity: number;
    paymentsUSD: number;
  }) => {
    const newData = {
      description: values.description,
      quantity: values.quantity,
      amount_in_naira: values.paymentsNGN
        ? values.paymentsNGN
        : values.paymentsUSD * values.fxRate.value,
      amount: values.paymentsUSD
        ? values.paymentsUSD
        : values.paymentsNGN / values.fxRate.value,
      fx_rate: values.fxRate.label,
    };
    generateInvoice(newData, currentApplicationId as number);
    setIsModalOpen(false);
  };


  useEffect(() => {}, [
    sendQuoteKey,
    currentApplicationId,
    currentProgram,
  ]);

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: DataSourceItem[]
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  // COLUMS OF TABLE
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "SN",
    },
    {
      key: "2",
      title: "Applicant ID",
      dataIndex: "applicantUniqueID",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "3",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "4",
    },
    {
      title: "Investment Route",
      dataIndex: "investmentRoute",
      key: "5",
    },
    {
      title: "Number of Dependents",
      dataIndex: "dependents",
      key: "6",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "7",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "8",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Link to={appRoute.viewQuote(record.applicantID as number).path}>
                  View
                </Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  // handleSendQuote(record.key as number);
                  setSendQuoteKey(record.key as number);
                }}
              >
                Send Quote
              </Menu.Item>

              <Menu.Item
                key="3"
                onClick={() => {
                  setCurrentProgram(record.programName as string);
                  setCurrentApplicationId(record.applicationId as number);
                  setIsModalOpen(true);
                }}
              >
                {/* <Link to={appRoute.generateInvoice(record.key as number).path}> */}
                Generate Invoice
                {/* </Link> */}
              </Menu.Item>

              <Menu.Item>
                <a
                  href={`https://optiva-backend.techmur.com/api/admin/download-quote/${
                    record.applicantID as number
                  }`}
                  target="_blank"
                >
                  Download
                </a>
              </Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

  const formattedDate = (inputTimestamp: string) => {
    const date = new Date(inputTimestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (allData) {
      const mainData = allData.data;
      const data = mainData.map((quote: IGeneratedQuoteDatum, i) => {
        const {
          applicant_unique_id,
          id,
          applicant_full_name,
          country,
          investment_route,
          number_of_dependents,
          created_at,
          generated_by,
          applicant,
        } = quote;
        return {
          key: id,
          SN: i + 1,
          applicantUniqueID: applicant_unique_id,
          applicantID: applicant.id,
          applicantName: applicant_full_name,
          country,
          investmentRoute: investment_route,
          dependents: +number_of_dependents,
          dateCreated: formattedDate(created_at),
          createdBy: generated_by,
          programName: applicant.application.programtype.program_name,
          applicationId: applicant.application_id,
        };
      });
      setDataSource(data);
    }
  }, [allData, dataLoading]);

  useEffect(() => {}, [currentApplicationId, currentProgram]);
  useEffect(() => {
    paymentCurrency === "enterUSD"
      ? modalForm.setFieldValue("paymentsNGN", null)
      : modalForm.setFieldValue("paymentsUSD", null);
  }, [paymentCurrency]);

  return (
    <>
      <Spin spinning={sendingQuote}>
        <Table
          loading={dataLoading}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          // pagination={{ ...pagination, total: allData?. }}
          onChange={onChange}  
          scroll={{ x: 900 }}
          className="border-gray-100 border-t-0 border-2 rounded-b-md"
        />
        <Modal
          title="Generate Invoice"
          footer={null}
          open={isModalOpen}
          onCancel={() => {
            modalForm.resetFields();
            setIsModalOpen(false);
          }}
        >
          {/* make everything compulsory */}
          <Form
            name="generateInvoice"
            form={modalForm}
            layout="vertical"
            className="pt-8 px-4"
            onFinish={handleGenerateInvoice}
          >
            <Form.Item
              label={"Program"}
              name="program"
              rules={generalValidationRules}
              initialValue={currentProgram}
            >
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              name="description"
              label={"Description"}
              rules={textInputValidationRules}
            >
              <TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
            <FxRatesFormInput />
            <Form.Item
              label={"Choose payment currency"}
              name="selectPaymentCurrency"
              // rules={generalValidationRules}
            >
              <Select
                defaultValue={"enterUSD"}
                onChange={(val) => {
                  setPaymentCurrency(val);
                }}
                options={[
                  { value: "enterUSD", label: "Enter USD payment" },
                  { value: "enterNGN", label: "Enter NGN payment" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={"Payments USD"}
              name="paymentsUSD"
              rules={
                paymentCurrency === "enterUSD"
                  ? generalValidationRules
                  : generalValidationRulesOpt
              }
              className={`${paymentCurrency === "enterNGN" ? "hidden" : ""}`}
            >
              <InputNumber addonAfter="$" />
            </Form.Item>
            <Form.Item
              label={"Payments NGN"}
              name="paymentsNGN"
              className={`${paymentCurrency === "enterUSD" ? "hidden" : ""}`}
              rules={
                paymentCurrency === "enterNGN"
                  ? generalValidationRules
                  : generalValidationRulesOpt
              }
            >
              <InputNumber addonAfter="₦" />
            </Form.Item>
            <Form.Item
              label={"Quantity"}
              name="quantity"
              rules={generalValidationRules}
            >
              <InputNumber />
            </Form.Item>

            <div className="flex justify-between">
              <AppButton
                label="Cancel"
                handleClick={() => setIsModalOpen(false)}
              />
              <AppButton type="submit" isLoading={generateInvoiceLoading} />
            </div>
          </Form>
        </Modal>
      </Spin>
    </>
  );
};

export default QuotesGenTable;

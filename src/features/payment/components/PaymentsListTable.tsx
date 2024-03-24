import { Dropdown, Input, InputNumber, Menu, Form, Modal, Select } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { IAllPayments, PaymentsDatum } from "src/features/meetings/types/types";
import useMoveApplicantToMastersList from "../hooks/useMoveApplicantToMastersList";
import { useForm } from "antd/es/form/Form";
import {
  generalValidationRules,
  generalValidationRulesOpt,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import TextArea from "antd/es/input/TextArea";
import { AppButton } from "src/components/button/AppButton";
import useGenerateInvoice from "../hooks/useGenerateInvoice";
import FxRatesFormInput from "./FxRatesFormInput";

type DataSourceItem = {
  key: React.Key;
  SN: number;
  // applicantID: number;
  applicantID: string;
  applicationId: number;
  applicantName: string;
  country: string;
  investmentRoute: string;
  dependents: number;
  amountPaid: string;
  outstandingPayment: string;
  lastUpdated: string;
  programName: string;
  // updatedBy: string;
};

interface IProps {
  allData: IAllPayments | undefined;
  dataLoading: boolean;
  pagination: TablePaginationConfig;
  onChange: (pagination: TablePaginationConfig) => void;
}

const PaymentsListTable = ({ allData, dataLoading,pagination,onChange }: IProps) => {
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  // const [applicationId, setApplicationId] = useState<number>();
  const { moveToMasterList, moveToMasterLoading } =
    useMoveApplicantToMastersList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = useForm();
  const [currentProgram, setCurrentProgram] = useState<string>();
  const [currentApplicationId, setCurrentApplicationId] = useState<number>();
  const { generateInvoice, generateInvoiceLoading } = useGenerateInvoice();
  const [paymentCurrency, setPaymentCurrency] = useState<string>("enterUSD");


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
    // const { fxRateString, exchangeRate } = values.fxRate;
    const newData = {
      description: values.description,
      quantity: values.quantity,
      amount_in_naira: values.paymentsNGN
        ? values.paymentsNGN
        : values.paymentsUSD * values.fxRate.value,
      // amount in USD
      amount: values.paymentsUSD
        ? values.paymentsUSD
        : values.paymentsNGN / values.fxRate.value,
      fx_rate: values.fxRate.label,
    };

    generateInvoice(newData, currentApplicationId as number);
    setIsModalOpen(false);
  };

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
      dataIndex: "applicantID",
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
      title: "Amount Paid",
      dataIndex: "amountPaid",
      key: "7",
    },
    {
      title: "Outstanding Payment",
      dataIndex: "outstandingPayment",
      key: "8",
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "9",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                  setCurrentProgram(record.programName as string);
                  setCurrentApplicationId(record.applicationId as number);
                  setIsModalOpen(true);
                }}
              >
                Generate Invoice
              </Menu.Item>
              <Menu.Item key="2">
                <Link
                  to={
                    appRoute.paymentDetails(record.key as unknown as number)
                      .path
                  }
                >
                  Payment Details
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="3">
                <Link
                  to={
                    appRoute.generateReciept(record.key as unknown as number)
                      .path
                  }
                >
                  Generate Receipt
                </Link>
              </Menu.Item> */}

              <Menu.Item
                key="3"
                onClick={() => {
                  setCurrentProgram(record.programName as string);
                }}
              >
                <Link
                  to={
                    appRoute.generateContract(record.applicationId as number)
                      .path
                  }
                >
                Generate Contract
                </Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => {
                  moveToMasterList(record.applicationId as number);
                }}
              >
                Move to Master List
              </Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

  // DATASOURCE FOR TABLE
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
      const data = mainData.map((payment: PaymentsDatum, i) => {
        return {
          key: payment.id,
          SN: i + 1,
          applicantID: payment.application.applicant.applicant_unique_id,
          applicantName: payment.application.applicant.full_name,
          applicationId: payment.application.id,
          country: payment.application.country.country_name,
          investmentRoute: payment.application.investmentroute.investment_name,
          dependents: payment.application.no_of_dependents,
          amountPaid: (+payment.amount_paid).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
          outstandingPayment: (+payment.outstanding_payment).toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }
          ),
          lastUpdated: formattedDate(payment.updated_at),
          programName: payment.application.programtype.program_name,
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
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 900 }}
        pagination={{ ...pagination, total: allData?.meta.total }}
        onChange={onChange}
        className="border-gray-100 border-t-0 border-2 rounded-b-md"
        loading={dataLoading || moveToMasterLoading}
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
    </>
  );
};

export default PaymentsListTable;

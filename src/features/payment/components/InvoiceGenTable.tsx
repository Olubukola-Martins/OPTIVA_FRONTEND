import { Dropdown, Form, Input, InputNumber, Menu, Modal, Select } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { IAllInvoices, InvoiceDatum } from "src/features/meetings/types/types";
import {
  generalValidationRules,
  generalValidationRulesOpt,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import FxRatesFormInput from "./FxRatesFormInput";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";

interface IProps {
  allData: IAllInvoices | undefined;
  dataLoading: boolean;
  pagination: TablePaginationConfig;
  onChange: (pagination: TablePaginationConfig) => void;
}

const InvoiceGenTable = ({
  allData,
  dataLoading,
  onChange,
  pagination,
}: IProps) => {
  type DataSourceItem = {
    id: React.Key;
    SN: number;
    applicantID: string;
    applicantName: string;
    country: string;
    investmentRoute: string;
    dependents: number;
    dateCreated: string;
    createdBy: string;
  };
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [paymentCurrency, setPaymentCurrency] = useState<
    "enterUSD" | "enterNGN"
  >("enterUSD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = useForm();

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
      render: (_: any, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Link to={appRoute.viewInvoice(record.id as number).path}>
                  View
                </Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item key="3">
                <a
                  href={`https://optiva-backend.techmur.com/api/admin/invoice/${record.id}/download-pdf`}
                  target="_blank"
                  // rel="noopener noreferrer" // For security reasons, add rel attribute
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
      const data = mainData.map((invoice: InvoiceDatum, i) => {
        return {
          id: invoice.id,
          SN: i + 1,
          applicantID: invoice.application.applicant.applicant_unique_id,
          applicantName: invoice.application.applicant.full_name,
          country: invoice.application.country.country_name,
          investmentRoute: invoice.application.investmentroute.investment_name,
          dependents: invoice.application.no_of_dependents,
          dateCreated: formattedDate(invoice.created_at),
          createdBy: invoice.updated_by.name,
        };
      });
      setDataSource(data);
    }
  }, [allData, dataLoading]);

  return (
    <>
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
          // onFinish={handleEditInvoice}
        >
          <Form.Item
            label={"Program"}
            name="program"
            rules={generalValidationRules}
            // initialValue={currentProgram}
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
              onChange={(val: "enterUSD" | "enterNGN") => {
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
            <AppButton type="submit" />
          </div>
        </Form>
      </Modal>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        loading={dataLoading}
        pagination={{ ...pagination, total: allData?.meta.total }}
        onChange={onChange}
        scroll={{ x: 900 }}
        className="border-gray-100 border-t-0 border-2 rounded-b-md"
      />
    </>
  );
};

export default InvoiceGenTable;

import {
  DatePicker,
  Dropdown,
  Form,
  InputNumber,
  Menu,
  Modal,
  Select,
  Table,
} from "antd";
import Search from "antd/es/input/Search";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { SimpleCard } from "src/components/cards/SimpleCard";
import { appRoute } from "src/config/routeMgt/routePaths";

const Payments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  type DataSourceItem = {
    key: React.Key;
    SN: number;
    applicantID: string;
    applicantName: string;
    country: string;
    investmentRoute: string;
    dependents: number;
    amountPaid: string;
    outstandingPayment: string;
    lastUpdated: string;
    updatedBy: string;
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
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "10",
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
                <Link
                  to={
                    appRoute.generateInvoice(record.key as unknown as number)
                      .path
                  }
                >
                  Generate Invoice
                </Link>
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
              <Menu.Item key="3">
                <Link
                  to={
                    appRoute.generateReciept(record.key as unknown as number)
                      .path
                  }
                >
                  Generate Receipt
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link
                  to={
                    appRoute.generateContract(record.key as unknown as number)
                      .path
                  }
                >
                  Generate Contract
                </Link>
              </Menu.Item>

              <Menu.Item key="5">Move to Master List</Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

  // DATASOURCE FOR TABLE
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 20; i++) {
    dataSource.push({
      key: i,
      SN: i + 1,
      applicantID: "230000-01",
      applicantName: "John Brown",
      country: "Grenada",
      investmentRoute: "Donation",
      dependents: 3,
      amountPaid: "$ 200,000",
      outstandingPayment: "$ 200,000",
      lastUpdated: "dd/mm/yy",
      updatedBy: "John Brown",
    });
  }

  return (
    <>
      <Modal
        title="New Payment Details"
        footer={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        {/* make everything compulsory */}
        <Form
          name="modalPaymentDetails"
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
          <SimpleCard
            icon="iconoir:page"
            cardColor={cardColors[i]}
            title={cardTitles[i]}
            count={0}
          />
        ))}
      </div>
      <div className="border-gray-100 border-t-2 border-r-2 border-l-2 border-b-0 rounded-t-md w-full mt-[52px] px-4 flex sm:flex-row flex-col items-center justify-around">
        <h3 className="font-bold pt-2 sm:pt-0">Payment List</h3>

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
            <AppButton label="View All" />
          </div>
        </div>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 900 }}
        className="border-gray-100 border-t-0 border-2 rounded-b-md"
      />
    </>
  );
};

export default Payments;

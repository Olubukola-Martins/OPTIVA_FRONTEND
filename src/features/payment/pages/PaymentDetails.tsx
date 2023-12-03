import {
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Modal,
  Typography,
} from "antd";
import "../style.css";
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useNavigate, useParams } from "react-router-dom";

interface IPaymentItem {
  key: React.Key;
  narration: JSX.Element;
  paidBy: JSX.Element;
  fxRate: JSX.Element;
  dateCreated: JSX.Element;
  datePaid: JSX.Element;
  paymentsUSD: JSX.Element;
  paymentsNGN: JSX.Element;
  balanceDue: JSX.Element;
}
const PaymentDetails = () => {
  const { TextArea } = Input;
  const { Text } = Typography;
  const { id } = useParams();
  const [modalForm] = Form.useForm();
  const navigate = useNavigate();
  // const [form] = Form.useForm();
  const [data, setData] = useState<IPaymentItem[]>([]);
  const onFinish = (values: any) => {
    console.log("form values", values);
  };

  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddNewPayment = (values: any) => {
    const newdateCreated = values.dateCreated;
    const newdatePaid = values.datePaid;
    const key = data.length + 1;
    const newDetail: IPaymentItem = {
      key,
      narration: (
        <Form.Item name={`${key}narration`} initialValue={values.narration}>
          <Text className="max-w-[200px]">{values.narration}</Text>
        </Form.Item>
      ),
      paidBy: (
        <Form.Item name={`${key}paidBy`} initialValue={values.paidBy}>
          <Text>{values.paidBy}</Text>
        </Form.Item>
      ),
      fxRate: (
        <Form.Item name={`${key}fxRate`} initialValue={"$1 = ₦751, Eur 000"}>
          <Text>$1 = ₦751, Eur 000</Text>
        </Form.Item>
      ),
      dateCreated: (
        <Form.Item name={`${key}dateCreated`} initialValue={newdateCreated}>
          <Text>
            {newdateCreated.$D}/{newdateCreated.$M}/{newdateCreated.$y}
          </Text>
        </Form.Item>
      ),
      datePaid: (
        <Form.Item name={`${key}datePaid`} initialValue={newdatePaid}>
          <Text>
            {newdatePaid.$D}/{newdatePaid.$M}/{newdatePaid.$y}
          </Text>
        </Form.Item>
      ),
      paymentsUSD: (
        <Form.Item name={`${key}paymentsUSD`} initialValue={values.paymentUSD}>
          <Text>{values.paymentUSD} USD</Text>
        </Form.Item>
      ),
      paymentsNGN: (
        <Form.Item name={`${key}paymentsNGN`} initialValue={values.paymentNGN}>
          <Text>{values.paymentNGN} NGN</Text>
        </Form.Item>
      ),
      balanceDue: (
        <Form.Item name={`${key}balanceDue`} initialValue={values.balanceDue}>
          <Text className="text-red-600">
            {values.balanceDue} <span className="text-gray-800">USD</span>
          </Text>
        </Form.Item>
      ),
    };
    setData((prev) => [...prev, newDetail]);
    setIsModalOpen(false);
    modalForm.resetFields();
    console.log("new", newDetail);
  };

  // TABLES
  type DataSource = {
    key: React.Key;
    item: string;
    amount: string;
  };
  const headColumnFirstTable: ColumnsType<DataSource> = [
    {
      key: "1",
      title: "Cost Profile",
      dataIndex: "costProfile",
      children: [
        { key: "item", dataIndex: "item" },
        { key: "amount", dataIndex: "amount" },
      ],
    },
  ];
  const headColumnSecondTable: ColumnsType<DataSource> = [
    {
      key: "1",
      title: "Account Summary",
      dataIndex: "accountSummary",
      children: [
        { key: "item", dataIndex: "item" },
        { key: "amount", dataIndex: "amount" },
      ],
    },
  ];
  const dataSourceFirst: DataSource[] = [
    {
      key: 1,
      item: "Total Grenada Real Estate Fee",
      amount: `330,000 USD`,
    },
    {
      key: 2,
      item: "Total Local Processing Fee",
      amount: `12,500 USD`,
    },
    {
      key: 3,
      item: "Total Program Fee",
      amount: `342,500 USD`,
    },
  ];

  const dataSourceSecond: DataSource[] = [
    {
      key: 1,
      item: "Total to be paid",
      amount: `342,500 USD`,
    },
    {
      key: 2,
      item: "Total Amount paid",
      amount: `110,500 USD`,
    },
    {
      key: 3,
      item: "Balance Outstanding",
      amount: `232,500 USD`,
    },
  ];

  // EDITABLE TABLE

  const editableColumns: ColumnsType<IPaymentItem> = [
    {
      title: "SN",
      render: (_: any, _record: IPaymentItem, index: number) => {
        return index + 1;
      },
    },
    { title: "Date Created", dataIndex: "dateCreated" },
    {
      title: "Narration",
      dataIndex: "narration",
    },
    { title: "Date Paid", dataIndex: "datePaid" },
    {
      title: "Paid By",
      dataIndex: "paidBy",
    },
    {
      title: "Fx Rate",
      dataIndex: "fxRate",
    },
    {
      title: "Payments USD",
      dataIndex: "paymentsUSD",
    },
    {
      title: "Payments NGN",
      dataIndex: "paymentsNGN",
    },
    {
      title: "Balance Due",
      dataIndex: "balanceDue",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record: IPaymentItem) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">View Payment Proof</Menu.Item>

                <Menu.Item
                  key="2"
                  onClick={() => {
                    const getPaymentDetails = {
                      key: record.key,
                      narration: record.narration.props.initialValue,
                      paidBy: record.paidBy.props.initialValue,
                      fxRate: record.fxRate.props.initialValue,
                      dateCreated: record.dateCreated.props.initialValue,
                      datePaid: record.datePaid.props.initialValue,
                      paymentsUSD: record.paymentsUSD.props.initialValue,
                      paymentsNGN: record.paymentsNGN.props.initialValue,
                      balanceDue: record.balanceDue.props.initialValue,
                    };
                    modalForm.setFieldsValue(getPaymentDetails);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageIntro title="Update Payment Details" linkBack={appRoute.payments} />

      <div className="border-2 rounded-xl border-gray-100 p-2 md:p-6 xl:p-12 md:w-11/12">
        <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full">
          <div className="w-full pb-4">
            <p className="pb-2">Applicant ID</p>
            <Input value={"230000-01"} disabled allowClear className="p-2.5 " />
          </div>
          <div className="w-full pb-4">
            {/* addonBefore={prefixSelector} */}
            <p className="pb-2">Phone Number</p>
            <Input
              value={"+1 (000) 000-0000"}
              disabled
              allowClear
              className="p-2.5"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full">
          <div className="w-full pb-4">
            <p className="pb-2">Applicant Name</p>
            <Input
              value={"Ruth Godwin"}
              disabled
              allowClear
              className="p-2.5"
            />
          </div>
          <div className="w-full pb-4">
            <p className="pb-2">Email</p>
            <Input value={"ruthgodwin@gmail.com"} disabled className="p-2.5" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full">
          <div className="w-full pb-4">
            <p className="pb-2">Number of Dependent(s)</p>
            <InputNumber value={4} disabled className="p-1.5 w-full" />
          </div>
          <div className="w-full pb-4">
            <p className="pb-2">Country</p>
            <Input value={"Grenada"} disabled className="p-2.5" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full ">
          <div className="w-full pb-4">
            <p className="pb-2">Applicant Address</p>
            <div className="gap-x-4 grid grid-cols-2 ">
              <div>
                <p className="pb-2 text-xs">Street</p>
                <Input value={16} disabled className="p-2.5" />
              </div>
              <div>
                <p className="pb-2 text-xs">Apt/Floor/Suite</p>
                <Input value={"2B"} disabled className="p-2.5" />
              </div>
              <div>
                <p className="pb-2 text-xs">City</p>
                <Input value={"Ikoyi"} disabled className="p-2.5" />
              </div>
              <div>
                <p className="pb-2 text-xs">State</p>
                <Input value={"Lagos"} disabled className="p-2.5" />
              </div>
              <div>
                <p className="pb-2 text-xs">Country</p>
                <Input value={"Nigeria"} disabled className="p-2.5" />
              </div>
              <div>
                <p className="pb-2 text-xs">Zip/postal code</p>
                <Input value={100244} disabled className="p-2.5" />
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="pb-4 w-full">
              <p className="pb-2">Program Name</p>
              <Input
                value="Citizenship By Investment"
                disabled
                className="p-2.5"
              />
            </div>

            <div className="pb-4 w-full">
              <p className="pb-2">Investment Route</p>
              <Input
                value="Real Estate Investment"
                disabled
                className="p-2.5 "
              />
            </div>
          </div>
        </div>
        {/* financial statement */}
        <div className="pt-4 sm:pt-0">
          <h3 className="font-medium text-lg ">Financial Statement</h3>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full pt-4">
            {/* table 1 */}
            <Table
              bordered={true}
              columns={headColumnFirstTable}
              dataSource={dataSourceFirst}
              className={`financialStatementTable w-full `}
              pagination={false}
              size="middle"
            />

            {/* table 2 */}
            <Table
              bordered={true}
              columns={headColumnSecondTable}
              dataSource={dataSourceSecond}
              className="financialStatementTable w-full"
              pagination={false}
              size="middle"
            />
          </div>
        </div>
        <AppButton
          type="button"
          label="Add New Payment Detail"
          containerStyle=" mt-6 ml-auto flex"
          handleClick={() => setIsModalOpen(true)}
        />
        <Form
          layout="vertical"
          name="updatePaymentDetails"
          onFinish={onFinish}
          className="flex flex-col"
        >
          {/* editable table */}
          <div className={`mt-3 sm:mt-5 ${data.length > 0 ? "" : "hidden"} `}>
            <Table
              bordered
              dataSource={data}
              columns={editableColumns}
              scroll={{ x: 1200 }}
            />
          </div>

          {/* buttons */}
          <div className="flex justify-end mt-4 gap-7 ">
            <AppButton
              variant="transparent"
              label="Cancel"
              type="button"
              containerStyle="px-4 py-3.5 text-base"
              handleClick={() => setData([])}
              isDisabled={data.length > 0 ? false : true}
            />
            <AppButton
              variant="transparent"
              type="button"
              label="Generate Financial Statement"
              containerStyle="px-4 py-3.5 text-base"
              handleClick={() =>
                navigate(appRoute.financialStatement(Number(id) as number).path)
              }
            />
            <AppButton
              label="Save"
              type="submit"
              containerStyle="px-4 py-3.5 text-base"
              isDisabled={data.length > 0 ? false : true}
            />
          </div>
        </Form>
      </div>
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
          onFinish={handleAddNewPayment}
        >
          <div className="flex gap-8">
            <Form.Item label={"Date Created"} name="dateCreated">
              <DatePicker />
            </Form.Item>
            <Form.Item label={"Date Paid"} name="datePaid">
              <DatePicker />
            </Form.Item>
          </div>
          <Form.Item label="Paid By" name="paidBy">
            <Input />
          </Form.Item>
          <Form.Item name="narration" label={"Narration"}>
            <TextArea placeholder="Enter Narration" rows={4} />
          </Form.Item>
          <div className="flex gap-8">
            <Form.Item label={"Payments USD"} name="paymentsUSD">
              <InputNumber addonAfter="$" />
            </Form.Item>
            <Form.Item label={"Payments NGN"} name="paymentsNGN">
              <InputNumber addonAfter="₦" />
            </Form.Item>
          </div>
          <Form.Item label={"Balance Due USD"} name="balanceDue">
            <InputNumber addonAfter="$" />
          </Form.Item>
          <AppButton type="submit" />
        </Form>
      </Modal>
    </>
  );
};

export default PaymentDetails;

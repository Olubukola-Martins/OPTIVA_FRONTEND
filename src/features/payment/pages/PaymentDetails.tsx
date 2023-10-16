import { Form, Input, InputNumber, Popconfirm, Select, Typography } from "antd";
import "../style.css";
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { DashboardLayout } from "src/components/layout/Layout";
import { appRoute } from "src/config/routeMgt/routePaths";

const PaymentDetails = () => {
    const originData: Item[] = [];
    for (let i = 0; i < 3; i++) {
      originData.push({
        key: i.toString(),
        sn: i + 1,
        narration: "xyz narration",
        paidBy: "John Doe",
        fxRate: "$1 = ₦751, Eur 000",
        paymentsUSD: 20,
        paymentsNGN: 11100,
        balanceDue: 35,
      });
    }

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const onFinish = (values: any) => {
    console.log("form values",values);
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
  interface Item {
    key: string;
    sn: number;
    narration: string;
    paidBy: string;
    fxRate: string;
    paymentsUSD: number;
    paymentsNGN: number;
    balanceDue: number;
  }

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: "number" | "text";
    record: Item;
    index: number;
    children: React.ReactNode;
  }
  const editableColumns = [
    {
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Narration",
      dataIndex: "narration",
      editable: true,
    },
    {
      title: "Paid By",
      dataIndex: "paidBy",
      editable: true,
    },
    {
      title: "Fx Rate",
      dataIndex: "fxRate",
      editable: true,
    },
    {
      title: "Fx Rate",
      dataIndex: "fxRate",
    },
    {
      title: "Payments USD",
      dataIndex: "paymentsUSD",
      editable: true,
    },
    {
      title: "Payments NGN",
      dataIndex: "paymentsNGN",
      editable: true,
    },
    {
      title: "Balance Due",
      dataIndex: "balanceDue",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            // style={{ margin: 0 }}
            // rules={[
            //   {
            //     required: true,
            //     message: `Please Input ${title}!`,
            //   },
            // ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const mergedColumns = editableColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType:
          col.dataIndex === ("paymentsUSD" || "paymentsNGN" || "balanceDue")
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      // sn: "",
      narration: "",
      paidBy: "",
      // fxRate: "",
      paymentsUSD: "",
      paymentsNGN: "",
      balanceDue: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  return (
    <DashboardLayout>
      <PageIntro title="Update Payment Details" linkBack={appRoute.payments} />

      <div className="border-2 rounded-xl border-gray-100 p-2 md:p-6 xl:p-12 md:w-11/12">
        <Form
          layout="vertical"
          name="updatePaymentDetails"
          className="flex flex-col"
          // component={false}
          onFinish={onFinish}
        >
          <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full">
            <Form.Item
              label="Applicant ID"
              name="applicantID"
              className="w-full"
            >
              <Input placeholder="e.g 230000-01" allowClear className="p-2.5" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              className="w-full"
            >
              {/* addonBefore={prefixSelector} */}
              <Input
                placeholder="+1 (000) 000-0000"
                allowClear
                className="p-2.5"
              />
            </Form.Item>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full">
            <Form.Item
              label="Applicant Name"
              name="applicantName"
              className="w-full"
            >
              <Input placeholder="Ruth Godwin" allowClear className="p-2.5" />
            </Form.Item>
            <Form.Item label="Email" name="email" className="w-full">
              <Input
                placeholder="ruthgodwin@gmail.com"
                allowClear
                className="p-2.5"
              />
            </Form.Item>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full">
            <Form.Item
              label="Number of Dependent(s)"
              name="noDependents"
              className="w-full"
            >
              <InputNumber placeholder="4" className="p-1.5 w-full" />
            </Form.Item>
            <Form.Item label="Country" name="country" className="w-full">
              <Input placeholder="Grenada" allowClear className="p-2.5" />
            </Form.Item>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full ">
            <Form.Item
              label="Applicant Address"
              name="applicantAddress"
              className="w-full"
            >
              <Input.Group className="gap-x-4 grid grid-cols-2 ">
                <Form.Item
                  name="street"
                  // rules={[{ required: true, message: "street is required" }]}
                >
                  <Input placeholder="Street" allowClear className="p-2.5" />
                </Form.Item>
                <Form.Item
                  name="floorSuite"
                  // rules={[
                  //   { required: true, message: "Apt/Floor/Suite is required" },
                  // ]}
                >
                  <Input
                    placeholder="Apt/Floor/Suite"
                    allowClear
                    className="p-2.5"
                  />
                </Form.Item>
                <Form.Item
                  name="city"
                  // rules={[{ required: true, message: "City is required" }]}
                >
                  <Input placeholder="City" allowClear className="p-2.5" />
                </Form.Item>
                <Form.Item
                  name="state"
                  // rules={[{ required: true, message: "State is required" }]}
                >
                  <Input placeholder="State" allowClear className="p-2.5" />
                </Form.Item>
                <Form.Item
                  name="country"
                  // rules={[{ required: true, message: "Country is required" }]}
                >
                  <Input placeholder="Country" allowClear className="p-2.5" />
                </Form.Item>
                <Form.Item
                  name="zipCode"
                  // rules={[
                  //   { required: true, message: "Zip/postal code is required" },
                  // ]}
                >
                  <Input
                    placeholder="Zip/postal code"
                    allowClear
                    className="p-2.5"
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <div className="w-full">
              <Form.Item label="Program Name" name="programName">
                <Input
                  placeholder="Citizenship By Investment"
                  allowClear
                  className="p-2.5"
                />
              </Form.Item>

              <Form.Item label="Investment Route" name="investmentRoute">
                <Input
                  placeholder="Real Estate Investment"
                  allowClear
                  className="p-2.5"
                />
              </Form.Item>
            </div>
          </div>

          {/* financial statement */}
          <div className="pt-2 sm:pt-0">
            <h3 className="font-medium text-lg ">Financial Statement</h3>
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full pt-4">
              {/* table 1 */}
              <Table
                bordered={true}
                columns={headColumnFirstTable}
                dataSource={dataSourceFirst}
                className="financialStatementTable w-full"
                pagination={false}
              />

              {/* table 2 */}
              <Table
                bordered={true}
                columns={headColumnSecondTable}
                dataSource={dataSourceSecond}
                className="financialStatementTable w-full"
                pagination={false}
              />
            </div>
          </div>

          {/* editable table */}
          <div className="mt-3 sm:mt-5">
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              scroll={{ x: 900 }}
              // pagination={{
              //   onChange: cancel,
              // }}
            />
          </div>

          {/* buttons */}
          <div className="place-self-end pt-6 flex flex-row gap-7">
            <AppButton
              variant="transparent"
              label="Cancel"
              type="button"
              containerStyle="px-4 py-3.5 text-base"
            />
            <AppButton
              label="Save"
              type="submit"
              containerStyle="px-4 py-3.5 text-base"
            />
          </div>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default PaymentDetails;

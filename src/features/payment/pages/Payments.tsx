import {
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Select,
} from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { SimpleCard } from "src/components/cards/SimpleCard";
import PaymentsListTable from "../components/PaymentsListTable";
import QuotesGenTable from "../components/QuotesGenTable";
import InvoiceGenTable from "../components/InvoiceGenTable";
import OutstandingPaymentsTable from "../components/OutstandingPaymentsTable";

const Payments = () => {
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
                  setCurrentTable("Payment List");
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
                  setCurrentTable("Payment List");
              }
            }}
          >
            <SimpleCard
              icon="iconoir:page"
              cardColor={cardColors[i]}
              title={cardTitles[i]}
              count={0}
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
            <AppButton label="View All" />
          </div>
        </div>
      </div>
      {/*All tables */}
      {currentTable === "Payment List" && <PaymentsListTable />}
      {currentTable === "Quotes Generated" && <QuotesGenTable />}
      {currentTable === "Invoices Generated" && <InvoiceGenTable />}
      {currentTable === "Outstanding Payments" && <OutstandingPaymentsTable/> }
    </>
  );
};

export default Payments;

import { Input, Select, Form, Table } from "antd";
import {
  columns,
  dataSource,
  DataSourceItem,
} from "../ApplicantDetails/ChildrenDetails";

export const NewChildrenDetails = () => {
  return (
    <div>
      <Form
        layout="vertical"
        className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10 w-full"
        requiredMark
      >
        <div className="w-1/2">
          <Form.Item
            label="How many children do you have?"
            name="children"
            className="w-full"
            required
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Any Adopted Children?"
            name="adoptedChildren"
            className="w-full"
            required
          >
            <Select
              size="large"
              options={[
                {
                  value: "Yes",
                  label: "Yes",
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="w-1/2">
          <Form.Item
            label="Will you be adopting?"
            name="adopting"
            className="w-full"
            required
          >
            <Select
              size="large"
              options={[
                {
                  value: "Yes",
                  label: "Yes",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Will all your children be dependents on your application?"
            name="childrenDependent"
            className="w-full"
            required
          >
            <Select
              size="large"
              options={[
                {
                  value: "Yes",
                  label: "Yes",
                },
              ]}
            />
          </Form.Item>
        </div>
      </Form>
      <div className="p-4 lg:w-[1230px]">
        <Table
          columns={columns}
          dataSource={dataSource}
          className="bg-white rounded-md shadow border mt-2 mx-auto"
          scroll={{ x: 200 }}
        />
      </div>
    </div>
  );
};

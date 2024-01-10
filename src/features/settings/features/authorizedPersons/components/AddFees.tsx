import { Form, Input, Select } from "antd";

export const AddFees = () => {
  const addOnAfter = (
    <Select options={[{ value: "%", label: "%" }]} defaultValue="%" />
  );
  const currency = (
    <Select
      options={[
        { value: "USD", label: "USD" },
        { label: "Naira", value: "Naira" },
      ]}
      defaultValue="USD"
    />
  );
  return (
    <div className="border rounded-lg p-5">
      <div className="flex gap-8">
        <div className="w-1/2">
          <Form.Item label="Fee Name" name="feeName" required>
            <Input />
          </Form.Item>
          <Form.Item
            label="Local Processing Fee"
            name="localProcessingFee"
            required
          >
            <Input addonAfter={currency} />
          </Form.Item>
          <Form.Item
            label="Local Processing Fee Threshold Payment"
            name="thresholdPayment"
            required
          >
            <Input addonAfter={addOnAfter} />
          </Form.Item>
          <Form.Item label="Country" name="country" required>
            <Select
             
              options={[
                {
                  value: "China",
                  label: "China",
                },
                {
                  value: "France",
                  label: "France",
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="w-1/2">
          <Form.Item
            label="Local Processing Fee Balance Payment"
            name="balancePayment"
            required
          >
            <Input addonAfter={addOnAfter} />
          </Form.Item>
          <Form.Item
            label="Program Threshold Payment"
            name="programThresholdPayment"
            required
          >
            <Input addonAfter={addOnAfter} />
          </Form.Item>
          <Form.Item
            label="Program Balance Payment"
            name="programBalancePayment"
            required
          >
            <Input addonAfter={addOnAfter} />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

import { Form, Input, Select,  Modal, DatePicker } from "antd";
import { FormInstance } from "antd/lib";

interface IDetailsData {
  [key: string]: string | number | boolean | Date | undefined;
}

interface IModalDetailsProps {
  form?: FormInstance;
  visible: boolean;
  onCancel: () => void;
  onOk: (val: any) => void;
  data: IDetailsData;
  columns: {
    dataIndex: string;
    title: string;
    render?: (value: any, record: any) => React.ReactNode;
    options?: { value: string; label: string }[];
    type?: string;
  }[];
}

export const ModalDetails = (props: IModalDetailsProps) => {
  const renderFormItem = (column: any) => {
    const { dataIndex, title, render, ...rest } = column;

    if (render) {
      return render(props.data[dataIndex], props.data);
    }

    if (rest.options) {
      return (
        <Form.Item key={dataIndex} name={dataIndex} label={title} {...rest}>
          <Select options={rest.options} />
        </Form.Item>
      );
    } else if (rest.type === "date") {
      return (
        <Form.Item key={dataIndex} name={dataIndex} label={title} {...rest}>
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
      );
    } else {
      return (
        <Form.Item key={dataIndex} name={dataIndex} label={title} {...rest}>
          <Input />
        </Form.Item>
      );
    }
  };
  return (
    <Modal
      title="Edit Children Details"
      open={props.visible}
      onCancel={props.onCancel}
      onOk={() => props.form?.submit()}
    >
      <Form onFinish={props.onOk} initialValues={props.data}>
        {props.columns.map((column) => renderFormItem(column))}
      </Form>
    </Modal>
  );
};

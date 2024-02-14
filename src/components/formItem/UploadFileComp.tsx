import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload } from 'antd';
import { generalValidationRulesOpt } from 'src/utils/formHelpers/validations';

type TProps = {
  extraStyles?:string;
  uploadProps?: Object;
  otherUploadFormItemProps?: Object;
  rules?: any;
  triggerComponent?: JSX.Element;
  name?: string;
  label?: string;
  maxCount?: number;
  getValueFromEvent?: (e: any) => any;
};
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
    // return e
  };


const UploadFileComp = ({extraStyles="",
  uploadProps = {},
  otherUploadFormItemProps = {},
  getValueFromEvent = normFile,
  rules,
  triggerComponent,
  maxCount = 1,
  name = "upload_file",
  label = "Upload File",
}: TProps) => {
  return (
    <Form.Item
      className={extraStyles}
      name={name}
      label={label}
      rules={rules ? rules : generalValidationRulesOpt}
      getValueFromEvent={getValueFromEvent}
      {...otherUploadFormItemProps}
    >
      <Upload {...uploadProps} maxCount={maxCount}>
        {triggerComponent ? (
          triggerComponent
        ) : (
          <Button icon={<UploadOutlined />}>Select File</Button>
        )}
      </Upload>
    </Form.Item>
  );
};

export default UploadFileComp
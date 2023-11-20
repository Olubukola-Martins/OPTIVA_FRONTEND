import { Table } from 'antd';
import { AppButton } from 'src/components/button/AppButton';

interface ITableProps {
    columns: any[]; // Adjust the type based on the actual column type you are using
    dataSource: any[]; // Adjust the type based on the actual data structure you are using
    onEdit: (record: any) => void;
    onDelete: (record: any) => void;
  }

export const EditableTable = (props:ITableProps) => {
  return (
    <Table
      columns={[
        ...props.columns,
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (_, record: any) => (
            <span>
              <AppButton label='Edit' variant='transparent' handleClick={() => props.onEdit(record)}/>
              <AppButton label='Delete' variant='transparent'  handleClick={() => props.onDelete(record)}/>
              
            </span>
          ),
        },
      ]}
      dataSource={props.dataSource}
    />

  )
}

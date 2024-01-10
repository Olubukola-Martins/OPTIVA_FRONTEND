import { Dropdown, Menu, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { appRoute } from "src/config/routeMgt/routePaths";
import {
  IAllGeneratedQuotes,
  IGeneratedQuoteDatum,
} from "src/features/meetings/types/types";
// import { useFetchSingleItem } from "src/features/settings/hooks/useFetchSingleItem";
// import { QUERY_KEY_QUOTES } from "../pages/Payments";
// import { END_POINT } from "src/config/environment";
// import { openNotification } from "src/utils/notification";
import { useDownloadQuote, useSendQuote } from "../hooks/useSendOrDownloadQuote";

type DataSourceItem = {
  key: number;
  SN: number;
  applicantID: string;
  applicantName: string;
  country: string;
  investmentRoute: string;
  dependents: number;
  dateCreated: string;
  createdBy: string;
};

interface IProps {
  allData: IAllGeneratedQuotes | undefined;
  dataLoading: boolean;
}

const QuotesGenTable = ({ allData, dataLoading }: IProps) => {
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [sendQuoteKey, setSendQuoteKey] = useState<number | undefined>(
    // undefined
  );
  const [downloadQuoteKey, setDownloadQuoteKey] = useState<number | undefined>(
    undefined
  );

 const {isLoading:sendingQuote} = useSendQuote({
    itemId: sendQuoteKey as number,
  });

 const { isLoading:downloadinGQuote } = useDownloadQuote({
   itemId: downloadQuoteKey as number,
 });

useEffect(() => {
}, [sendQuoteKey,downloadQuoteKey])

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
      render: (record: { key: unknown }) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">View</Menu.Item>
              <Menu.Item
                key="2"
                onClick={
                  () => {
                    // handleSendQuote(record.key as number);
                    setSendQuoteKey(record.key as number);
                  }

                  // useFetchSingleItem({
                  //   itemId: record.key as number,
                  //   queryKey: QUERY_KEY_QUOTES,
                  //   urlEndPoint: `${END_POINT.BASE_URL}/admin/send-quote`,
                  // })
                }
              >
                Send Quote
              </Menu.Item>

              <Menu.Item key="3">
                {/* <Link to={appRoute.generateInvoice(record.key as number).path}> */}
                  Generate Invoice
                {/* </Link> */}
              </Menu.Item>

              <Menu.Item
                key="4"
                onClick={() => {
                  setDownloadQuoteKey(record.key as number)
                  // handleDownloadQuote(record.key as number);
                  // const {} = useFetchSingleItem({
                  //   itemId: record.key as number,
                  //   queryKey: QUERY_KEY_QUOTES,
                  //   urlEndPoint: `${END_POINT.BASE_URL}/admin/download-quote`,
                  // });
                }}
              >
                Download
              </Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

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
      const data = mainData.map((quote: IGeneratedQuoteDatum, i) => {
        const {
          applicant_unique_id,
          id,
          applicant_full_name,
          country,
          investment_route,
          number_of_dependents,
          created_at,
          generated_by,
        } = quote;
        return {
          key: id,
          SN: i + 1,
          applicantID: applicant_unique_id,
          applicantName: applicant_full_name,
          country,
          investmentRoute: investment_route,
          dependents: +number_of_dependents,
          dateCreated: formattedDate(created_at),
          createdBy: generated_by,
        };
      });
      setDataSource(data);
    }
  }, [allData, dataLoading]);

  return (
    <Spin spinning={sendingQuote || downloadinGQuote}>
      <Table
        loading={dataLoading}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 900 }}
        className="border-gray-100 border-t-0 border-2 rounded-b-md"
      />
    </Spin>
  );
};

export default QuotesGenTable;

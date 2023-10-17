import { ColumnsType } from "antd/es/table";
import React from "react";
import { Table } from "antd";

export const TravelDetailsAndHistory = () => {
  type DataSourceItem = {
    key: React.Key;
    sn: string;
    passportOne: string;
    passportTwo: string;
    passportThree: string;
  };
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "",
      dataIndex: "sn",
    },
    {
      title: "Passport One",
      dataIndex: "passportOne",
      key: "2",
    },
    {
      title: "Passport Two",
      dataIndex: "passportTwo",
      key: "3",
    },
    {
      title: "Passport Three",
      dataIndex: "passportThree",
      key: "4",
    },
  ];
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 5; i++) {
    dataSource.push({
      key: i,
      sn: "Issuing country",
      passportOne: "Nigeria",
      passportTwo: "0000000",
      passportThree: "Grenada",
    });
  }
  return (
    <>
      <div className="w-full p-4">
        <h2>
          Ignore this section if this is the first time the applicant is
          applying
        </h2>
      </div>
      <div className="w-full p-4">
        <h2>Passport & Citizenship Details</h2>
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 600 }} />
      </div>
    </>
  );
};
